import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BeehiveAPI } from 'src/app/config/constants';
import { Rule, RulesTableItem } from 'src/app/models/dataInterfaces.model';

@Injectable({
  providedIn: 'root'
})
export class RulesService {

  constructor(private http: HttpClient) { }

  /**
   * The 'fetchRule' function is used to fetch a rule by a given ID.
   * @param ruleID number, ID to fetch
   * @returns Rule
   */
  fetchRule(ruleID: number): Observable<Rule> {
    return this.http
      .get<Rule>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.RULES_PATH}${ruleID}`)
      .pipe(
        map(rule => {
          if (rule) {
            return rule;
          } else {
            throw new Error('Rule not found');
          }
        })
      );
  }

  fetchRules(): Observable<RulesTableItem[]> {
    return this.http
      .get<{ [id: string]: RulesTableItem }>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.RULES_PATH}`)
      .pipe(
        map(resData => {
          if (resData) {
            // Return the response data
            const rulesArray: RulesTableItem[] = [];
            for (const id in resData) {
              if (resData.hasOwnProperty(id)) {
                const rule: RulesTableItem = resData[id];
                rulesArray.push(rule);
              }
            }
            return rulesArray;
          } else {
            // Return an empty array if resData is falsy
            return [];
          }
        })
      );
  }

  /**
   * The 'createRule' function is used to create new rules by sending them in json format to the Admin API.
   * @param rule Rule
   * @returns Rule, if successful POST
   */
  createRule(rule: Rule) {
    return this.http
      .post<Rule>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.RULES_PATH}`, rule)
      .pipe(
        map(resData => {
          if(resData) {
            const newRule: Rule = resData;
            return newRule;
          }
          throw new Error('Failed to create rule')
        })
      )
  }
}

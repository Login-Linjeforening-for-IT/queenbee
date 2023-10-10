import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BeehiveAPI } from 'src/app/config/constants';
import { RulesTableItem } from 'src/app/models/dataInterfaces.model';

@Injectable({
  providedIn: 'root'
})
export class RulesService {

  constructor(private http: HttpClient) { }

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
}

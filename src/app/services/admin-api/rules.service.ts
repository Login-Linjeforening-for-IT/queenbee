import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BeehiveAPI } from '@env';
import { 
    DropDownItem, 
    Rule, 
    RulesTableItem 
} from 'src/app/models/dataInterfaces.model';
import Auth from '../auth/auth';

@Injectable({
  providedIn: 'root'
})

/**
 * This service is used to ineract with the Rule objects in the database through respective endpoints in the Admin API.
 */
export class RulesService {

    constructor(private http: HttpClient) { }

    /**
     * The 'fetchRule' function is used to fetch a rule by a given ID.
     * @param ruleID number, ID to fetch
     * @returns Rule
     */
    fetchRule(ruleID: number): Observable<Rule> {
        const auth = Auth()
        const options = { headers: new HttpHeaders(auth) }

        return this.http
            .get<Rule>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.RULES_PATH}${ruleID}`, options)
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

    /**
     * The 'fetchRules' is used to fetch all rules. Return in a format tailored for tables.
     * @returns array of RulesTableItem
     */
    fetchRules(): Observable<RulesTableItem[]> {
        const auth = Auth()
        const options = { headers: new HttpHeaders(auth) }

        return this.http
            .get<{ [id: string]: RulesTableItem }>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.RULES_PATH}?limit=100000`, options)
            .pipe(
                map(resData => {
                    if (resData) {
                        // Return the response data
                        const rulesArray: RulesTableItem[] = [];
                        for (const id in resData) {
                            if (resData.hasOwnProperty(id) && !resData[id].is_deleted) {
                                const rule: RulesTableItem = resData[id];
                                rulesArray.push(rule);
                            }
                        }

                        return rulesArray
                    } else {
                        // Return an empty array if resData is falsy
                        return []
                    }
                })
            )
    }

    /**
     * The function 'fetchDropDown' returns an array of Rule objects tailored for dropdown menu.
     * @returns Observable<DropDownItem[]>
     */
    fetchDropDown(): Observable<DropDownItem[]> {
        const auth = Auth()
        const options = { headers: new HttpHeaders(auth) }

        return this.http
            .get<{ [id: number]: any }>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.RULES_PATH}`, options)
            .pipe(
                map(resData => {
                    const ruleArray: DropDownItem[] = []
                    
                    for (const i in resData) {
                        const resObj: Rule = resData[i]
                        
                        // Ignore soft-deleted objects
                        if(!resObj.is_deleted) {
                        const ddItem: DropDownItem = {
                            id: resObj.id,
                            // Set name to name_en if it exists, else set to name_no
                            name: resObj.name_en || resObj.name_no,
                            details: '',
                        }
            
                        ruleArray.push(ddItem);
                        }   
                    }
                    
                    return ruleArray
                })
            )
    }

    /**
     * The 'createRule' function is used to create new rules by sending them in json format to the Admin API.
     * @param rule Rule
     * @returns Rule, if successful POST
     */
    createRule(rule: Rule) {
        const auth = Auth()
        const options = { headers: new HttpHeaders(auth) }

        return this.http
        .post<Rule>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.RULES_PATH}`, rule, options)
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

    /**
     * The 'patchRule' function is used to patch a rule. The ID must be a part of parameter rule.
     * @param rule updated Rule object
     * @returns Rule
     */
    patchRule(rule: Rule) {
        const auth = Auth()
        const options = { headers: new HttpHeaders(auth) }

        return this.http
            .patch<Rule>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.RULES_PATH}`, rule, options)
            .pipe(
                map(resData => {
                    if(resData) {
                        const newRule: Rule = resData;
                        return newRule;
                    }

                    throw new Error('Failed to patch rule')
                })
            )
    }

    deleteRule(ruleID: number) {
        const auth = Auth()
        const options = { headers: new HttpHeaders(auth) }

        return this.http
            .delete<Rule>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.RULES_PATH}${ruleID}`, options)
            .subscribe({
                error: error => {
                    throw new Error('Failed to delete rule', error)
                }
            })
    }
}

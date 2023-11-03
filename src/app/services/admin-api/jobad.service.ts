import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, mergeMap } from 'rxjs';
import { BeehiveAPI } from 'src/app/config/constants';
import { JobadDetail, JobadShort, JobadTableItem } from 'src/app/models/dataInterfaces.model';
import { convertFromRFC3339 } from 'src/app/utils/time';

@Injectable({
  providedIn: 'root'
})
export class JobadService {

  constructor(private http: HttpClient) { }

  /**
   * Gets a single jobad from the epi.
   * @param jobadID id of jobad
   * @returns JobadDetail observable
   */
  fetchJobad(jobadID: number): Observable<JobadDetail> {
    return this.http
      .get<JobadDetail>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.JOBADS_PATH}${jobadID}`)
      .pipe(
        map(resData => {
          if (resData) {
            const jobad: JobadDetail = resData;
            return jobad;
          }
          throw new Error('No event found with id ' + jobadID);
        })
      );
  }

  /**
   * Gets all jobads from the API
   * @returns EventShort array
   */
  fetchJobads(): Observable<JobadTableItem[]> {
    return this.http
      .get<{ [id: string]: any }>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.JOBADS_PATH}`)
      .pipe(
        map(resData => {
          const jobArray: JobadTableItem[] = [];
          for (const shortname in resData) {
            const jobShort: JobadShort = resData[shortname]

            if(jobShort && !jobShort.is_deleted) {
              const job: JobadTableItem = {
                id: jobShort.id,
                title: jobShort.title_en || jobShort.title_no,
                position_title: jobShort.position_title_en || jobShort.position_title_no,
                job_type: jobShort.job_type,
                time_publish: convertFromRFC3339(jobShort.time_publish),
                application_deadline: convertFromRFC3339(jobShort.application_deadline),
                application_url: jobShort.application_url,
                updated_at: convertFromRFC3339(jobShort.updated_at),
                visible: jobShort.visible,
                deleted_at: jobShort.deleted_at,
                is_deleted: jobShort.is_deleted,
                company_name: jobShort.name_en || jobShort.name_no
              };

              jobArray.push(job);
            }
          }
          return jobArray;
        })
      );
  }

  /**
   * The 'createJobad' function is used to create new job ads by sending them in json format to the Admin API.
   * @param ad JobadDetail
   * @returns JobadDetail, if successful POST
   */
  createJobad(ad: JobadDetail, skills: string[], cities: string[]) {
    return this.http
      .post<JobadDetail>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.JOBADS_PATH}`, ad)
      .pipe(
        mergeMap((resData: JobadDetail) => {
          if (resData) {
            const newAd: JobadDetail = resData;
            
            // Send requests for skills and cities
            const skillRequests: Observable<any>[] = skills.map(skill => {
              return this.createSkillRequest(newAd.id, skill);
            });

            const cityRequests: Observable<any>[] = cities.map(city => {
              return this.createCityRequest(newAd.id, city);
            });

            // Use forkJoin to wait for all skill requests to complete
            return forkJoin([...skillRequests, ...cityRequests]).pipe(map(() => newAd));
          }
          throw new Error('Failed to create jobad');
        })
      );
  }

  patchJobad(ad: JobadDetail, skills: string[], cities: string[]) {
    this.http
      .patch<JobadDetail>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.JOBADS_PATH}`, ad)
      .subscribe({
        next: ((updatedAd: JobadDetail) => {
          // Handle skills
          this.getOldSkills(ad.id).subscribe({
            next: ((oldSkills: string[]) => {
              const removedSkills = this.getRemovedElements(oldSkills, skills);
              const addedSkills = this.getAddedElements(oldSkills, skills);

              const skillRequests: Observable<any>[] = addedSkills.map(skill => {
                return this.createSkillRequest(ad.id, skill);
              })
            })
          })
        })
      })
      /*.pipe(
        this.getOldSkills(ad.id).subscribe({
          next: ((oldSkills: string[]) => {}),
          error: (e) => console.log(e)
        }
          
          () => {
            const removedSkills = this.getRemovedElements(oldSkills, skills);
            const addedSkills = this.getAddedElements(oldSkills, skills);
    
            const skillRequests: Observable<any>[] = addedSkills.map(skill => {
              return this.createSkillRequest(adID, skill);
            });
    
          },
          (error) => {
            // Handle errors here
            console.error('Error getting skills:', error);
          }
        );
      )*/
  }

  /**
   * The 'deleteJobad' function deletes the jobad given by the id.
   * @param id number
   */
  deleteJobad(id: number) {
    this.http.delete<JobadDetail>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.JOBADS_PATH}${id}`)
    .subscribe({
      error: error => {
        throw new Error('Failed to delete job ad', error)
      }
    });
  }

  private createSkillRequest(jobAdId: number, skill: string): Observable<any> {
    const enpointURL = `${BeehiveAPI.BASE_URL}${BeehiveAPI.JOBADS_PATH}${BeehiveAPI.SKILLS_PATH}`;
    const requestBody = { id: jobAdId, skill: skill };

    return this.http.post(enpointURL, requestBody);
  }

  private createCityRequest(jobAdId: number, city: string): Observable<any> {
    const enpointURL = `${BeehiveAPI.BASE_URL}${BeehiveAPI.JOBADS_PATH}${BeehiveAPI.CITIES_PATH}`;
    const requestBody = { id: jobAdId, city: city };

    return this.http.post(enpointURL, requestBody);
  }

  /**
   * Used to retrieve all the current skills applied to an jobad. Used for comparing old (DB) vs new (form) skills applied to an ad.
   * @param jobAdId id of jobad in question
   * @returns array of skills applied to an ad in DB
   */
  private getOldSkills(jobAdId: number): Observable<string[]> {
    return this.http.get<JobadDetail>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.JOBADS_PATH}${jobAdId}`)
      .pipe(
        map((resData: JobadDetail) => {
          if (resData) {
            return resData.skills;
          }
          throw new Error('No event found with id ' + jobAdId);
        })
      );
  }

  private getRemovedElements(oldValues: string[], newValues: string[]): string[] {
    // Convert the array to a set for faster lookup
    const set = new Set(newValues);
    
    // Create an empty array to store the removed elements
    const result: string[] = [];
  
    // Iterate through the new values and check if each element is in the set
    for (const element of oldValues) {
      if (!set.has(element)) {
        result.push(element);
      }
    }
  
    return result;
  }

  private getAddedElements(oldValues: string[], newValues: string[]): string[] {
    // Convert the array to a set for faster lookup
    const set = new Set(oldValues);
    
    // Create an empty array to store the removed elements
    const result: string[] = [];
  
    // Iterate through the new values and check if each element is in the set
    for (const element of newValues) {
      if (!set.has(element)) {
        result.push(element);
      }
    }
  
    return result;
  }
}

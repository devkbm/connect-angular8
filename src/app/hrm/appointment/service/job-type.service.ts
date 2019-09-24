import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';


import { DataService } from '../../../common/service/data.service';
import { ResponseObject } from '../../../common/model/response-object';
import { ResponseList } from '../../../common/model/response-list';

import { JobType } from '../model/job-type';

@Injectable()
export class JobTypeService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('http://localhost:8090/hrm/jobtype', http, tokenExtractor);
  }
  /*
  getDeptList(params?: any): Observable<ResponseList<Dept>> {
    const url = `${this.API_URI}`;
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true,
        params: params
     };

    return this.http.get<ResponseList<Dept>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }
  */
  getJobType(id: string): Observable<ResponseObject<JobType>> {
    const url = `${this.API_URI}/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<JobType>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }


  saveJobType(dept: JobType): Observable<ResponseObject<JobType>> {
    const url = `${this.API_URI}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<ResponseObject<JobType>>(url, dept, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  deleteJobType(id: string): Observable<ResponseObject<JobType>> {
    const url = `${this.API_URI}/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http
              .delete<ResponseObject<JobType>>(url, options)
              .pipe(
                catchError((err) => Observable.throw(err))
              );
  }

}

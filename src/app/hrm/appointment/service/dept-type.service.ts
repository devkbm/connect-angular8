import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';


import { DataService } from '../../../common/service/data.service';
import { ResponseObject } from '../../../common/model/response-object';
import { ResponseList } from '../../../common/model/response-list';


import { DeptType } from '../model/dept-type';

@Injectable()
export class DeptTypeService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('http://localhost:8090/hrm/depttype', http, tokenExtractor);
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
  getDeptType(id: string): Observable<ResponseObject<DeptType>> {
    const url = `${this.API_URI}/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<DeptType>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }


  saveDeptType(dept: DeptType): Observable<ResponseObject<DeptType>> {
    const url = `${this.API_URI}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<ResponseObject<DeptType>>(url, dept, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  deleteDeptType(id: string): Observable<ResponseObject<DeptType>> {
    const url = `${this.API_URI}/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http
              .delete<ResponseObject<DeptType>>(url, options)
              .pipe(
                catchError((err) => Observable.throw(err))
              );
  }

}

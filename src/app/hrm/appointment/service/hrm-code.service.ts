import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from '../../../common/service/data.service';
import { ResponseObject } from '../../../common/model/response-object';
import { ResponseList } from '../../../common/model/response-list';
import { HrmType } from '../model/hrm-type';
import { HrmTypeDetailCode } from '../model/hrm-type-detail-code';

@Injectable({
  providedIn: 'root'
})
export class HrmCodeService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('/hrm', http, tokenExtractor);
  }

  getHrmTypeList(params: any): Observable<ResponseList<HrmType>> {
    const url = `${this.API_URL}/hrmtype`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true,
      params: params
    };

    return this.http.get<ResponseList<HrmType>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  getHrmType(id: string): Observable<ResponseObject<HrmType>> {
    const url = `${this.API_URL}/hrmtype/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<HrmType>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }


  saveHrmType(dept: HrmType): Observable<ResponseObject<HrmType>> {
    const url = `${this.API_URL}/hrmtype`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<ResponseObject<HrmType>>(url, dept, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  deleteHrmType(id: string): Observable<ResponseObject<HrmType>> {
    const url = `${this.API_URL}/hrmtype/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http
              .delete<ResponseObject<HrmType>>(url, options)
              .pipe(
                catchError((err) => Observable.throw(err))
              );
  }

  getHrmTypeDetailCodeList(params: any): Observable<ResponseList<HrmTypeDetailCode>> {
    const url = `${this.API_URL}/typedetailcode`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true,
      params: params
    };

    return this.http.get<ResponseList<HrmTypeDetailCode>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  getHrmTypeDetailCode(id: string): Observable<ResponseObject<HrmTypeDetailCode>> {
    const url = `${this.API_URL}/typedetailcode/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<HrmTypeDetailCode>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }


  saveHrmTypeDetailCode(dept: HrmType): Observable<ResponseObject<HrmTypeDetailCode>> {
    const url = `${this.API_URL}/typedetailcode`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<ResponseObject<HrmTypeDetailCode>>(url, dept, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  deleteHrmTypeDetailCode(id: string): Observable<ResponseObject<HrmTypeDetailCode>> {
    const url = `${this.API_URL}/typedetailcode/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http
              .delete<ResponseObject<HrmTypeDetailCode>>(url, options)
              .pipe(
                catchError((err) => Observable.throw(err))
              );
  }
}

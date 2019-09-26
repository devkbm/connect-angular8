import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';


import { DataService } from '../../../common/service/data.service';
import { ResponseObject } from '../../../common/model/response-object';
import { ResponseList } from '../../../common/model/response-list';


import { AppointmentCode } from '../model/appointment-code';
import { AppointmentCodeDetail } from '../model/appointment-code-detail';

@Injectable()
export class AppointmentCodeService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('http://localhost:8090/hrm', http, tokenExtractor);
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
  getAppointmentCode(id: string): Observable<ResponseObject<AppointmentCode>> {
    const url = `${this.API_URI}/appointmentcode/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<AppointmentCode>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }


  saveAppointmentCode(appointmentCode: AppointmentCode): Observable<ResponseObject<AppointmentCode>> {
    const url = `${this.API_URI}/appointmentcode`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<ResponseObject<AppointmentCode>>(url, appointmentCode, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  deleteAppointmentCode(id: string): Observable<ResponseObject<AppointmentCode>> {
    const url = `${this.API_URI}/appointmentcode/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http
              .delete<ResponseObject<AppointmentCode>>(url, options)
              .pipe(
                catchError((err) => Observable.throw(err))
              );
  }

  getAppointmentCodeDetail(id: string): Observable<ResponseObject<AppointmentCodeDetail>> {
    const url = `${this.API_URI}/appointmentcodedetail/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<AppointmentCodeDetail>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  saveAppointmentCodeDetail(appointmentCode: AppointmentCode): Observable<ResponseObject<AppointmentCodeDetail>> {
    const url = `${this.API_URI}/appointmentcodedetail`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<ResponseObject<AppointmentCodeDetail>>(url, appointmentCode, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  deleteAppointmentCodeDetail(id: string): Observable<ResponseObject<AppointmentCodeDetail>> {
    const url = `${this.API_URI}/appointmentcodedetail/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http
              .delete<ResponseObject<AppointmentCodeDetail>>(url, options)
              .pipe(
                catchError((err) => Observable.throw(err))
              );
  }

}

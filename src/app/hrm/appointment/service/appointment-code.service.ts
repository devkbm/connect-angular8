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
    super('/hrm', http, tokenExtractor);
  }

  getAppointmentCodeList(params?: any): Observable<ResponseList<AppointmentCode>> {
    const url = `${this.API_URL}/appointmentcode`;
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true,
        params: params
     };

    return this.http.get<ResponseList<AppointmentCode>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }
  
  getAppointmentCode(id: string): Observable<ResponseObject<AppointmentCode>> {
    const url = `${this.API_URL}/appointmentcode/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<AppointmentCode>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }


  saveAppointmentCode(appointmentCode: AppointmentCode): Observable<ResponseObject<AppointmentCode>> {
    const url = `${this.API_URL}/appointmentcode`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<ResponseObject<AppointmentCode>>(url, appointmentCode, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  deleteAppointmentCode(id: string): Observable<ResponseObject<AppointmentCode>> {
    const url = `${this.API_URL}/appointmentcode/${id}`;
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

  getTypeList(): Observable<ResponseList<any>> {
    const url = `${this.API_URL}/typelist`;
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true
     };

    return this.http.get<ResponseList<any>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  getAppointmentCodeDetailList(params?: any): Observable<ResponseList<AppointmentCodeDetail>> {
    const url = `${this.API_URL}/appointmentcodedetail`;
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true,
        params: params
     };

    return this.http.get<ResponseList<AppointmentCodeDetail>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  getAppointmentCodeDetail(id: string, detailId: string): Observable<ResponseObject<AppointmentCodeDetail>> {
    const url = `${this.API_URL}/appointmentcodedetail/${id}/${detailId}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<AppointmentCodeDetail>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  saveAppointmentCodeDetail(appointmentCode: AppointmentCode): Observable<ResponseObject<AppointmentCodeDetail>> {
    const url = `${this.API_URL}/appointmentcodedetail`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<ResponseObject<AppointmentCodeDetail>>(url, appointmentCode, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  deleteAppointmentCodeDetail(id: string, detailId: string): Observable<ResponseObject<AppointmentCodeDetail>> {
    const url = `${this.API_URL}/appointmentcodedetail/${id}/${detailId}`;
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

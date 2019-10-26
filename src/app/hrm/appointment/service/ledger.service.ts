import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';


import { DataService } from '../../../common/service/data.service';
import { ResponseObject } from '../../../common/model/response-object';
import { ResponseList } from '../../../common/model/response-list';


import { AppointmentCode } from '../model/appointment-code';
import { AppointmentCodeDetail } from '../model/appointment-code-detail';
import { Ledger } from '../model/ledger';
import { LedgerChangeInfo } from '../model/legder-change-info';

@Injectable()
export class LegderService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('/hrm', http, tokenExtractor);
  }

  getAppointmentCodeList(params?: any): Observable<ResponseList<Ledger>> {
    const url = `${this.API_URL}/appointmentcode`;
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true,
        params: params
     };

    return this.http.get<ResponseList<Ledger>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }
  
  getLedger(id: string): Observable<ResponseObject<Ledger>> {
    const url = `${this.API_URL}/ledger/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<Ledger>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  saveLedger(ledger: Ledger): Observable<ResponseObject<Ledger>> {
    const url = `${this.API_URL}/ledger`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<ResponseObject<Ledger>>(url, ledger, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  deleteLedger(id: string): Observable<ResponseObject<Ledger>> {
    const url = `${this.API_URL}/ledger/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http
              .delete<ResponseObject<Ledger>>(url, options)
              .pipe(
                catchError((err) => Observable.throw(err))
              );
  }

  getLedgerList(id: string): Observable<ResponseObject<Ledger>> {
    const url = `${this.API_URL}/ledger/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<Ledger>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  getAppointmentCodeDetailList(appointmentCode: string): Observable<ResponseList<LedgerChangeInfo>> {
    const url = `${this.API_URL}/ledgerlist/changeinfo/${appointmentCode}`;

    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true
     };

    return this.http.get<ResponseList<LedgerChangeInfo>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }
  
}

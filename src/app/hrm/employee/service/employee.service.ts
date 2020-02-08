import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from '../../../common/service/data.service';
import { ResponseObject } from '../../../common/model/response-object';
import { ResponseList } from '../../../common/model/response-list';
import { Employee } from '../model/Employee';
import { NewEmployee } from '../model/new-employee';
import { SearchEmployee } from '../model/search-employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('/hrm', http, tokenExtractor);
  }

  getAppointmentCodeList(params?: any): Observable<ResponseList<Employee>> {
    const url = `${this.API_URL}/employee`;
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true,
        params: params
     };

    return this.http.get<ResponseList<Employee>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  getEmployeeList(params: SearchEmployee): Observable<ResponseList<Employee>> {
    const url = `${this.API_URL}/employee`;
    const obj:any = params;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true,
      params: obj
    };

    return this.http.get<ResponseList<Employee>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  getEmployee(id: string): Observable<ResponseObject<Employee>> {
    const url = `${this.API_URL}/employee/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<Employee>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }
 
  saveEmployee(obj: Employee): Observable<ResponseObject<Employee>> {
    const url = `${this.API_URL}/employee`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<ResponseObject<Employee>>(url, obj, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  createEmployee(obj: NewEmployee): Observable<ResponseObject<Employee>> {
    const url = `${this.API_URL}/employee/create`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<ResponseObject<Employee>>(url, obj, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  
}

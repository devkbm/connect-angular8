import { Injectable } from '@angular/core';
import { HttpClient, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { DataService } from './data.service';
import { ResponseObject } from '../model/response-object';
import { User } from '../model/user-info';


@Injectable()
export class UserSessionService extends DataService {
    private STATIC_URI = 'http://localhost:8090/static/';
    
    constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
        super('http://localhost:8090/common/user', http, tokenExtractor);
      }

    public getAvartarImageString(): string {
        const url = sessionStorage.getItem('imageUrl');

        return this.STATIC_URI + url;
    }

    public getSessionUserInfo(): Observable<ResponseObject<User>> {
        const url = `${this.API_URI}/myinfo`;
        const options = {
          headers: this.getAuthorizedHttpHeaders(),
          withCredentials: true
        };
    
        return this.http
          .get<ResponseObject<User>>(url, options).pipe(
            catchError((err) => Observable.throw(err)));
      }
}
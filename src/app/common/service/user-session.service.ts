import { Injectable } from '@angular/core';

@Injectable()
export class UserSessionService {
    private STATIC_URI = 'http://localhost:8090/static/';
    
    constructor() { }

    public getAvartarImageString(): string {
        const url = sessionStorage.getItem('imageUrl');

        return this.STATIC_URI + url;
    }
}
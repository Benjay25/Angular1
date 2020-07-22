import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

import { User } from './user';


@Injectable ({
    providedIn: 'root'
})

export class UserService {
    dataUrl: string = "api/usersArr"
    constructor(private httpClient: HttpClient) {} 

    public getUsers(): Observable<User[]> {
        return this.httpClient.get<User[]>(this.dataUrl)
    }

    createUser(User: User): Observable<User> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        User.id = null;
        return this.httpClient.post<User>(this.dataUrl, User, { headers })
      }
}
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";

import { Advert } from './advert';


@Injectable ({
    providedIn: 'root'
})

export class AdvertService {
    dataUrl: string = "api/arrAdverts"
    constructor(private httpClient: HttpClient) {} 

    public getAdverts(): Observable<Advert[]> {
        return this.httpClient.get<Advert[]>(this.dataUrl)
    }

    getAdvert(id: number): Observable<Advert> {
        const url = `${this.dataUrl}/${id}`;
            return this.httpClient.get<Advert>(url);
    }

    createAdvert(advert: Advert): Observable<Advert> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        advert.id = null;
        return this.httpClient.post<Advert>(this.dataUrl, advert, { headers })
    }
      
      updateAdvert(advert: Advert): Observable<Advert> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.dataUrl}/${advert.id}`;
        return this.httpClient.put<Advert>(url, advert, { headers })
          .pipe(
            // Return the product on an update
            map(() => advert)
          );
      }

      deleteProduct(id: number): Observable<{}> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.dataUrl}/${id}`;
        return this.httpClient.delete<Advert>(url, { headers })
      }
}
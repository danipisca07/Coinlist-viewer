import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { CoinData } from '../models/CoinData';
import { CoinList } from '../models/CoinList';
import { CoinHistoryItem } from '../models/CoinHistoryItem';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  #backendUrl: string = "http://localhost:3000/"

  constructor(
    private http: HttpClient
  ) { }

  getList(): Observable<CoinList> {
    return this.http.get<CoinList>(this.#backendUrl+"api/list")
      .pipe(
        tap(_ => console.log("Fetched list")),
        catchError(this.handleError<CoinList>('getList', undefined))
      );
  }

  getHistory(coin: string): Observable<CoinHistoryItem[]> {
    return this.http.get<CoinHistoryItem[]>(this.#backendUrl+"api/"+coin)
      .pipe(
        tap(_ => console.log("Fetched " + coin + " history")),
        catchError(this.handleError<CoinHistoryItem[]>('getHistory', undefined))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

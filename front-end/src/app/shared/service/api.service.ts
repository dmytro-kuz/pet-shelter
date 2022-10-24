import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = 'http://localhost:3000/api';

  constructor(private httpClient: HttpClient) {}

  get<T>(path: string, httpParams?: HttpParams): Observable<T> {
    return this.httpClient.get<T>(this.url + path, { params: httpParams });
  }

  post<T>(path: string, data: any): Observable<T> {
    return this.httpClient.post<T>(this.url + path, data);
  }
}

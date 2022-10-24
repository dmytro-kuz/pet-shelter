import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeleteAlertDialogComponent } from 'src/app/admin/shared/delete-alert-dialog/delete-alert-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ApiAdminService {
  url: string = 'http://localhost:3000/admin';

  constructor(private httpClient: HttpClient) {}

  get<T>(path: string, params?: any): Observable<T> {
    return this.httpClient.get<T>(this.url + path, { params: params ? this.setHttpParams(params) : {} });
  }

  post<T>(path: string, data: any): Observable<T> {
    return this.httpClient.post<T>(this.url + path, data);
  }

  delete<T>(path: string, params: any): Observable<any> {
    return this.httpClient.delete<T>(this.url + path, { params: this.setHttpParams(params) });
  }

  put<T>(path: string, data: any): Observable<T> {
    return this.httpClient.put<T>(this.url + path, data);
  }

  setHttpParams(params: any): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      const value = params[key];
      if (value !== null) {
        httpParams = httpParams.append(key, value);
      }
    });
    return httpParams;
  }
}

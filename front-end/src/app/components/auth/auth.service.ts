import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/service/api.service';
import { Observable } from 'rxjs';
import { Tokens } from 'src/app/data/interfaces/tokens';
import { Auth } from 'src/app/data/interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  get token() {
    return localStorage.getItem('accessToken');
  }

  constructor(private apiService: ApiService) {}
  path: string = '/auth';

  auth(authForm: Auth): Observable<Tokens> {
    return this.apiService.post<Tokens>(this.path, authForm);
  }
  getAccess(access: string) {
    return this.apiService.get(access);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LiqPay } from 'src/app/data/interfaces/liqPay';
import { ApiService } from 'src/app/shared/service/api.service';

@Injectable({
  providedIn: 'root',
})
export class DonateService {
  path: string = '/liqPay';

  constructor(private apiService: ApiService) {}

  postPayment(data: LiqPay): Observable<any> {
    return this.apiService.post<LiqPay>(this.path, data);
  }
  getTotalAmount(): Observable<any> {
    return this.apiService.get(this.path);
  }
}

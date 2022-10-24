import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/service/api.service';
@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  path: string = '/statistics';

  constructor(private apiService: ApiService) {}

  getPets(): Observable<[]> {
    return this.apiService.get<[]>(this.path + '/pets');
  }

  getDonates(): Observable<[]> {
    return this.apiService.get<[]>(this.path + '/donates');
  }
  getPetsNeed(): Observable<[]> {
    return this.apiService.get<[]>(this.path + '/pets-need');
  }
  getCountFood(): Observable<number> {
    return this.apiService.get<number>(this.path + '/count-food-each');
  }
  getCountDrug(): Observable<number> {
    return this.apiService.get<number>(this.path + '/count-drug-each');
  }
}

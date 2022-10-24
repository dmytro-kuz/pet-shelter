import { HttpParams } from '@angular/common/http';
import { Observable, tap, combineLatest, switchMap, withLatestFrom, debounceTime } from 'rxjs';
import { Injectable } from '@angular/core';
import { Pet } from 'src/app/data/interfaces/pet';
import { ApiService } from 'src/app/shared/service/api.service';
import { FilterService } from './components/filter/filter.service';
import { FilterOptions } from 'src/app/data/interfaces/filter-options';
import { LoadingService } from 'src/app/shared/service/loading.service';
@Injectable({
  providedIn: 'root',
})
export class PetsService {
  path: string = '/pets';

  constructor(private apiService: ApiService, private filterService: FilterService, private loader: LoadingService) {}

  loading$ = this.loader.loading$;
  pets$ = combineLatest([
    this.filterService.filter$.pipe(tap(() => this.filterService.changePagination({ page: 0 }))),
    this.filterService.pagination$,
  ]).pipe(
    debounceTime(100),
    withLatestFrom(this.filterService.filter$),
    switchMap(([[, pagination], filter]) => {
      filter.limit = pagination.limit;
      filter.page = pagination.page;
      return this.getPets(filter);
    }),
  );

  getPets(params: FilterOptions): Observable<any> {
    return this.apiService.get<any>(this.path, this.setHttpParams(params));
  }

  getPetsCount(params: FilterOptions): Observable<number> {
    return this.apiService.get<number>(this.path + '/count', this.setHttpParams(params));
  }

  getPetById(httpParams: HttpParams): Observable<Pet> {
    return this.apiService.get<Pet>(this.path + '/details', httpParams);
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

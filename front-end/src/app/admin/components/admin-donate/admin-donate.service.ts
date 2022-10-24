import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  Observable,
  startWith,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { ApiAdminService } from 'src/app/shared/service/api-admin.service';
import { TableData } from '../../shared/interfaces/table-data';
import { donateFilterValue } from '../../shared/data/donate-filter-value';
import { AdminDonateFilterOptions } from '../../shared/interfaces/admin-donate-filter-option';

@Injectable({
  providedIn: 'root',
})
export class AdminDonateService {
  path: string = '/donate';
  constructor(private apiAdminService: ApiAdminService) {}

  defFilterValues: AdminDonateFilterOptions = donateFilterValue.defValue;

  filterValues = new BehaviorSubject<AdminDonateFilterOptions>(this.defFilterValues);
  filterValues$ = this.filterValues.asObservable();

  sortValues = new BehaviorSubject<AdminDonateFilterOptions>(this.defFilterValues);
  sortValues$ = this.sortValues.asObservable();

  paginationValues: BehaviorSubject<AdminDonateFilterOptions> = new BehaviorSubject(this.defFilterValues);
  paginationValues$ = this.paginationValues.asObservable();

  donate$ = combineLatest([
    this.filterValues$.pipe(
      startWith(this.defFilterValues),
      tap(() => this.changePagination({ page: 0 })),
    ),
    this.paginationValues$,
    this.sortValues$.pipe(
      startWith(this.defFilterValues),
      tap(() => this.changePagination({ page: 0 })),
    ),
  ]).pipe(
    debounceTime(200),
    withLatestFrom(this.filterValues$),
    switchMap(([[, pagination, sort], filter]) => {
      filter.limit = pagination.limit;
      filter.page = pagination.page;
      filter.active = sort.active;
      filter.direction = sort.direction;
      return this.getAllDonate(filter);
    }),
  );

  changePagination(newPagination: any): void {
    this.paginationValues.next({ ...this.defFilterValues, ...newPagination });
  }

  data: TableData = {
    tableKeys: [
      { name: 'Дата', value: 'createDate', sort: true, format: 'dd.MM.yyyy HH:mm' },
      { name: 'Сума', value: 'amount', sort: true },
      { name: 'Статус', value: 'status', sort: true },
      { name: 'Помилки', value: 'errDescription', sort: false },
    ],
    sortDirection: 'desc',
    activeSort: 'createDate',
  };

  getAllDonate(params: any): Observable<any> {
    return this.apiAdminService.get<any>(this.path, params);
  }
  editDonate(data: any): Observable<any> {
    return this.apiAdminService.put<any>(this.path, data);
  }
}

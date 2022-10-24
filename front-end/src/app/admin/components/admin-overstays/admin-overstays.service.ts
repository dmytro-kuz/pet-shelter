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
import { Overstay } from 'src/app/data/interfaces/overstay';
import { ResponseMessage } from 'src/app/data/interfaces/response-message';
import { ApiAdminService } from 'src/app/shared/service/api-admin.service';
import { overstayFilterValue } from '../../shared/data/overstay-filter-value';
import { AdminOverstay } from '../../shared/interfaces/admin-overstay';
import { AdminOverstayFilterOptions } from '../../shared/interfaces/admin-overstay-filter-options';
import { TableData } from '../../shared/interfaces/table-data';

@Injectable({
  providedIn: 'root',
})
export class AdminOverstaysService {
  path: string = '/overstay';

  defFilterValues: AdminOverstayFilterOptions = overstayFilterValue.defValue;

  filterValues = new BehaviorSubject<AdminOverstayFilterOptions>(this.defFilterValues);
  filterValues$ = this.filterValues.asObservable();

  sortValues = new BehaviorSubject<AdminOverstayFilterOptions>(this.defFilterValues);
  sortValues$ = this.sortValues.asObservable();

  paginationValues: BehaviorSubject<AdminOverstayFilterOptions> = new BehaviorSubject(this.defFilterValues);
  paginationValues$ = this.paginationValues.asObservable();

  overstays$ = combineLatest([
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
      return this.getOverstays(filter);
    }),
  );

  changePagination(newPagination: any) {
    this.paginationValues.next({ ...this.defFilterValues, ...newPagination });
  }

  data: TableData = {
    tableKeys: [
      { name: 'Дата', value: 'createdAt', sort: true, format: 'dd.MM.yyyy' },
      { name: 'Статус', value: 'overstayStatus', sort: true },
      { name: 'Клієнт', value: 'clientName', sort: true },
      { name: 'Телефон', value: 'clientPhone' },
      { name: 'Електронна адреса', value: 'clientEmail' },
    ],
    route: '/admin/overstay-details',
    sortDirection: 'desc',
    activeSort: 'createdAt',
  };

  constructor(private adminService: ApiAdminService) {}

  editOverstay(overstay: Overstay): Observable<any> {
    return this.adminService.put(this.path + '/edit', overstay);
  }

  editOverstayDates(overstayDates: any): Observable<any> {
    return this.adminService.put(this.path + '/edit', overstayDates);
  }

  deleteOverstay(id: string): Observable<ResponseMessage> {
    return this.adminService.delete(this.path + '/delete', { id });
  }

  getOverstays(params: AdminOverstayFilterOptions): Observable<any> {
    return this.adminService.get<any>(this.path, params);
  }

  getOverstayById(id: string): Observable<AdminOverstay> {
    return this.adminService.get(this.path + '/id', { id });
  }
}

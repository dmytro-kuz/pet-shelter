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
import { Adopt } from 'src/app/data/interfaces/adopt';
import { ResponseMessage } from 'src/app/data/interfaces/response-message';
import { ApiAdminService } from 'src/app/shared/service/api-admin.service';
import { adoptFilterValue } from '../../shared/data/adopt-filter-value';
import { AdminAdopt } from '../../shared/interfaces/admin-adopt';
import { AdminAdoptFilterOptions } from '../../shared/interfaces/admin-adopt-filter-options';
import { TableData } from '../../shared/interfaces/table-data';

@Injectable({
  providedIn: 'root',
})
export class AdminAdoptService {
  path: string = '/adopt';

  defFilterValues: AdminAdoptFilterOptions = adoptFilterValue.defValue;

  filterValues = new BehaviorSubject<AdminAdoptFilterOptions>(this.defFilterValues);
  filterValues$ = this.filterValues.asObservable();

  sortValues = new BehaviorSubject<AdminAdoptFilterOptions>(this.defFilterValues);
  sortValues$ = this.sortValues.asObservable();

  paginationValues: BehaviorSubject<AdminAdoptFilterOptions> = new BehaviorSubject(this.defFilterValues);
  paginationValues$ = this.paginationValues.asObservable();

  adopts$ = combineLatest([
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
      return this.getAdopts(filter);
    }),
  );

  changePagination(newPagination: any) {
    this.paginationValues.next({ ...this.defFilterValues, ...newPagination });
  }

  data: TableData = {
    tableKeys: [
      { name: 'Дата', value: 'createdAt', sort: true, format: 'dd.MM.yyyy' },
      { name: 'Статус', value: 'adoptStatus', sort: true },
      { name: 'Клієнт', value: 'clientName', sort: true },
      { name: 'Телефон', value: 'clientPhone' },
      { name: 'Електронна адреса', value: 'clientEmail' },
    ],
    route: '/admin/adopt-details',
    sortDirection: 'desc',
    activeSort: 'createdAt',
  };

  constructor(private adminService: ApiAdminService) {}

  editAdopt(adopt: Adopt): Observable<any> {
    return this.adminService.put<AdminAdopt>(this.path + '/edit', adopt);
  }

  deleteAdopt(id: string): Observable<ResponseMessage> {
    return this.adminService.delete(this.path + '/delete', { id });
  }

  getAdopts(params: AdminAdoptFilterOptions): Observable<any> {
    return this.adminService.get<any>(this.path, params);
  }

  getAdoptById(id: string): Observable<AdminAdopt> {
    return this.adminService.get(this.path + '/id', { id });
  }
}

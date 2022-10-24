import { petFilterValue } from '../../shared/data/pet-filter-value';
import { ApiAdminService } from 'src/app/shared/service/api-admin.service';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  tap,
  BehaviorSubject,
  combineLatest,
  startWith,
  withLatestFrom,
  switchMap,
  debounceTime,
} from 'rxjs';
import { AdminPetFilterOptions } from 'src/app/admin/shared/interfaces/admin-pet-filter-options';
import { Pet } from 'src/app/data/interfaces/pet';
import { ApiService } from 'src/app/shared/service/api.service';
import { TableData } from '../../shared/interfaces/table-data';
import { ResponseMessage } from 'src/app/data/interfaces/response-message';

@Injectable({
  providedIn: 'root',
})
export class AdminPetsService {
  path: string = '/pets';

  constructor(private apiService: ApiService, private apiAdminService: ApiAdminService) {}

  defFilterValues: AdminPetFilterOptions = petFilterValue.defValue;

  filterValues = new BehaviorSubject<AdminPetFilterOptions>(this.defFilterValues);
  filterValues$ = this.filterValues.asObservable();

  paginationValues: BehaviorSubject<AdminPetFilterOptions> = new BehaviorSubject(this.defFilterValues);
  paginationValues$ = this.paginationValues.asObservable();

  sortValues = new BehaviorSubject<AdminPetFilterOptions>(this.defFilterValues);
  sortValues$ = this.sortValues.asObservable();

  pets$ = combineLatest([
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
      return this.getPets(filter);
    }),
  );

  changePagination(newPagination: any) {
    this.paginationValues.next({ ...this.defFilterValues, ...newPagination });
  }

  data: TableData = {
    tableKeys: [
      { name: 'Імʼя', value: 'name', sort: true },
      { name: 'Вид', value: 'type', sort: true },
      { name: 'Стать', value: 'sex', sort: true },
      { name: 'Розмір', value: 'size', sort: true },
      { name: 'Статус', value: 'status', sort: true },
    ],
    route: '/admin/pets/detail',
    sortDirection: 'desc',
    activeSort: '',
  };

  getPets(params: AdminPetFilterOptions): Observable<any> {
    return this.apiAdminService.get<any>(this.path, params);
  }

  getPetById(params: object): Observable<Pet> {
    return this.apiAdminService.get<Pet>(this.path + '/details', params);
  }

  editPet(editForm: any): Observable<any> {
    return this.apiAdminService.put<Pet>(this.path, editForm);
  }
  deletePet(id: string): Observable<any> {
    return this.apiAdminService.delete<any>(this.path, { id });
  }

  addPet(params: Pet): Observable<Pet> {
    return this.apiAdminService.post<Pet>(this.path, params);
  }

  uploadPhoto(editForm: any): Observable<Pet> {
    return this.apiAdminService.post<Pet>(this.path + '/photo', editForm);
  }

  deletePhoto(id?: string, photoName?: string) {
    return this.apiAdminService.delete<Pet>(this.path + '/photo', { id, photoName });
  }

  changeSelectedPhoto(changePhotoForm: any) {
    return this.apiAdminService.put<Pet>(this.path + '/photo', changePhotoForm);
  }
}

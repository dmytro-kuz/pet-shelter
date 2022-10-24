import { TableData } from '../../shared/interfaces/table-data';
import { Injectable } from '@angular/core';
import { ApiAdminService } from 'src/app/shared/service/api-admin.service';
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
import { News } from 'src/app/data/interfaces/news';
import { AdminNewsFilterOptions } from '../../shared/interfaces/admin-news-filter-options';
import { newsFilterValue } from '../../shared/data/news-filter-value';

@Injectable({
  providedIn: 'root',
})
export class AdminNewsService {
  path: string = '/news';
  constructor(private apiAdminService: ApiAdminService) {}

  defFilterValues: AdminNewsFilterOptions = newsFilterValue.defValue;

  filterValues = new BehaviorSubject<AdminNewsFilterOptions>(this.defFilterValues);
  filterValues$ = this.filterValues.asObservable();

  sortValues = new BehaviorSubject<AdminNewsFilterOptions>(this.defFilterValues);
  sortValues$ = this.sortValues.asObservable();

  paginationValues: BehaviorSubject<AdminNewsFilterOptions> = new BehaviorSubject(this.defFilterValues);
  paginationValues$ = this.paginationValues.asObservable();

  news$ = combineLatest([
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
      return this.getNews(filter);
    }),
  );

  changePagination(newPagination: any): void {
    this.paginationValues.next({ ...this.defFilterValues, ...newPagination });
  }

  data: TableData = {
    tableKeys: [
      { name: 'Дата', value: 'createdAt', sort: true, format: 'dd.MM.yyyy HH:mm' },
      { name: 'Заголовок', value: 'title' },
      { name: 'Підзаголовок', value: 'subtitle' },
    ],
    sortDirection: '',
    activeSort: 'createDate',
    route: '/admin/news/details',
  };

  getNews(params: AdminNewsFilterOptions): Observable<any> {
    return this.apiAdminService.get<any>(this.path, params);
  }

  getNewsById(id: string): Observable<News> {
    return this.apiAdminService.get(this.path + '/details', { id });
  }

  editNews(editForm: News): Observable<News> {
    return this.apiAdminService.put<News>(this.path + '/edit', editForm);
  }

  deleteNews(id: string): Observable<any> {
    return this.apiAdminService.delete<any>(this.path + '/delete', { id });
  }

  addNews(title: string, subtitle: string, text: string, newsImages: Array<File>): Observable<News> {
    let formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('text', text);

    for (let i = 0; i < newsImages.length; i++) {
      formData.append('photos', newsImages[i]);
    }

    return this.apiAdminService.post<News>(this.path, formData);
  }

  uploadPhoto(editForm: any): Observable<News> {
    return this.apiAdminService.post<News>(this.path + '/photo', editForm);
  }

  deletePhoto(id?: string, photoName?: string) {
    return this.apiAdminService.delete<News>(this.path + '/photo', { id, photoName });
  }

  changeSelectedPhoto(changePhotoForm: any) {
    return this.apiAdminService.put<News>(this.path + '/photo', changePhotoForm);
  }
}

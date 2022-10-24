import { FilterOptions } from 'src/app/data/interfaces/filter-options';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor() {}

  startPageSize: number = 6;
  startPageIndex: number = 0;

  defValue: FilterOptions = {
    type: null,
    size: null,
    sex: null,
    age: null,
    limit: this.startPageSize,
    page: this.startPageIndex,
  };

  filter: BehaviorSubject<FilterOptions> = new BehaviorSubject(this.defValue);
  filter$ = this.filter.asObservable();

  pagination: BehaviorSubject<FilterOptions> = new BehaviorSubject(this.defValue);
  pagination$ = this.pagination.asObservable();

  changePagination(newPagination: any): void {
    this.pagination.next({ ...this.defValue, ...newPagination });
  }
}

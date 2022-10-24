import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, switchMap, combineLatest } from 'rxjs';
import { TableData } from '../../shared/interfaces/table-data';
import { ApiAdminService } from 'src/app/shared/service/api-admin.service';
import { FormGroup } from '@angular/forms';
import { statisticsFilterValueFood, statisticsFilterValueDrug } from '../../shared/data/statistics-filter-value';
import {
  AdminStatisticOptions,
  AdminStatisticsDrugValue,
  AdminStatisticsFoodValue,
} from '../../shared/interfaces/admin-statistics-value';

import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class AdminStatisticService {
  pathFood: string = '/statistics/food-data';
  pathDrug: string = '/statistics/drug-data';

  filterValuesFood = new BehaviorSubject<AdminStatisticOptions>(statisticsFilterValueFood.defValue);
  filterValuesFood$ = this.filterValuesFood.asObservable();

  filterValuesDrug = new BehaviorSubject<AdminStatisticOptions>(statisticsFilterValueDrug.defValue);
  filterValuesDrug$ = this.filterValuesDrug.asObservable();

  statisticsFoodList: BehaviorSubject<any> = new BehaviorSubject([]);
  statisticsDrugList: BehaviorSubject<any> = new BehaviorSubject([]);

  statisticsFoodList$ = this.statisticsFoodList.asObservable();
  statisticsDrugList$ = this.statisticsDrugList.asObservable();

  sortValuesFood = new BehaviorSubject<AdminStatisticOptions>(statisticsFilterValueFood.defValue);
  sortValuesFood$ = this.sortValuesFood.asObservable();

  sortValuesDrug = new BehaviorSubject<AdminStatisticOptions>(statisticsFilterValueDrug.defValue);
  sortValuesDrug$ = this.sortValuesDrug.asObservable();

  paginationValuesFood: BehaviorSubject<AdminStatisticOptions> = new BehaviorSubject(
    statisticsFilterValueFood.defValue,
  );
  paginationValuesFood$ = this.paginationValuesFood.asObservable();

  paginationValuesDrug: BehaviorSubject<AdminStatisticOptions> = new BehaviorSubject(
    statisticsFilterValueDrug.defValue,
  );
  paginationValuesDrug$ = this.paginationValuesDrug.asObservable();

  foods$: Observable<AdminStatisticsFoodValue> = combineLatest([
    this.statisticsFoodList$,
    this.paginationValuesFood$,
    this.sortValuesFood$,
    this.filterValuesFood$,
  ]).pipe(
    switchMap(([, pagination, sort, filter]) => {
      return this.getFoodStatistics({
        limit: pagination.limit,
        page: pagination.page,
        name: filter.name,
        active: sort.active,
        direction: sort.direction,
      });
    }),
  );

  drugs$: Observable<any> = combineLatest([
    this.statisticsDrugList$,
    this.paginationValuesDrug$,
    this.sortValuesDrug$,
    this.filterValuesDrug$,
  ]).pipe(
    switchMap(([, pagination, sort, filter]) => {
      return this.getDrugStatistics({
        limit: pagination.limit,
        page: pagination.page,
        active: sort.active,
        direction: sort.direction,
        name: filter.name,
      });
    }),
  );

  dataFood: TableData = {
    tableKeys: [
      { name: 'Тварина', value: 'type', sort: true },
      { name: 'Виробник', value: 'name', sort: true },
      { name: 'Ціна', value: 'number', sort: true },
    ],

    tableData: this.foods$,
    pagination: this.paginationValuesFood$,
    sortDirection: '',
    activeSort: 'type',
    route: '/admin/statistics/food/details',
  };

  dataDrug: TableData = {
    tableKeys: [
      { name: 'Назва препарату', value: 'name', sort: true },
      { name: 'Ціна', value: 'number', sort: true },
      { name: 'Статус', value: 'status', sort: true },
    ],

    tableData: this.drugs$,
    pagination: this.paginationValuesDrug$,
    sortDirection: '',
    activeSort: 'name',
    route: '/admin/statistics/drug/details',
  };

  constructor(private service: ApiAdminService, public dialog: MatDialog) {}

  getFoodStatistics(params: AdminStatisticOptions): Observable<AdminStatisticsFoodValue> {
    return this.service.get<AdminStatisticsFoodValue>(this.pathFood, params);
  }

  getDrugStatistics(params: AdminStatisticOptions): Observable<AdminStatisticsDrugValue> {
    return this.service.get<AdminStatisticsDrugValue>(this.pathDrug, params);
  }

  createFoodStatistics(form: FormGroup, url: string) {
    return this.service
      .post(url, form)
      .pipe(tap(item => this.statisticsFoodList.next([...this.statisticsFoodList.value, item])));
  }

  deleteFood(food: any) {
    return this.service
      .delete('/statistics/food', food)
      .pipe(
        tap(deletedFood =>
          this.statisticsFoodList.next(
            this.statisticsFoodList.value.filter((food: any) => food._id !== deletedFood._id),
          ),
        ),
      );
  }

  deleteDrug(drug: any) {
    return this.service
      .delete('/statistics/drug', drug)
      .pipe(
        tap(deletedDrug =>
          this.statisticsDrugList.next(
            this.statisticsDrugList.value.filter((drug: any) => drug._id !== deletedDrug._id),
          ),
        ),
      );
  }
  createDrugStatistics(form: FormGroup, url: string) {
    return this.service
      .post(url, form)
      .pipe(tap(item => this.statisticsDrugList.next([...this.statisticsDrugList.value, item])));
  }
  updateCountNeed(form: FormGroup, url: string) {
    return this.service.put(url, form);
  }
}

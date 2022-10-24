import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiAdminService } from 'src/app/shared/service/api-admin.service';
import { AdminStatisticService } from '../admin-statistic.service';
import {
  AdminStatisticOptions,
  AdminStatisticsFoodValue,
} from 'src/app/admin/shared/interfaces/admin-statistics-value';
import { first, Observable } from 'rxjs';
import { AdminStatisticsFilterValue } from 'src/app/admin/shared/interfaces/admin-statistics-value';
import { statisticsFilterValueFood } from 'src/app/admin/shared/data/statistics-filter-value';

@Component({
  selector: 'app-admin-food-statistics',
  templateUrl: './admin-food-statistics.component.html',
  styleUrls: ['./admin-food-statistics.component.scss'],
})
export class AdminFoodStatisticsComponent implements OnInit {
  foodForm = this.fb.group({
    type: ['', [Validators.required]],
    name: ['', [Validators.required]],
    number: ['', [Validators.required]],
  });

  countFoodForm = this.fb.group({
    count: [''],
  });

  types = ['Кіт', 'Собака'];

  dataFood = this.adminStatisticService.dataFood;

  filterParams: AdminStatisticsFilterValue = statisticsFilterValueFood;
  tableData$: Observable<AdminStatisticsFoodValue> = this.adminStatisticService.foods$;
  pagination$: Observable<any> = this.adminStatisticService.paginationValuesFood$;
  foodAmount: number = 0;

  constructor(
    private fb: FormBuilder,
    private service: ApiAdminService,
    private adminStatisticService: AdminStatisticService,
  ) {}

  ngOnInit(): void {
    this.service
      .get('/statistics/get-count-food', {})
      .pipe(first())
      .subscribe(data => {
        this.countFoodForm.patchValue({ count: data });
      });

    this.tableData$.subscribe(res => {
      this.foodAmount = res.sum;
    });
  }

  onSubmitFood(form: FormGroup, url: string) {
    this.adminStatisticService
      .createFoodStatistics(form.value, url)
      .pipe(first())
      .subscribe(data => {
        this.foodForm.patchValue({});
        this.foodForm.reset();
      });
  }

  onSubmitCount(form: FormGroup) {
    this.adminStatisticService.updateCountNeed(form.value, '/statistics/add-count-food').pipe(first()).subscribe();
  }

  onPaginationChange(newOptions: AdminStatisticOptions) {
    this.adminStatisticService.paginationValuesFood.next(newOptions);
  }

  onSortChange(newOptions: AdminStatisticOptions) {
    this.adminStatisticService.sortValuesFood.next(newOptions);
  }
  onFilterChange(filter: AdminStatisticOptions) {
    this.adminStatisticService.filterValuesFood.next(filter);
  }

  resetForm() {
    this.foodForm.reset();
    this.foodForm.markAsUntouched();
  }
}

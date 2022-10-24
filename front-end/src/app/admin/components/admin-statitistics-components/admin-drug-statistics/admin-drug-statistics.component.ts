import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, Observable } from 'rxjs';
import { statisticsFilterValueDrug } from 'src/app/admin/shared/data/statistics-filter-value';
import {
  AdminStatisticOptions,
  AdminStatisticsFilterValue,
} from 'src/app/admin/shared/interfaces/admin-statistics-value';

import { TableData } from 'src/app/admin/shared/interfaces/table-data';
import { ApiAdminService } from 'src/app/shared/service/api-admin.service';
import { AdminStatisticService } from '../admin-statistic.service';

@Component({
  selector: 'app-admin-drug-statistics',
  templateUrl: './admin-drug-statistics.component.html',
  styleUrls: ['./admin-drug-statistics.component.scss'],
})
export class AdminDrugStatisticsComponent implements OnInit {
  drugForm = this.fb.group({
    name: ['', [Validators.required]],
    number: ['', [Validators.required]],
    status: ['', Validators.required],
  });
  countDrugForm = this.fb.group({
    count: [''],
  });

  checked = false;
  indeterminate = false;
  labelPosition: 'потрібно' | 'придбано' = 'придбано';

  dataTable: TableData | undefined;
  filterParams: AdminStatisticsFilterValue = statisticsFilterValueDrug;
  dataDrug = this.adminStatisticService.dataDrug;

  tableData$: Observable<any> = this.adminStatisticService.drugs$;
  pagination$: Observable<any> = this.adminStatisticService.paginationValuesDrug$;

  drugAmount: number = 0;

  constructor(
    private fb: FormBuilder,
    private service: ApiAdminService,
    private adminStatisticService: AdminStatisticService,
  ) {}

  ngOnInit(): void {
    this.service
      .get('/statistics/get-count-drug', {})
      .pipe(first())
      .subscribe(data => {
        this.countDrugForm.patchValue({ count: data });
      });
    this.tableData$.subscribe(res => {
      this.drugAmount = res.sum;
    });
  }
  onSubmitDrug(form: FormGroup, url: string) {
    this.adminStatisticService
      .createDrugStatistics(form.value, url)
      .pipe(first())
      .subscribe(data => {
        this.drugForm.patchValue({});
        this.drugForm.reset();
      });
  }
  onSubmitCount(form: FormGroup) {
    this.adminStatisticService.updateCountNeed(form.value, '/statistics/add-count-drug').pipe(first()).subscribe();
  }
  onPaginationChange(newPagination: any) {
    this.adminStatisticService.paginationValuesDrug.next(newPagination);
  }

  onSortChange(newOptions: AdminStatisticOptions) {
    this.adminStatisticService.sortValuesDrug.next(newOptions);
  }
  onFilterChange(filter: AdminStatisticOptions) {
    this.adminStatisticService.filterValuesDrug.next(filter);
  }
  resetForm() {
    this.drugForm.reset();
    this.drugForm.markAsUntouched();
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { adoptFilterValue } from 'src/app/admin/shared/data/adopt-filter-value';
import { AdminAdoptFilterOptions } from 'src/app/admin/shared/interfaces/admin-adopt-filter-options';
import { AdoptFilterValue } from 'src/app/admin/shared/interfaces/adopt-filter-value';
import { AdminAdoptService } from '../admin-adopt.service';

@Component({
  selector: 'app-admin-adopts',
  templateUrl: './admin-adopts.component.html',
  styleUrls: ['./admin-adopts.component.scss'],
})
export class AdminAdoptsComponent implements OnInit {
  data = this.adminAdoptService.data;
  filterParams: AdoptFilterValue = adoptFilterValue;
  tableData$: Observable<any> = this.adminAdoptService.adopts$;
  pagination$: Observable<any> = this.adminAdoptService.paginationValues$;

  constructor(private adminAdoptService: AdminAdoptService) {}

  ngOnInit() {}

  onFilterChange(filter: AdminAdoptFilterOptions) {
    this.adminAdoptService.filterValues.next(filter);
  }

  onSortChange(sort: AdminAdoptFilterOptions) {
    this.adminAdoptService.sortValues.next(sort);
  }

  onPaginationChange(newPagination: AdminAdoptFilterOptions) {
    this.adminAdoptService.paginationValues.next(newPagination);
  }
}

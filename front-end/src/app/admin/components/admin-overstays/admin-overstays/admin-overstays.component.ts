import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { overstayFilterValue } from 'src/app/admin/shared/data/overstay-filter-value';
import { AdminOverstayFilterOptions } from 'src/app/admin/shared/interfaces/admin-overstay-filter-options';
import { OverstayFilterValue } from 'src/app/admin/shared/interfaces/overstay-filter-value copy';
import { AdminOverstaysService } from '../admin-overstays.service';

@Component({
  selector: 'app-admin-overstays',
  templateUrl: './admin-overstays.component.html',
  styleUrls: ['./admin-overstays.component.scss'],
})
export class AdminOverstaysComponent implements OnInit {
  data = this.adminOverstaysService.data;
  filterParams: OverstayFilterValue = overstayFilterValue;
  tableData$: Observable<any> = this.adminOverstaysService.overstays$;
  pagination$: Observable<any> = this.adminOverstaysService.paginationValues$;

  constructor(private adminOverstaysService: AdminOverstaysService) {}

  ngOnInit() {}

  onFilterChange(filter: AdminOverstayFilterOptions) {
    this.adminOverstaysService.filterValues.next(filter);
  }

  onSortChange(sort: AdminOverstayFilterOptions) {
    this.adminOverstaysService.sortValues.next(sort);
  }

  onPaginationChange(newPagination: AdminOverstayFilterOptions) {
    this.adminOverstaysService.paginationValues.next(newPagination);
  }
}

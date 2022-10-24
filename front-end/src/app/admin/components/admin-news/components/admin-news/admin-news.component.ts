import { TableData } from 'src/app/admin/shared/interfaces/table-data';
import { newsFilterValue } from '../../../../shared/data/news-filter-value';
import { AdminNewsFilterOptions } from '../../../../shared/interfaces/admin-news-filter-options';
import { AdminNewsService } from '../../admin-news.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminNewsFilterValue } from 'src/app/admin/shared/interfaces/admin-news-filter-value';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.scss'],
})
export class AdminNewsComponent implements OnInit {
  constructor(private adminNewsService: AdminNewsService, public matDialog: MatDialog) {}

  data: TableData = this.adminNewsService.data;
  tableData$: Observable<any> = this.adminNewsService.news$;
  pagination$: Observable<any> = this.adminNewsService.paginationValues$;

  filterParams: AdminNewsFilterValue = newsFilterValue;

  ngOnInit(): void {}

  onSortChange(sort: AdminNewsFilterOptions): void {
    this.adminNewsService.sortValues.next(sort);
  }

  onFilterChange(filter: AdminNewsFilterOptions): void {
    this.adminNewsService.filterValues.next(filter);
  }
  onPaginationChange(newPagination: AdminNewsFilterOptions): void {
    this.adminNewsService.paginationValues.next(newPagination);
  }
}

import { Donate } from 'src/app/data/interfaces/donate';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { TableTitle } from '../interfaces/table-title';
import { Observable } from 'rxjs';
import { TableData } from '../interfaces/table-data';
import { PageEvent, MatPaginatorIntl, MatPaginator } from '@angular/material/paginator';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { Sort, SortDirection } from '@angular/material/sort';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-content-table',
  templateUrl: './content-table.component.html',
  styleUrls: ['./content-table.component.scss'],
})
export class ContentTableComponent implements OnInit, OnChanges {
  [x: string]: any;
  @Output() PaginationChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() sortChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() viewChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() data?: TableData;
  @Input() values?: any;
  @Input() viewedId?: string;
  @ViewChild('paginator') paginator: MatPaginator | undefined;

  loading$?: Observable<any>;
  dataSource?: any;
  columnsToDisplay?: TableTitle[];
  rowToDisplay?: string[];
  router?: string;
  amount?: number;
  pagination?: any;
  rowId?: string | undefined;
  activeSort?: string;
  sortDirection: SortDirection = '';

  constructor(private matPaginator: MatPaginatorIntl, private loader: LoadingService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.rowId = this.viewedId;
    this.dataSource = this.values.content;
    this.pagination = this.values.pagination;
    this.setClassViewed(this.rowId);
  }

  ngOnInit() {
    this.rowId = this.viewedId;
    this.loading$ = this.loader.loading$;
    this.matPaginator.nextPageLabel = 'Наступна стор.';
    this.matPaginator.previousPageLabel = 'Попередня стор.';
    this.matPaginator.itemsPerPageLabel = 'Показати на сторінці:';

    this.dataSource = this.values.content;
    this.columnsToDisplay = this.data?.tableKeys;
    this.rowToDisplay = this.rows;
    this.router = this.data?.route;
    this.pagination = this.values.pagination;
    this.activeSort = this.data?.activeSort;
    this.sortDirection = this.data!.sortDirection;
  }

  get rows() {
    const result: string[] = [];
    this.columnsToDisplay?.forEach(element => {
      result.push(element.value);
    });
    return result;
  }

  onPageChange(event: PageEvent) {
    this.PaginationChange.emit({
      limit: event.pageSize,
      page: event.pageIndex,
    });
  }

  onSortChange(sort: Sort) {
    this.sortChange.emit(sort);
  }

  onViewChange(_id: string, viewed: boolean) {
    if (viewed !== undefined) {
      const res = { _id, viewed: true };
      this.viewChange.emit(res);
    }
  }

  setClassViewed(elementId: string | undefined) {
    if (elementId !== undefined) {
      const row = document.getElementById(elementId);
      row?.classList.add('viewed');
    }
  }
}

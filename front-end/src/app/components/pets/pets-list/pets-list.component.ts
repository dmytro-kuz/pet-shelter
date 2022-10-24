import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { PetsService } from '../pets.service';
import { FilterService } from '../components/filter/filter.service';
import { FilterOptions } from 'src/app/data/interfaces/filter-options';
import { tap } from 'rxjs';
@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.scss'],
})
export class PetsListComponent implements OnInit, OnDestroy {
  constructor(
    private petsService: PetsService,
    private matPaginator: MatPaginatorIntl,
    private filterService: FilterService,
  ) {}

  @ViewChild('paginator') paginator: MatPaginator | undefined;

  loading$ = this.petsService.loading$;
  pets$ = this.petsService.pets$.pipe(
    tap(() => {
      if (this.filterService.filter.value.page === 0) this.paginator?.firstPage();
    }),
  );

  defValue: FilterOptions = {
    type: null,
    size: null,
    sex: null,
    age: null,
    limit: 6,
    page: 0,
  };

  ngOnInit() {
    this.matPaginator.nextPageLabel = 'Наступна стор.';
    this.matPaginator.previousPageLabel = 'Попередня стор.';
    this.matPaginator.itemsPerPageLabel = 'К-ть тварин на сторінці:';
  }
  ngOnDestroy() {
    this.filterService.filter.next(this.defValue);
    this.filterService.pagination.next(this.defValue);
  }
  onPageChange(event: PageEvent) {
    this.filterService.changePagination({
      limit: event.pageSize,
      page: event.pageIndex,
    });
  }
}

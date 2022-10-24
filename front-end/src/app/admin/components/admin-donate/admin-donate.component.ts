import { Component, OnInit } from '@angular/core';
import { donateFilterValue } from '../../shared/data/donate-filter-value';
import { DonateFilterValue } from '../../shared/interfaces/donate-filter-value';
import { TableData } from '../../shared/interfaces/table-data';
import { AdminDonateService } from './admin-donate.service';
import { AdminDonateFilterOptions } from '../../shared/interfaces/admin-donate-filter-option';
import { SocketService } from 'src/app/shared/service/socket.service';
import { first, Observable } from 'rxjs';

@Component({
  selector: 'app-admin-donate',
  templateUrl: './admin-donate.component.html',
  styleUrls: ['./admin-donate.component.scss'],
})
export class AdminDonateComponent implements OnInit {
  constructor(private adminDonateService: AdminDonateService, private socketService: SocketService) {}
  viewedId?: string;
  data: TableData = this.adminDonateService.data;
  filterParams: DonateFilterValue = donateFilterValue;
  list?: any;
  tableData$: Observable<any> = this.adminDonateService.donate$;
  pagination$: Observable<any> = this.adminDonateService.paginationValues$;

  ngOnInit() {}

  onSortChange(sort: AdminDonateFilterOptions): void {
    this.adminDonateService.sortValues.next(sort);
  }

  onFilterChange(filter: AdminDonateFilterOptions): void {
    this.adminDonateService.filterValues.next(filter);
  }
  onPaginationChange(newPagination: AdminDonateFilterOptions): void {
    this.adminDonateService.paginationValues.next(newPagination);
  }

  onViewChange(data: any) {
    this.adminDonateService
      .editDonate(data)
      .pipe(first())
      .subscribe(res => {
        if (res.viewed === true) {
          this.socketService.emit('change', 'donate viewed');
          this.viewedId = res._id;
        }
      });
  }
}

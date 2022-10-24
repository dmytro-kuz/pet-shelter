import { Observable } from 'rxjs';
import { petFilterValue } from '../../../shared/data/pet-filter-value';
import { Component, OnInit } from '@angular/core';
import { AdminPetsService } from '../admin-pets.service';
import { TableData } from 'src/app/admin/shared/interfaces/table-data';
import { PetFilterValue } from 'src/app/admin/shared/interfaces/pet-filter-value';
import { MatDialog } from '@angular/material/dialog';
import { AdminPetsModalComponent } from '../admin-pets-modal/admin-pets-modal.component';
import { AdminPetFilterOptions } from 'src/app/admin/shared/interfaces/admin-pet-filter-options';
@Component({
  selector: 'app-admin-pets',
  templateUrl: './admin-pets.component.html',
  styleUrls: ['./admin-pets.component.scss'],
})
export class AdminPetsComponent implements OnInit {
  constructor(private adminPetsService: AdminPetsService, public matDialog: MatDialog) {}

  data: TableData = this.adminPetsService.data;
  tableData$: Observable<any> = this.adminPetsService.pets$;
  pagination$: Observable<any> = this.adminPetsService.paginationValues$;
  filterParams: PetFilterValue = petFilterValue;

  ngOnInit() {}

  openDialog() {
    this.matDialog.open(AdminPetsModalComponent, {
      width: '400px',
      disableClose: true,
    });
  }

  onFilterChange(filter: AdminPetFilterOptions): void {
    this.adminPetsService.filterValues.next(filter);
  }
  onPaginationChange(newPagination: AdminPetFilterOptions): void {
    this.adminPetsService.paginationValues.next(newPagination);
  }
  onSortChange(sort: AdminPetFilterOptions): void {
    this.adminPetsService.sortValues.next(sort);
  }
}

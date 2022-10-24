import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { AdminRoutingModule } from '../../admin-routing.module';
import { ContentTableComponent } from 'src/app/admin/shared/content-table/content-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SpinnerModule } from 'src/app/shared/components/spinner/spinner.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    AdminRoutingModule,
    MatPaginatorModule,
    MatSortModule,
    SpinnerModule,
    MatIconModule,
  ],
  declarations: [ContentTableComponent],
  exports: [ContentTableComponent],
})
export class ContentTableModule {}

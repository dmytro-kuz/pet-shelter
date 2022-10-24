import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDonateComponent } from './admin-donate.component';
import { ContentTableModule } from '../../shared/content-table/content-table.module';
import { AdminFilterModule } from '../../shared/admin-filter/admin-filter.module';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  imports: [CommonModule, ContentTableModule, AdminFilterModule, MatIconModule],
  declarations: [AdminDonateComponent],
  exports: [AdminDonateComponent],
})
export class AdminDonateModule {}

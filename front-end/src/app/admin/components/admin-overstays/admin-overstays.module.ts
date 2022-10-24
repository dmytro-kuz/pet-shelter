import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaskModule } from 'ngx-mask';

import { AdminOverstaysComponent } from './admin-overstays/admin-overstays.component';
import { AdminOverstayDetailsComponent } from './admin-overstay-details/admin-overstay-details.component';
import { ContentTableModule } from '../../shared/content-table/content-table.module';
import { AdminFilterModule } from '../../shared/admin-filter/admin-filter.module';
import { MainDetailsInfoModule } from '../../shared/main-details-info/main-details-info.module';
import { AdminRoutingModule } from '../../admin-routing.module';
import { DatepickerModule } from 'src/app/shared/components/datepicker/datepicker.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    NgxMaskModule.forRoot(),
    ContentTableModule,
    AdminFilterModule,
    MainDetailsInfoModule,
    AdminRoutingModule,
    DatepickerModule,
  ],
  declarations: [AdminOverstaysComponent, AdminOverstayDetailsComponent],
})
export class AdminOverstaysModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskModule } from 'ngx-mask';

import { AdminAdoptsComponent } from './admin-adopts/admin-adopts.component';
import { AdminAdoptDetailsComponent } from './admin-adopt-details/admin-adopt-details.component';
import { ContentTableModule } from '../../shared/content-table/content-table.module';
import { AdminFilterModule } from '../../shared/admin-filter/admin-filter.module';
import { MainDetailsInfoModule } from '../../shared/main-details-info/main-details-info.module';
import { AdminRoutingModule } from '../../admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ContentTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    NgxMaskModule.forRoot(),
    AdminFilterModule,
    MainDetailsInfoModule,
    AdminRoutingModule,
  ],
  declarations: [AdminAdoptsComponent, AdminAdoptDetailsComponent],
})
export class AdminAdoptModule {}

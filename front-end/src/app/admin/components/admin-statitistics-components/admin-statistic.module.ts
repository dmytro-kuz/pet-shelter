import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from 'src/app/admin/admin-routing.module';
import { MatListModule } from '@angular/material/list';
import { AdminDrugStatisticsComponent } from './admin-drug-statistics/admin-drug-statistics.component';
import { AdminFoodStatisticsComponent } from './admin-food-statistics/admin-food-statistics.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ContentTableModule } from 'src/app/admin/shared/content-table/content-table.module';
import { RouterModule } from '@angular/router';
import { AdminStatisticsWrapperComponent } from './admin-statistics-wrapper/admin-statistics-wrapper.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AdminDialogFoodStatisticsComponent } from './admin-dialog-statistics/admin-dialog-food-statistics.component';
import { AdminDialogDrugStatisticsComponent } from './admin-dialog-drug-statistics/admin-dialog-drug-statistics.component';
import { AdminFilterModule } from '../../shared/admin-filter/admin-filter.module';
@NgModule({
  declarations: [
    AdminDrugStatisticsComponent,
    AdminFoodStatisticsComponent,
    AdminStatisticsWrapperComponent,
    AdminDialogFoodStatisticsComponent,
    AdminDialogDrugStatisticsComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatRadioModule,
    MatOptionModule,
    FormsModule,
    AdminRoutingModule,
    MatListModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    ContentTableModule,
    RouterModule,
    MatDialogModule,
    AdminFilterModule,
  ],
  exports: [
    AdminDrugStatisticsComponent,
    AdminFoodStatisticsComponent,
    AdminStatisticsWrapperComponent,
    AdminDialogFoodStatisticsComponent,
    AdminDialogDrugStatisticsComponent,
  ],
})
export class AdminStatisticsModule {}

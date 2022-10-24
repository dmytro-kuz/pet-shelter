import { MatNativeDateModule } from '@angular/material/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPetsComponent } from './admin-pets/admin-pets.component';
import { ContentTableModule } from '../../shared/content-table/content-table.module';
import { MatCardModule } from '@angular/material/card';
import { AdminPetDetailComponent } from './admin-pet-detail/admin-pet-detail.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { DeleteAlertDialogModule } from '../../shared/delete-alert-dialog/delete-alert-dialog.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminPetsModalComponent } from './admin-pets-modal/admin-pets-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdminFilterModule } from '../../shared/admin-filter/admin-filter.module';
import { SpinnerModule } from 'src/app/shared/components/spinner/spinner.module';

export const options: Partial<null | IConfig> | (() => Partial<IConfig>) = null;
@NgModule({
  imports: [
    CommonModule,
    MatNativeDateModule,
    ContentTableModule,
    MatCardModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    DeleteAlertDialogModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    AdminFilterModule,
    SpinnerModule,
  ],
  declarations: [AdminPetsComponent, AdminPetDetailComponent, AdminPetsModalComponent],
})
export class AdminPetsModule {}

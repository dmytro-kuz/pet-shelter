import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PetsListComponent } from './pets-list/pets-list.component';
import { PetsPreviewComponent } from './pets-preview/pets-preview.component';
import { PetDetailsComponent } from './pet-details/pet-details.component';
import { FilterComponent } from './components/filter/filter.component';
import { PetCardComponent } from './components/pet-card/pet-card.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskModule } from 'ngx-mask';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { ButtonsModule } from 'src/app/shared/components/buttons/buttons.module';
import { MatDialogModule } from '@angular/material/dialog';
import { SpinnerModule } from 'src/app/shared/components/spinner/spinner.module';
import { DatepickerModule } from 'src/app/shared/components/datepicker/datepicker.module';
import { ClientPetFormComponent } from './modals/client-pet-form/client-pet-form.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatMomentDateModule,
    NgxMaskModule.forRoot(),
    AppRoutingModule,
    MatIconModule,
    MatPaginatorModule,
    MatSelectModule,
    ButtonsModule,
    MatDialogModule,
    SpinnerModule,
    DatepickerModule,
  ],
  declarations: [
    PetsListComponent,
    PetsPreviewComponent,
    PetDetailsComponent,
    PetCardComponent,
    FilterComponent,
    ClientPetFormComponent,
  ],
  exports: [
    PetsListComponent,
    PetsPreviewComponent,
    PetDetailsComponent,
    PetCardComponent,
    FilterComponent,
    ClientPetFormComponent,
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'legacy' } },
    { provide: MAT_DATE_LOCALE, useValue: 'uk-UA' },
  ],
})
export class PetsModule {}

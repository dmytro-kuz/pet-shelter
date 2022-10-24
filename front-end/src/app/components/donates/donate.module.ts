import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonateFullComponent } from './donate-full/donate-full.component';
import { DonatePreviewComponent } from './donate-preview/donate-preview.component';
import { ButtonsModule } from '../../shared/components/buttons/buttons.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppRoutingModule } from '../../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    ButtonsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    MatSnackBarModule,
    MatFormFieldModule,
    AppRoutingModule,
  ],
  declarations: [DonateFullComponent, DonatePreviewComponent],
  exports: [DonateFullComponent, DonatePreviewComponent],
})
export class DonateModule {}

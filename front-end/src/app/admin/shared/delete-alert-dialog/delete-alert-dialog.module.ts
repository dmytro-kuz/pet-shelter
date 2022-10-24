import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteAlertDialogComponent } from './delete-alert-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  declarations: [DeleteAlertDialogComponent],
  exports: [DeleteAlertDialogComponent],
})
export class DeleteAlertDialogModule {}

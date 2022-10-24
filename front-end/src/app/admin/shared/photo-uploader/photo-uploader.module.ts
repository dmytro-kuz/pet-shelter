import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoUploaderComponent } from './photo-uploader.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [PhotoUploaderComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [PhotoUploaderComponent],
})
export class PhotoUploaderModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { ContentLayoutComponent } from './content-layout/content-layout.component';
import { AppRoutingModule } from '../app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [CommonModule, AppRoutingModule, MatIconModule, MatDialogModule],
  declarations: [NavComponent, FooterComponent, ContentLayoutComponent],
  exports: [NavComponent, FooterComponent, ContentLayoutComponent],
})
export class LayoutModule {}

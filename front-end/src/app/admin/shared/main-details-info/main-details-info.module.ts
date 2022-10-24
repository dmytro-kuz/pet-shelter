import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDetailsInfoComponent } from './main-details-info.component';
import { AdminRoutingModule } from '../../admin-routing.module';

@NgModule({
  imports: [CommonModule, AdminRoutingModule],
  declarations: [MainDetailsInfoComponent],
  exports: [MainDetailsInfoComponent],
})
export class MainDetailsInfoModule {}

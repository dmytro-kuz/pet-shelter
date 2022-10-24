import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatListModule } from '@angular/material/list';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { AdminOverstaysModule } from './components/admin-overstays/admin-overstays.module';
import { AdminPetsModule } from './components/admin-pets/admin-pets.module';
import { AdminDonateModule } from './components/admin-donate/admin-donate.module';
import { SpinnerModule } from '../shared/components/spinner/spinner.module';
import { AdminStatisticsModule } from './components/admin-statitistics-components/admin-statistic.module';
import { AdminNewsModule } from './components/admin-news/admin-news.module';
import { AdminAdoptModule } from './components/admin-adopt/admin-adopt.module';
import { MatBadgeModule } from '@angular/material/badge';
@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    AdminOverstaysModule,
    AdminRoutingModule,
    MatListModule,
    MatToolbarModule,
    AdminStatisticsModule,
    AdminDonateModule,
    AdminPetsModule,
    SpinnerModule,
    MatBadgeModule,
    AdminAdoptModule,
    AdminNewsModule,
    FormsModule,
    MatButtonModule,
  ],
  declarations: [DashboardComponent, WrapperComponent],
})
export class AdminModule {}

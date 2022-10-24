import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { BannerComponent } from './components/banner/banner.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { PetsModule } from '../pets/pets.module';
import { NewsModule } from '../news/news.module';
import { DonateModule } from '../donates/donate.module';
import { ButtonsModule } from 'src/app/shared/components/buttons/buttons.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieComponent } from './components/statistics/pie/pie.component';
import { DiagramComponent } from './components/statistics/diagram/diagram.component';
import { ProgressComponent } from './components/statistics/progress/progress.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { MatTooltipModule } from '@angular/material/tooltip';
import { SpinnerModule } from 'src/app/shared/components/spinner/spinner.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    PetsModule,
    NewsModule,
    DonateModule,
    ButtonsModule,
    NgxChartsModule,
    AppRoutingModule,

    MatTooltipModule,

    SpinnerModule,
  ],
  declarations: [
    LandingComponent,
    BannerComponent,
    StatisticsComponent,
    ContactsComponent,
    PieComponent,
    DiagramComponent,
    ProgressComponent,
  ],
  exports: [LandingComponent, BannerComponent, StatisticsComponent, ContactsComponent],
})
export class MainModule {}

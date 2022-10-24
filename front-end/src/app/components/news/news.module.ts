import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsPreviewComponent } from './news-preview/news-preview.component';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { MatIconModule } from '@angular/material/icon';
import { NewsPreviewCardComponent } from './components/news-preview-card/news-preview-card.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NewsPhotosSliderComponent } from './components/news-photos-slider/news-photos-slider.component';
import { SpinnerModule } from 'src/app/shared/components/spinner/spinner.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'src/app/shared/components/buttons/buttons.module';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    AppRoutingModule,
    MatTooltipModule,
    SpinnerModule,
    ReactiveFormsModule,
    ButtonsModule,
  ],
  declarations: [
    NewsListComponent,
    NewsPreviewComponent,
    NewsCardComponent,
    NewsPreviewCardComponent,
    NewsPhotosSliderComponent,
  ],
  exports: [NewsListComponent, NewsPreviewComponent, NewsCardComponent, MatIconModule],
})
export class NewsModule {}

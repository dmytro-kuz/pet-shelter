import { map, tap } from 'rxjs';
import { Component } from '@angular/core';
import Splide from '@splidejs/splide';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news-preview',
  templateUrl: './news-preview.component.html',
  styleUrls: ['./news-preview.component.scss'],
})
export class NewsPreviewComponent {
  constructor(private newsService: NewsService) {}

  loading$ = this.newsService.loading$;
  newsList$ = this.newsService.getNews().pipe(
    map(newsList => newsList.news),
    tap(() =>
      setTimeout(
        () =>
          new Splide('.splide', {
            type: 'loop',
            perPage: 1,
            // autoplay: true,
            pagination: false,
            rewind: true,
            interval: 5000,
            keyboard: 'global',
            prev: 'splide__arrow--prev arrow__move-left',
            next: 'splide__arrow--next arrow__move-right',
          }).mount(),
        0,
      ),
    ),
  );
}

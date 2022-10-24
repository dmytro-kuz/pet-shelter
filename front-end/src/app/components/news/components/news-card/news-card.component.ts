import { News } from 'src/app/data/interfaces/news';
import { NewsService } from './../../news.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
})
export class NewsCardComponent {
  @Input() news?: News;

  constructor(private newsService: NewsService) {}

  showMore = false;

  onShow() {
    this.showMore = !this.showMore;
  }
}

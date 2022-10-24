import { NewsService } from './../news.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
})
export class NewsListComponent implements OnInit {
  constructor(private newsService: NewsService) {}

  loading$ = this.newsService.loading$;
  newsList$ = this.newsService.getNews().pipe(map(newsList => newsList.news));

  ngOnInit() {}
}

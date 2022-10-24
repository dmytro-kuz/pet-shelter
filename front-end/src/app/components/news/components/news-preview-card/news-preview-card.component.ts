import { Component, Input, OnInit } from '@angular/core';
import { News } from 'src/app/data/interfaces/news';

@Component({
  selector: 'app-news-preview-card',
  templateUrl: './news-preview-card.component.html',
  styleUrls: ['./news-preview-card.component.scss'],
})
export class NewsPreviewCardComponent implements OnInit {
  @Input() news?: any;

  photos: Array<any>[] = [];

  constructor() {}

  ngOnInit(): void {
    this.photos = this.news;
  }
}

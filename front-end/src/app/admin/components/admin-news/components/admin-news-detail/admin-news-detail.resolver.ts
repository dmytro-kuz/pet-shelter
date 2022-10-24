import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { NewsService } from 'src/app/components/news/news.service';
import { News } from 'src/app/data/interfaces/news';
import { AdminNewsService } from '../../admin-news.service';

@Injectable({
  providedIn: 'root',
})
export class AdminNewsDetailResolver implements Resolve<any> {
  constructor(private adminNewsService: AdminNewsService) {}
  httpParams = new HttpParams();

  resolve(route: ActivatedRouteSnapshot): Observable<News> {
    const params = route.queryParams;
    this.httpParams = this.httpParams.set('id', params['id']);
    // return this.newsService.getNewsById(this.httpParams);
    // const params = route.queryParams;
    return this.adminNewsService.getNewsById(params['id']);
  }
}

import { LoadingService } from 'src/app/shared/service/loading.service';
import { News } from 'src/app/data/interfaces/news';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { ApiService } from 'src/app/shared/service/api.service';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  path: string = '/news';

  constructor(private http: HttpClient, private apiService: ApiService, private loader: LoadingService) {}

  loading$ = this.loader.loading$;

  // Get News
  getNews(): Observable<{ news: News[] }> {
    return this.apiService.get(this.path);
  }

  // Create News
  addNews(title: string, subtitle: string, text: string, newsImages: Array<File>): Observable<HttpEvent<any>> {
    var formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('text', text);

    for (let i = 0; i < newsImages.length; i++) {
      formData.append('photos', newsImages[i]);
    }

    return this.http.post<News>(`${this.apiService.url}/news`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  //Get News by id
  getNewsById(httpParams: HttpParams): Observable<News> {
    return this.apiService.get<News>(this.path + '/details', httpParams);
  }
}

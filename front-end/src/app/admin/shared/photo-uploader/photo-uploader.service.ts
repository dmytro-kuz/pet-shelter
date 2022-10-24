import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from 'src/app/data/interfaces/news';
import { ApiAdminService } from '../../../shared/service/api-admin.service';

@Injectable({
  providedIn: 'root',
})
export class PhotoUploaderService {
  path: string = '/news';

  constructor(private apiAdminService: ApiAdminService) {}

  getPhoto(params: any): Observable<News> {
    return this.apiAdminService.get<News>(this.path + '/photo', params);
  }

  uploadPhoto(editForm: any): Observable<News> {
    return this.apiAdminService.post<News>(this.path + '/photo', editForm);
  }

  deletePhoto(id?: string, photoName?: string) {
    return this.apiAdminService.delete<News>(this.path + '/photo', { id, photoName });
  }

  changeSelectedPhoto(changePhotoForm: any) {
    return this.apiAdminService.put<News>(this.path + '/photo', changePhotoForm);
  }
}

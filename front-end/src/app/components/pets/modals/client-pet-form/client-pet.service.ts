import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Adopt } from 'src/app/data/interfaces/adopt';
import { Overstay } from 'src/app/data/interfaces/overstay';
import { ResponseMessage } from 'src/app/data/interfaces/response-message';
import { ApiService } from 'src/app/shared/service/api.service';
import { LoadingService } from 'src/app/shared/service/loading.service';

@Injectable({
  providedIn: 'root',
})
export class ClientPetService {
  pathAdopt = '/adopt/';
  pathOverstay = '/overstay/';
  loading$ = this.loader.loading$;

  constructor(private apiService: ApiService, private loader: LoadingService) {}

  createAdopt(newAdopt: Adopt): Observable<ResponseMessage> {
    return this.apiService.post(this.pathAdopt, newAdopt);
  }

  createOverstay(newOverstay: Overstay): Observable<ResponseMessage> {
    return this.apiService.post(this.pathOverstay, newOverstay);
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminAdoptService } from '../admin-adopt.service';

@Injectable({
  providedIn: 'root',
})
export class AdminDetailResolver implements Resolve<any> {
  constructor(private adminAdoptService: AdminAdoptService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const params = route.queryParams;
    return this.adminAdoptService.getAdoptById(params['id']);
  }
}

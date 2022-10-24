import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminOverstaysService } from '../admin-overstays.service';

@Injectable({
  providedIn: 'root',
})
export class OverstayDetailResolver implements Resolve<any> {
  constructor(private adminOverstaysService: AdminOverstaysService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const params = route.queryParams;
    return this.adminOverstaysService.getOverstayById(params['id']);
  }
}

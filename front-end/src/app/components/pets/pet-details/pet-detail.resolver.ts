import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Pet } from 'src/app/data/interfaces/pet';
import { PetsService } from '../pets.service';
import { HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PetDetailResolver implements Resolve<any> {
  constructor(private petService: PetsService) {}
  httpParams = new HttpParams();

  resolve(route: ActivatedRouteSnapshot): Observable<Pet> {
    const params = route.queryParams['id'];
    this.httpParams = this.httpParams.set('id', params);
    return this.petService.getPetById(this.httpParams);
  }
}

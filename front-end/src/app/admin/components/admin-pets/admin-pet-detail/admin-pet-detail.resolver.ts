import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Pet } from 'src/app/data/interfaces/pet';
import { HttpParams } from '@angular/common/http';
import { PetsService } from 'src/app/components/pets/pets.service';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminPetDetailResolver implements Resolve<any> {
  constructor(private petService: PetsService) {}
  httpParams = new HttpParams();

  resolve(route: ActivatedRouteSnapshot): Observable<Pet> {
    const params = route.queryParams;
    this.httpParams = this.httpParams.set('id', params['id']);
    return this.petService.getPetById(this.httpParams);
  }
}

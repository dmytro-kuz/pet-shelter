import { BehaviorSubject, debounceTime } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading = new BehaviorSubject<boolean>(false);
  public loading$ = this.loading.asObservable().pipe(debounceTime(50));

  constructor() {}

  show() {
    this.loading.next(true);
  }
  hide() {
    this.loading.next(false);
  }
}

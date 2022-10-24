import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  url = 'http://localhost:3000';

  constructor() {}

  listen(eventName: string): Observable<any> {
    return new Observable(observer => {
      io(this.url).on(eventName, (data: any) => {
        observer.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    io(this.url).emit(eventName, data);
  }

  connect() {
    io(this.url).connect();
  }

  disconnect() {
    io(this.url).disconnect();
  }
}

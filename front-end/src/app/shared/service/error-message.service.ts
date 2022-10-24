import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ErrorMessageService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(public _snackBar: MatSnackBar) {}

  showErrorMessage(status: number) {
    let message: string = this.getErrorMessage(status);

    if (message) {
      this._snackBar.open(message, 'Закрити', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 5000,
      });
    }
  }

  private getErrorMessage(status: number) {
    switch (status) {
      case 0:
        return 'Перевірте підключення до інтернету';
      case 401:
        return 'Помилка авторизації';
      case 403:
        return 'Доступ заборонено';
      case 404:
        return 'Сторінку не знайдено';
      case 500:
        return 'Помилка сервера';
      default:
        return '';
    }
  }
}

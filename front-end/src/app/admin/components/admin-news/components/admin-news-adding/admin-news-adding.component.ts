import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminNewsService } from '../../admin-news.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { newsModalFormValue } from 'src/app/admin/shared/data/news-modal-form-value';
import { AdminNewsAddingValue } from 'src/app/admin/shared/interfaces/admin-news-adding-value';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-news-adding',
  templateUrl: './admin-news-adding.component.html',
  styleUrls: ['./admin-news-adding.component.scss'],
})
export class AdminNewsAddingComponent implements OnInit {
  @ViewChild('upload') fileInput: any;

  addingFormValue?: AdminNewsAddingValue;
  addingForm?: FormGroup;
  checkMsg?: boolean;
  errMsg?: boolean;
  photosCount: number = 0;
  photosSelectArray: any[] = [];
  formPhotoFile: any = new FormData();
  newsDetailForm?: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private adminNewsService: AdminNewsService,
    private router: Router,
  ) {}

  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  ngOnInit(): void {
    this.addingFormValue = newsModalFormValue;
    this.addingForm = this.fb.group({
      title: [null, [Validators.required]],
      subtitle: [null, [Validators.required]],
      text: [null, [Validators.required]],
      photos: [null, [Validators.required]],
    });
  }

  uploadFile(event: any) {
    let photos = [];
    for (let i = 0; i < event.target.files.length; i++) {
      photos.push(event.target.files[i]);
    }
    this.addingForm?.patchValue({
      photos: photos,
    });
    this.addingForm?.get('photos')!.updateValueAndValidity();

    const photosFile = [...event.target.files];
    this.photosCount = event.target.files.length;
    this.formPhotoFile.append('_id', this.newsDetailForm?.value._id);
    photosFile.forEach((file: any) => {
      this.photosSelectArray.push(file.name);
      this.formPhotoFile.append('file', file);
    });
    this.fileInput.nativeElement.value = '';
  }

  clearFilePhotoList(filePhotoName: string) {
    const index = this.photosSelectArray.indexOf(filePhotoName);
    this.photosSelectArray.splice(index, 1);
    const values = this.formPhotoFile.getAll('file');
    let newArray: File[] = [];
    values.forEach((file: any) => {
      if (file.name !== filePhotoName) {
        newArray.push(file);
      }
    });
    this.formPhotoFile.delete('file');
    newArray.forEach((file: any) => {
      this.formPhotoFile.append('file', file);
    });
    this.photosCount = newArray.length;
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.adminNewsService
        .addNews(
          this.addingForm?.value.title,
          this.addingForm?.value.subtitle,
          this.addingForm?.value.text,
          this.addingForm?.value.photos,
        )
        .subscribe({
          complete: () => {
            this.checkMsg = true;
            this.openSnackBar(` "${form.value.title}" успішно додано.`);
            this.router.navigate(['admin/news']);
          },
          error: error => {
            this.errMsg = true;
            this.openSnackBar(`Сталась помилка при відправленні форми.`);
            console.log(error);
          },
        });
    }
  }

  resetModalForm(): void {
    this.addingForm?.reset();
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Закрити', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
    });
  }
}

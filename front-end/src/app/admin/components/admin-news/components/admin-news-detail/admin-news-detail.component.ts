import { News } from 'src/app/data/interfaces/news';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminNewsService } from '../../admin-news.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { catchError, EMPTY } from 'rxjs';
import { newsModalFormValue } from 'src/app/admin/shared/data/news-modal-form-value';
import { DeleteAlertDialogComponent } from 'src/app/admin/shared/delete-alert-dialog/delete-alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-news-detail',
  templateUrl: './admin-news-detail.component.html',
  styleUrls: ['./admin-news-detail.component.scss'],
})
export class AdminNewsDetailComponent implements OnInit {
  @ViewChild('uploadFile') fileInput: any;
  @ViewChild('changePhoto') fileInputChange: any;

  constructor(
    private route: ActivatedRoute,
    private adminNewsService: AdminNewsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {}

  newsDetail: News = this.route.snapshot.data['NewsDetails$'];

  showMoreInfo: boolean = false;
  showMorePhoto: boolean = false;
  isEditNews: boolean = false;
  newsDetailForm?: FormGroup;
  newsModalValue: any;
  photosCount: number = 0;
  formPhotoFile: any = new FormData();
  photosSelectArray: any[] = [];

  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  ngOnInit(): void {
    this.setDetailForm();
    this.newsModalValue = newsModalFormValue;
  }

  setDetailForm(): void {
    this.newsDetailForm = this.formBuilder.group({
      _id: [this.newsDetail._id, [Validators.required]],
      title: [this.newsDetail.title, [Validators.required]],
      subtitle: [this.newsDetail.subtitle, [Validators.required]],
      text: [this.newsDetail.text, [Validators.required]],
      photos: [this.newsDetail.photos],
      createdAt: [this.newsDetail.createdAt, [Validators.required]],
    });
  }

  toggleShowMore(showType: string): void {
    if (showType === 'photo') {
      this.showMorePhoto = !this.showMorePhoto;
    }
  }

  showEditForm(field: string): void {
    if (field === 'editNews') {
      this.isEditNews = !this.isEditNews;
    }
  }

  editNews(): void {
    this.showEditForm('editPet');
    this.adminNewsService
      .editNews(this.newsDetailForm?.value)
      .pipe(
        catchError(err => {
          this.openSnackBar('Перевірте підключення до інтернету.');
          return EMPTY;
        }),
      )
      .subscribe(res => {
        if (res) {
          const photos = this.newsDetail.photos;
          this.newsDetail = res;
          this.newsDetail.photos = photos;
          this.openSnackBar(`Зміни збережено успішно`);
          this.router.navigate(['admin/news']);
        } else {
          this.openSnackBar(`Щось пішло не так, спробуйте ще`);
        }
      });
  }

  deletePetMidleware(): void {
    this.dialog
      .open(DeleteAlertDialogComponent)
      .afterClosed()
      .subscribe(result => (result ? this.deleteNews() : null));
  }

  deleteNews(): void {
    if (this.newsDetail._id) {
      this.adminNewsService
        .deleteNews(this.newsDetail._id)
        .pipe(
          catchError(err => {
            this.openSnackBar('Перевірте підключення до інтернету.');
            return EMPTY;
          }),
        )
        .subscribe(res => {
          this.checkDeleteStatus(res.status);
        });
    }
  }

  checkDeleteStatus(status: string): void {
    if (status === 'success') {
      this.openSnackBar(`"${this.newsDetail.title}" було видалено`);
      this.router.navigate(['admin/news']);
    } else {
      this.openSnackBar(` Щось пішло не так. ${status} ${this.newsDetail.title} не видалено`);
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Закрити', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
    });
  }

  uploadNewFormPhoto(event: any) {
    const photosFile = [...event.target.files];
    this.photosCount = event.target.files.length;
    this.formPhotoFile.append('_id', this.newsDetailForm?.value._id);
    photosFile.forEach((file: any) => {
      this.photosSelectArray.push(file.name);
      this.formPhotoFile.append('file', file);
    });
    this.fileInput.nativeElement.value = '';
  }

  addNewPhoto() {
    this.adminNewsService.uploadPhoto(this.formPhotoFile).subscribe(res => {
      this.newsDetail.photos = res.photos;
      this.newsDetailForm?.patchValue({
        photos: res.photos,
      });
      this.photosCount = 0;
      this.photosSelectArray = [];
      this.formPhotoFile = new FormData();
      this.openSnackBar('Фото успішно додано');
    });
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

  deletePhoto(photo: string): void {
    this.dialog
      .open(DeleteAlertDialogComponent)
      .afterClosed()
      .subscribe((deleteElement: boolean) => {
        if (deleteElement) {
          this.adminNewsService.deletePhoto(this.newsDetail._id, photo).subscribe(res => {
            if (res.status === 'success') {
              this.newsDetail.photos.splice(this.newsDetail.photos.indexOf(photo), 1);
              this.openSnackBar('Фото видалено');
            }
          });
        }
      });
  }

  editPhoto(event: any, prevPhoto: string): void {
    const changePhotoData = new FormData();
    const photoFromEvent = event.target.files[0];
    changePhotoData.append('newPhoto', photoFromEvent);
    changePhotoData.append('prev', prevPhoto);
    changePhotoData.append('id', this.newsDetailForm?.value._id);
    this.adminNewsService.changeSelectedPhoto(changePhotoData).subscribe(res => {
      this.openSnackBar('Фото змінено');
      this.newsDetail.photos.splice(this.newsDetail.photos.indexOf(prevPhoto), 1, res.photos[0]);
      this.fileInputChange.nativeElement.value = '';
    });
  }
}

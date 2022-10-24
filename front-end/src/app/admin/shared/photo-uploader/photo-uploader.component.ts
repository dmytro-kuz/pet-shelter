import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AdminNewsService } from 'src/app/admin/components/admin-news/admin-news.service';
import { DeleteAlertDialogComponent } from 'src/app/admin/shared/delete-alert-dialog/delete-alert-dialog.component';
import { News } from 'src/app/data/interfaces/news';

@Component({
  selector: 'app-photo-uploader',
  templateUrl: './photo-uploader.component.html',
  styleUrls: ['./photo-uploader.component.scss'],
})
export class PhotoUploaderComponent implements OnInit {
  @ViewChild('uploadFile') fileInput: any;
  @ViewChild('changePhoto') fileInputChange: any;

  constructor(
    private route: ActivatedRoute,
    private adminNewsService: AdminNewsService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {}

  newsDetail: News = this.route.snapshot.data['NewsDetails$'];

  showMoreInfo: boolean = false;
  showMorePhoto: boolean = false;
  newsDetailForm?: FormGroup;
  photosCount: number = 0;
  formPhotoFile: any = new FormData();
  photosSelectArray: any[] = [];

  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  toggleShowMore(showType: string): void {
    if (showType === 'info') {
      this.showMoreInfo = !this.showMoreInfo;
    }
    if (showType === 'photo') {
      this.showMorePhoto = !this.showMorePhoto;
    }
  }

  ngOnInit(): void {}

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

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminPetsService } from '../admin-pets.service';
import { Pet } from 'src/app/data/interfaces/pet';
import { Moment } from 'moment';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAlertDialogComponent } from 'src/app/admin/shared/delete-alert-dialog/delete-alert-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { petModalFormValue } from 'src/app/admin/shared/data/pet-modal-form-value';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { first } from 'rxjs';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { LoadingService } from 'src/app/shared/service/loading.service';

@Component({
  selector: 'app-admin-pet-detail',
  templateUrl: './admin-pet-detail.component.html',
  styleUrls: ['./admin-pet-detail.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class AdminPetDetailComponent implements OnInit {
  @ViewChild('uploadFile') fileInput: any;
  @ViewChild('changePhoto') fileInputChange: any;

  constructor(
    private route: ActivatedRoute,
    private adminPetsService: AdminPetsService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private loader: LoadingService,
  ) {}

  petDetail: Pet = this.route.snapshot.data['PetDetails$'];
  disabledDates: number[] = this.petDetail.overstayDates;
  birthDate = moment(this.petDetail.birthDate).format('DD/MM/YYYY');
  currentYear = new Date().getFullYear();
  minDate: Date = new Date(this.currentYear - 20, 0, 1);
  maxDate: Date = new Date();
  moment = moment();
  loading$ = this.loader.loading$;

  showMoreInfo: boolean = false;
  showMorePhoto: boolean = false;
  showMoreCalendar: boolean = false;
  isEditPet: boolean = false;
  isEditPetDescription: boolean = false;
  petDetailForm?: FormGroup;
  petModalValue: any = petModalFormValue;
  photosCount: number = 0;
  photosSelectArray: any[] = [];
  formPhotoFile: any = new FormData();
  onSubmitBtnLock: boolean = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  ngOnInit() {
    this.setDetailForm();
  }

  setDetailForm(): void {
    this.petDetailForm = this.formBuilder.group({
      _id: [this.petDetail._id, [Validators.required]],
      name: [this.petDetail.name, [Validators.required, Validators.minLength(2)]],
      type: [this.petDetail.type, [Validators.required]],
      breed: [this.petDetail.breed ?? 'Невідомо', Validators.minLength(2)],
      sex: [this.petDetail.sex, [Validators.required]],
      birthDate: [this.petDetail.birthDate, [Validators.required]],
      size: [this.petDetail.size, [Validators.required]],
      description: [this.petDetail.description],
      status: [this.petDetail.status, [Validators.required]],
      overstayDates: [this.petDetail.overstayDates],
      photos: [this.petDetail.photos],
      __v: [this.petDetail.__v],
    });
  }

  calendarFilter = (date: Moment | null): boolean => {
    const filterDate = (date || moment()).valueOf();
    return this.disabledDates.indexOf(filterDate) === -1;
  };

  toggleShowMore(showType: string): void {
    if (showType === 'info') {
      this.showMoreInfo = !this.showMoreInfo;
    }
    if (showType === 'photo') {
      this.showMorePhoto = !this.showMorePhoto;
    }
    if (showType === 'calendar') {
      this.showMoreCalendar = !this.showMoreCalendar;
    }
  }

  showEditForm(field: string): void {
    if (field === 'editPet') {
      this.isEditPet = !this.isEditPet;
    }
    if (field === 'editPetDescription') {
      this.isEditPetDescription = !this.isEditPetDescription;
    }
    this.setDetailForm();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Закрити', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
    });
  }

  editPet(): void {
    this.onSubmitBtnLock = true;
    this.adminPetsService
      .editPet(this.petDetailForm?.value)
      .pipe(first())
      .subscribe(res => {
        if (res.status === 'rejected') {
          this.onSubmitBtnLock = false;
          this.openVersionMessage(res.message);
        } else {
          this.onSubmitBtnLock = false;
          this.showEditForm('editPet');
          const photos = this.petDetail.photos;
          this.petDetail = res;
          this.setDetailForm();
          this.petDetail.photos = photos;
          this.birthDate = moment(res.birthDate).format('DD/MM/YYYY');
          this.isEditPetDescription = false;
          this.isEditPet = false;
          this.openSnackBar(`Зміни збережено успішно`);
        }
      });
  }

  openVersionMessage(message: string) {
    let snackBarRef = this._snackBar.open(message, 'Показати', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 8000,
    });

    snackBarRef
      .onAction()
      .pipe(first())
      .subscribe(() => {
        window.open('/admin/pets/detail?id=' + this.petDetail._id, '_blank');
      });
  }

  deletePet(): void {
    this.dialog
      .open(DeleteAlertDialogComponent)
      .afterClosed()
      .pipe(first())
      .subscribe(deleteElement => {
        if (deleteElement && this.petDetail._id) {
          this.adminPetsService
            .deletePet(this.petDetail._id)
            .pipe(first())
            .subscribe(res => {
              this.checkDeleteStatus(res.status);
            });
        }
      });
  }

  checkDeleteStatus(status: string): void {
    if (status === 'success') {
      this.openSnackBar(`Тваринку ${this.petDetail.name} було видалено з бази даних притулку`);
      this.router.navigate(['admin/pets']);
    } else {
      this.openSnackBar(` Щось пішло не так. ${status}Тваринку ${this.petDetail.name} не видалено`);
    }
  }

  uploadNewFormPhoto(event: any) {
    const photosFile = [...event.target.files];
    this.photosCount = event.target.files.length;
    this.formPhotoFile.append('_id', this.petDetailForm?.value._id);
    photosFile.forEach((file: any) => {
      this.photosSelectArray.push(file.name);
      this.formPhotoFile.append('file', file);
    });
    this.fileInput.nativeElement.value = '';
  }

  addNewPhoto(event: Event) {
    event.stopPropagation();
    this.adminPetsService
      .uploadPhoto(this.formPhotoFile)
      .pipe(first())
      .subscribe(res => {
        this.petDetail.photos = res.photos;
        this.petDetailForm?.patchValue({
          photos: res.photos,
        });
        this.photosCount = 0;
        this.photosSelectArray = [];
        this.formPhotoFile = new FormData();
        this.openSnackBar('Фото успішно додано');
      });
  }

  clearFilePhotoList(filePhotoName: string, event: Event) {
    event.stopPropagation();
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
      .pipe(first())
      .subscribe((deleteElement: boolean) => {
        if (deleteElement) {
          this.adminPetsService
            .deletePhoto(this.petDetail._id, photo)
            .pipe(first())
            .subscribe(res => {
              if (res.status === 'success') {
                this.petDetail.photos.splice(this.petDetail.photos.indexOf(photo), 1);
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
    changePhotoData.append('id', this.petDetailForm?.value._id);
    this.adminPetsService
      .changeSelectedPhoto(changePhotoData)
      .pipe(first())
      .subscribe(res => {
        this.openSnackBar('Фото змінено');
        this.petDetailForm?.patchValue({
          photos: [this.petDetail.photos.splice(this.petDetail.photos.indexOf(prevPhoto), 1, res.photos[0])],
        });
        this.fileInputChange.nativeElement.value = '';
      });
  }
}

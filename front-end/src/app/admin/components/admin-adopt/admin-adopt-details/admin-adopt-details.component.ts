import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAlertDialogComponent } from 'src/app/admin/shared/delete-alert-dialog/delete-alert-dialog.component';
import { AdminAdoptService } from '../admin-adopt.service';
import { AdminAdopt } from 'src/app/admin/shared/interfaces/admin-adopt';
import { SocketService } from 'src/app/shared/service/socket.service';
import { DetailsInfo } from 'src/app/admin/shared/interfaces/details-info';
import { first } from 'rxjs';

@Component({
  selector: 'app-admin-adopt-details',
  templateUrl: './admin-adopt-details.component.html',
  styleUrls: ['./admin-adopt-details.component.scss'],
})
export class AdminAdoptDetailsComponent implements OnInit {
  adoptDetails: AdminAdopt = this.route.snapshot.data['AdoptDetails$'];
  mainDetail?: DetailsInfo;
  adoptForm?: FormGroup;
  changeDetails: boolean = false;
  onSubmitBtnLock: boolean = false;
  petRoute: string = '/admin/pets/detail';
  //MatSnackConfig
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private adminAdoptService: AdminAdoptService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private socketService: SocketService,
  ) {}

  ngOnInit() {
    this.setMainInfo();
    this.adoptFormGroup();
  }

  setMainInfo() {
    if (this.adoptDetails) {
      this.mainDetail = {
        params: [
          { label: 'Статус', value: this.adoptDetails.adoptStatus, type: 'field' },
          { label: 'ID тварини', value: this.adoptDetails.pet_id, type: 'link', title: 'Показати деталі тварини' },
          { label: "Ім'я тварини", value: this.adoptDetails.petName, type: 'field' },
          { label: 'Дані клієнта', value: this.adoptDetails.clientName, type: 'field' },
          { label: 'Електронна адреса', value: this.adoptDetails.clientEmail, type: 'field' },
          { label: 'Номер телефону', value: this.adoptDetails.clientPhone, type: 'field' },
          { label: 'Додаткова інформація', value: this.adoptDetails.clientInformation, type: 'addition' },
        ],
        route: this.petRoute,
      };
    }
  }

  adoptFormGroup() {
    this.adoptForm = this.formBuilder.group({
      _id: [this.adoptDetails._id, [Validators.required]],
      __v: [this.adoptDetails.__v, [Validators.required]],
      pet_id: [this.adoptDetails.pet_id],
      clientName: [
        this.adoptDetails.clientName,
        [Validators.required, Validators.pattern(/[А-ЯҐЄІЇA-Z][а-яґєіїa-z]+$/)],
      ],
      clientEmail: [
        this.adoptDetails.clientEmail,
        [Validators.required, Validators.email, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)],
      ],
      clientPhone: [this.adoptDetails.clientPhone, [Validators.required, Validators.minLength(16)]],
      clientInformation: [this.adoptDetails.clientInformation, [Validators.required, Validators.minLength(10)]],
      adoptStatus: [this.adoptDetails.adoptStatus, Validators.required],
    });
  }

  validControl(value: string) {
    return this.adoptForm?.controls[value].touched && this.adoptForm?.controls[value].invalid;
  }

  getErrorMessage(param: string) {
    if (this.adoptForm?.controls[param].hasError('required')) {
      return 'Це поле не може бути пустим';
    } else if (this.adoptForm?.controls[param].hasError('email')) {
      return 'Електронний адрес невалідний';
    } else if (this.adoptForm?.controls[param].hasError('pattern')) {
      return param == 'clientEmail' ? 'Електронний адрес невалідний' : 'Перевірте правильність написання';
    }
    return this.adoptForm?.controls[param].hasError('minLength') ? '' : 'Недостатньо символів';
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Закрити', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
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
        window.open('/admin/adopt-details?id=' + this.adoptDetails._id, '_blank');
      });
  }

  deleteDialog() {
    this.dialog
      .open(DeleteAlertDialogComponent)
      .afterClosed()
      .pipe(first())
      .subscribe(result => (result ? this.deleteAdopt() : null));
  }

  deleteAdopt() {
    if (this.adoptDetails._id) {
      this.adminAdoptService
        .deleteAdopt(this.adoptDetails._id)
        .pipe(first())
        .subscribe(res => {
          if (res.status == 'success') {
            this.socketService.emit('change', 'overstay - deleted');
            this.openSnackBar(res.message);
            this.router.navigate(['admin/adopts']);
          } else {
            this.openSnackBar(res.message);
          }
        });
    }
  }

  onSubmit() {
    this.adoptForm?.markAllAsTouched();

    if (this.adoptForm?.valid) {
      const result = {
        ...this.adoptForm?.value,
      };
      this.onSubmitBtnLock = true;
      this.adminAdoptService
        .editAdopt(result)
        .pipe(first())
        .subscribe(data => {
          if (data._id) {
            this.onSubmitBtnLock = false;
            this.socketService.emit('change', 'adopt status - change');
            this.adoptDetails = { ...this.adoptDetails, ...data };
            this.setMainInfo();
            this.adoptFormGroup();
            this.openSnackBar('Зміни збережено успішно');
            this.changeDetails = false;
          } else if (data.status == 'rejected') {
            this.onSubmitBtnLock = false;
            this.openVersionMessage(data.message);
          }
        });
    }
  }
}

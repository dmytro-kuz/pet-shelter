import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminOverstay } from 'src/app/admin/shared/interfaces/admin-overstay';
import { AdminOverstaysService } from '../admin-overstays.service';
import { PickerParams } from 'src/app/data/interfaces/picker-params';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAlertDialogComponent } from 'src/app/admin/shared/delete-alert-dialog/delete-alert-dialog.component';
import { SocketService } from 'src/app/shared/service/socket.service';
import { DatepickerComponent } from 'src/app/shared/components/datepicker/datepicker.component';
import { DetailsInfo } from 'src/app/admin/shared/interfaces/details-info';
import { first } from 'rxjs';

@Component({
  selector: 'app-admin-overstay-details',
  templateUrl: './admin-overstay-details.component.html',
  styleUrls: ['./admin-overstay-details.component.scss'],
})
export class AdminOverstayDetailsComponent implements OnInit {
  @ViewChild(DatepickerComponent)
  public datepickerComponent?: DatepickerComponent;

  overstayDetails: AdminOverstay = this.route.snapshot.data['OverstayDetails$'];
  mainDetail?: DetailsInfo;
  startOverstay?: number;
  endOverstay?: number;
  overstayForm?: FormGroup;
  changeDetails: boolean = false;
  changeDates: boolean = false;
  onSubmitBtnLock: boolean = false;
  petRoute: string = '/admin/pets/detail';

  pickerData: PickerParams = {
    label: '* Дати перетримки',
    overstayDates: this.overstayDetails.overstayDates,
    allOverstayDates: this.overstayDetails.allOverstayDates,
    clearType: 'filter',
  };

  //MatSnackConfig
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private adminOverstaysService: AdminOverstaysService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private socketService: SocketService,
  ) {}

  ngOnInit() {
    this.setMainInfo();
    this.overstayFormGroup();
    this.setOverstayDates();
  }

  setOverstayDates() {
    this.startOverstay = this.overstayDetails.overstayDates[0];
    this.endOverstay = this.overstayDetails.overstayDates[this.overstayDetails.overstayDates.length - 1];
  }

  setMainInfo() {
    if (this.overstayDetails) {
      this.mainDetail = {
        params: [
          { label: 'Статус', value: this.overstayDetails.overstayStatus, type: 'field' },
          { label: 'ID тварини', value: this.overstayDetails.pet_id, type: 'link', title: 'Показати деталі тварини' },
          { label: "Ім'я тварини", value: this.overstayDetails.petName, type: 'field' },
          { label: 'Дані клієнта', value: this.overstayDetails.clientName, type: 'field' },
          { label: 'Електронна адреса', value: this.overstayDetails.clientEmail, type: 'field' },
          { label: 'Номер телефону', value: this.overstayDetails.clientPhone, type: 'field' },
          { label: 'Додаткова інформація', value: this.overstayDetails.clientInformation, type: 'addition' },
        ],
        route: this.petRoute,
      };
    }
  }

  overstayFormGroup() {
    this.overstayForm = this.formBuilder.group({
      _id: [this.overstayDetails._id, [Validators.required]],
      __v: [this.overstayDetails.__v, [Validators.required]],
      pet_id: [this.overstayDetails.pet_id],
      clientName: [
        this.overstayDetails.clientName,
        [Validators.required, Validators.pattern(/[А-ЯҐЄІЇA-Z][а-яґєіїa-z]+$/)],
      ],
      clientEmail: [
        this.overstayDetails.clientEmail,
        [Validators.required, Validators.email, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)],
      ],
      clientPhone: [this.overstayDetails.clientPhone, [Validators.required, Validators.minLength(16)]],
      clientInformation: [this.overstayDetails.clientInformation, [Validators.required, Validators.minLength(10)]],
      overstayDates: [this.overstayDetails.overstayDates],
      overstayStatus: [this.overstayDetails.overstayStatus, Validators.required],
    });
  }

  validControl(value: string) {
    return this.overstayForm?.controls[value].touched && this.overstayForm?.controls[value].invalid;
  }

  getErrorMessage(param: string) {
    if (this.overstayForm?.controls[param].hasError('required')) {
      return 'Це поле не може бути пустим';
    } else if (this.overstayForm?.controls[param].hasError('email')) {
      return 'Електронний адрес невалідний';
    } else if (this.overstayForm?.controls[param].hasError('pattern')) {
      return param == 'clientEmail' ? 'Електронний адрес невалідний' : 'Перевірте правильність написання';
    }
    return this.overstayForm?.controls[param].hasError('minLength') ? '' : 'Недостатньо символів';
  }

  openPicker() {
    this.changeDates = true;
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
        window.open('/admin/overstay-details?id=' + this.overstayDetails._id, '_blank');
      });
  }

  deleteDialog() {
    this.dialog
      .open(DeleteAlertDialogComponent)
      .afterClosed()
      .pipe(first())
      .subscribe(result => (result ? this.deleteOverstay() : null));
  }

  deleteOverstay() {
    if (this.overstayDetails._id) {
      this.adminOverstaysService
        .deleteOverstay(this.overstayDetails._id)
        .pipe(first())
        .subscribe(res => {
          if (res.status == 'success') {
            this.socketService.emit('change', 'overstay - deleted');
            this.openSnackBar(res.message);
            this.router.navigate(['admin/overstays']);
          } else {
            this.openSnackBar(res.message);
          }
        });
    }
  }

  editOverstayDates() {
    this.datepickerComponent?.reservedDatesForm?.markAllAsTouched();

    if (this.datepickerComponent?.reservedDatesForm?.valid) {
      const result = {
        _id: this.overstayDetails._id,
        __v: this.overstayDetails.__v,
        overstayDates: this.datepickerComponent?.getOverstayDates(),
      };
      this.adminOverstaysService
        .editOverstayDates(result)
        .pipe(first())
        .subscribe(data => {
          if (data._id) {
            this.overstayDetails = { ...this.overstayDetails, ...data };
            this.overstayFormGroup();
            this.setOverstayDates();
            this.pickerData = {
              ...this.pickerData,
              overstayDates: data.overstayDates,
              allOverstayDates: this.overstayDetails.allOverstayDates,
            };
            this.openSnackBar('Зміни збережено успішно');
            this.changeDates = false;
          } else if (data.status == 'unavailable') {
            this.openSnackBar(data.message);
          } else if (data.status == 'rejected') {
            this.openVersionMessage(data.message);
          }
        });
    }
  }

  onSubmit() {
    this.overstayForm?.markAllAsTouched();

    if (this.overstayForm?.valid) {
      const result = {
        ...this.overstayForm?.value,
      };
      this.onSubmitBtnLock = true;
      this.adminOverstaysService
        .editOverstay(result)
        .pipe(first())
        .subscribe(data => {
          if (data._id) {
            this.onSubmitBtnLock = false;
            this.socketService.emit('change', 'overstay status - change');
            this.overstayDetails = { ...this.overstayDetails, ...data };
            this.setMainInfo();
            this.overstayFormGroup();
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

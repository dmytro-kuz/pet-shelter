import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/data/interfaces/dialog-data';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SocketService } from 'src/app/shared/service/socket.service';
import { PickerParams } from 'src/app/data/interfaces/picker-params';
import { DatepickerComponent } from 'src/app/shared/components/datepicker/datepicker.component';
import { first } from 'rxjs';
import { ClientPetService } from './client-pet.service';

@Component({
  selector: 'app-client-pet-form',
  templateUrl: './client-pet-form.component.html',
  styleUrls: ['./client-pet-form.component.scss'],
})
export class ClientPetFormComponent implements OnInit {
  @ViewChild(DatepickerComponent)
  public datepickerComponent?: DatepickerComponent;
  loading$ = this.service.loading$;

  pickerData: PickerParams = {
    label: 'Оберіть дати перетримки',
    overstayDates: [],
    allOverstayDates: this.dialogData.allOverstayDates,
    clearType: 'clear',
  };

  cardTitle?: string;
  formType?: string;

  clientPetForm?: FormGroup;

  //MatSnackConfig
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    private dialogRef: MatDialogRef<ClientPetFormComponent>,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private service: ClientPetService,
    private socketService: SocketService,
  ) {}

  ngOnInit() {
    this.cardTitle = this.dialogData.title;
    this.formType = this.dialogData.type;
    this.clientPetFormGroup();
  }

  clientPetFormGroup() {
    this.clientPetForm = this.formBuilder.group({
      clientName: ['', [Validators.required, Validators.pattern(/[А-ЯҐЄІЇA-Z][а-яґєіїa-z]+$/)]],
      clientEmail: [
        '',
        [Validators.required, Validators.email, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)],
      ],
      clientPhone: ['', [Validators.required, Validators.minLength(16)]],
      clientInformation: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  validControl(value: string) {
    return this.clientPetForm?.controls[value].touched && this.clientPetForm?.controls[value].invalid;
  }

  getErrorMessage(param: string) {
    if (this.clientPetForm?.controls[param].hasError('required')) {
      return 'Це поле не може бути пустим';
    } else if (this.clientPetForm?.controls[param].hasError('email')) {
      return 'Електронна адреса невалідна';
    } else if (this.clientPetForm?.controls[param].hasError('pattern')) {
      return param == 'clientEmail' ? 'Електронна адреса невалідна' : 'Перевірте правильність написання';
    }
    return this.clientPetForm?.controls[param].hasError('minLength') ? '' : 'Недостатньо символів';
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Закрити', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submitAdopt() {
    this.clientPetForm?.markAllAsTouched();

    if (this.clientPetForm?.valid) {
      const result = {
        ...this.clientPetForm?.value,
        pet_id: this.dialogData.petId,
        adoptStatus: 'в обробці',
      };

      this.service
        .createAdopt(result)
        .pipe(first())
        .subscribe(data => {
          if (data.status == 'success') {
            this.socketService.emit('create', 'adopt status - create');
            this.openSnackBar(data.message);
            this.closeDialog();
          } else if (data.status == 'rejected') {
            this.openSnackBar(data.message);
          }
        });
    }
  }

  submitOverstay() {
    this.clientPetForm?.markAllAsTouched();
    this.datepickerComponent?.reservedDatesForm?.markAllAsTouched();
    const overstayDates = this.datepickerComponent?.getOverstayDates();

    if (this.clientPetForm?.valid && this.datepickerComponent?.reservedDatesForm?.valid) {
      const result = {
        ...this.clientPetForm?.value,
        pet_id: this.dialogData.petId,
        overstayDates: overstayDates,
        overstayStatus: 'в обробці',
      };

      this.service
        .createOverstay(result)
        .pipe(first())
        .subscribe(data => {
          if (data.status == 'success') {
            this.socketService.emit('create', 'overstay status - create');
            this.pickerData.allOverstayDates.push(...overstayDates!);
            this.openSnackBar(data.message);
            this.closeDialog();
          } else if (data.status == 'rejected') {
            this.openSnackBar(data.message);
          }
        });
    }
  }
}

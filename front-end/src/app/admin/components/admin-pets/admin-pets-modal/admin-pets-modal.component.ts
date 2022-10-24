import { AdminPetsService } from './../admin-pets.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { petModalFormValue } from 'src/app/admin/shared/data/pet-modal-form-value';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminPetModalValue } from 'src/app/admin/shared/interfaces/admin-pet-modal-value';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { first } from 'rxjs';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';

@Component({
  selector: 'app-admin-pets-modal',
  templateUrl: './admin-pets-modal.component.html',
  styleUrls: ['./admin-pets-modal.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class AdminPetsModalComponent implements OnInit {
  modalFormValue?: AdminPetModalValue;
  modalForm?: FormGroup;
  checkMsg?: boolean;
  errMsg?: boolean;
  onSubmitBtnLock: boolean = false;
  statusMsg: string = ``;
  today: Date = new Date();
  minDate: Date | undefined;
  maxDate: Date | undefined;
  defStatus = { value: 'Живий', disabled: true };

  constructor(
    private fb: FormBuilder,
    private adminPetsService: AdminPetsService,
    public dialogRef: MatDialogRef<AdminPetsModalComponent>,
    private snackBar: MatSnackBar,
  ) {}

  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  ngOnInit() {
    this.modalFormValue = petModalFormValue;
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = this.today;

    this.modalForm = this.fb.group({
      name: [null, [Validators.required, Validators.pattern(/[А-ЯҐЄІЇA-Z][а-яґєіїa-z]+$/), Validators.minLength(2)]],
      type: [null, [Validators.required]],
      breed: [null],
      sex: [null, [Validators.required]],
      birthDate: [null, [Validators.required]],
      size: [null, [Validators.required]],
      description: null,
      status: [this.defStatus],
    });
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      form.value.status = 'Живий';
      this.onSubmitBtnLock = true;
      this.adminPetsService
        .addPet(form.value)
        .pipe(first())
        .subscribe({
          complete: () => {
            this.openSnackBar(`Тварину ${form.value.name} успішно додано.`);
            setTimeout(() => {
              this.dialogRef.close();
              this.resetModalForm();
            }, 2000);
          },
          error: () => {
            this.onSubmitBtnLock = false;
          },
        });
    }
  }

  validControl(value: string) {
    return this.modalForm?.controls[value].touched && this.modalForm?.controls[value].invalid;
  }

  getErrorMessage(param: string) {
    if (this.modalForm?.controls[param].hasError('required')) {
      return 'Це поле має бути заповненим';
    } else if (this.modalForm?.controls[param].hasError('pattern')) {
      return (param = 'Перевірте правильність написання (імʼя з великої букви)');
    }
    return this.modalForm?.controls[param].hasError('minLength') ? '' : 'Недостатньо символів';
  }

  resetModalForm(): void {
    this.modalForm?.reset({ status: this.defStatus });
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Закрити', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
    });
  }
}

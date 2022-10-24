import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DonateService } from '../donate.service';
import { Donate } from 'src/app/data/interfaces/donate';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from 'src/app/shared/service/socket.service';
import { first } from 'rxjs';
@Component({
  selector: 'app-donate-preview',
  templateUrl: './donate-preview.component.html',
  styleUrls: ['./donate-preview.component.scss'],
})
export class DonatePreviewComponent implements OnInit {
  constructor(
    private DonateService: DonateService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private socketService: SocketService,
  ) {}
  paymentForm?: FormGroup;
  showMoreInfo: boolean = true;
  queryAmount?: number | string;

  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  donateAmount?: number;
  customPattern = { '0': { pattern: new RegExp('\\d'), symbol: '●' } };

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      paymentCard: ['', [Validators.required, Validators.minLength(16)]],
      paymentDateLimit: [
        '',
        [Validators.required, Validators.pattern(/^(0[1-9]|1[012])[2-4]{1}[0-9]{1}$/), Validators.minLength(4)],
      ],
      paymentCvv: ['', [Validators.required, Validators.min(1), Validators.minLength(3)]],
      paymentAmount: ['', [Validators.required, Validators.min(0.1)]],
    });

    this.setInputAmountFromRoute();
    this.checkShowMoreInfo();
    this.setTotalAmount();
  }
  checkShowMoreInfo(): void {
    window.location.href.toString().match('/donates') ? (this.showMoreInfo = false) : (this.showMoreInfo = true);
  }

  setInputAmountFromRoute(): void {
    this.route.queryParams.pipe(first()).subscribe(param => {
      if (param['donateAmount']) {
        this.setPaymentAmount(param['donateAmount']);
      }
    });
  }

  setTotalAmount(): void {
    this.DonateService.getTotalAmount()
      .pipe(first())
      .subscribe((totalAmount: number | undefined) => (this.donateAmount = totalAmount));
  }

  setPaymentAmount(amount: any): void {
    if (typeof amount !== 'number' && typeof amount !== 'string') {
      this.queryAmount = amount.target.value.replace(/\D+/g, '');
      this.paymentForm?.patchValue({
        paymentAmount: amount.target.value.replace(/\D+/g, ''),
      });
    } else {
      this.queryAmount = amount;
      this.paymentForm?.patchValue({
        paymentAmount: amount,
      });
    }
  }

  openSnackBar(paymentRes: Donate) {
    this._snackBar.open(
      paymentRes.status === 'Успішно'
        ? `Дякуємо за допомогу, ваш платіж у розмірі ${paymentRes.amount} UAH успішно отриманий`
        : `Щось пішло не так.  ${paymentRes.errDescription}`,
      'Закрити',
      { horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition, duration: 5000 },
    );
  }

  onSubmit(): void {
    this.paymentForm?.markAllAsTouched();
    if (this.paymentForm?.valid) {
      this.DonateService.postPayment(this.paymentForm.value)
        .pipe(first())
        .subscribe((paymentRes: Donate) => {
          this.openSnackBar(paymentRes);
          if (paymentRes.status === 'Успішно') {
            this.socketService.emit('create', paymentRes.status);
            if (this.donateAmount) {
              this.donateAmount += paymentRes.amount;
            }
            this.paymentForm?.reset();
          }
        });
    }
  }
}

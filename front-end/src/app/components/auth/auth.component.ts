import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}
  authForm?: FormGroup;
  errorMessage?: string;

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit(): void {
    if (this.authForm?.value) {
      this.authService
        .auth(this.authForm.value)
        .pipe(first())
        .subscribe(token => {
          if (token) {
            localStorage.setItem('accessToken', token.accessToken);
            this.errorMessage = undefined;
            this.router.navigate(['/admin']);
          }
        });
    }
  }
}

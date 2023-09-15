// Lib
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

// Components
import { LoginUser } from 'src/types/user.types';
import { LoginResponse } from 'src/types/api.types';

// Services
import { AuthService } from 'src/app/core/services/user/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  user: LoginUser = { email: '', password: '' };
  loader: any = false;
  error: string;
  @ViewChild('loginForm') form: NgForm;
  constructor(private auth: AuthService, private router: Router) {}

  onSubmitHandler() {
    this.loader = true;
    const { email, password } = this.form.value;

    const res = this.auth.login(email, password);

    console.log({ res });
  }
}

// Lib
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

// Components
import { LoginUser } from 'src/types/user.types';
import ObservableHandler from 'src/app/core/helpers/ObservableHandler';

// Services
import { AuthService } from 'src/app/core/services/user/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  user: LoginUser = { email: '', password: '' };
  loading: any = false;
  error: string;
  @ViewChild('loginForm') form: NgForm;
  constructor(private auth: AuthService) {
    this.error = '';
  }

  ngOnInit() {
    ObservableHandler.errorHandler(this.auth.getLoginErrorApi(), this);
    ObservableHandler.loadingHandler(this.auth.getLoginApiLoading(), this);
  }

  onSubmitHandler() {
    const { email, password } = this.form.value;
    this.auth.loginApi(email, password);
  }
}

import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginUser } from 'src/types/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  user: LoginUser = { email: '', password: '' };
  @ViewChild('loginForm') form: NgForm;
  constructor() {}

  onSubmitHandler() {
    console.log(this.form.value);
  }
}

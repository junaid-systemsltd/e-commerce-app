import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import ObservableHandler from 'src/app/core/helpers/ObservableHandler';
import { AuthService } from 'src/app/core/services/user/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  loading: boolean;
  error: string;

  @ViewChild('regForm') form: NgForm;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    ObservableHandler.errorHandler(
      this.authService.getRegisterApiError(),
      this
    );
    ObservableHandler.loadingHandler(
      this.authService.getRegisterApiLoading(),
      this
    );
  }

  async onSubmitHandler() {
    const avatar = this.authService.getAvatar('');
    this.authService.registerUserApi({ ...this.form.value, avatar });
  }
}

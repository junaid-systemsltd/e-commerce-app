import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/user/auth.service';
import { IUser, UserT } from 'src/types/user.types';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  user: UserT;
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.auth.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  logoutHandler() {
    this.auth.logout();
  }
}

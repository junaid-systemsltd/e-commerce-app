import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/user/auth.service';
import { IUser, User, UserT } from 'src/types/user.types';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  user: User | null;
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  logoutHandler() {
    this.auth.logout();
  }
}

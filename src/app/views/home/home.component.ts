import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/user/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(private auth: AuthService) {}
  items: any;
  subscription: Subscription;

  ngOnInit(): void {
    this.auth.userSubject.subscribe((data) => {});
  }
}

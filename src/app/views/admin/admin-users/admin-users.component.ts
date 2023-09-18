import { Component } from '@angular/core';
import { UsersList } from 'src/types/api.types';
import { AdminService } from 'src/app/core/services/admin/admin.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
})
export class AdminUsersComponent {
  users: UsersList;
  loading: boolean;
  error: string;

  constructor(adminService: AdminService) {
    adminService.getUsersApi();

    adminService.getUsersList().subscribe((users) => {
      this.users = users;
    });

    adminService.getUsersApiLoading().subscribe((loading) => {
      this.loading = loading;
    });

    adminService.getProductsApiError().subscribe((error) => {
      this.error = error;
    });
  }
}

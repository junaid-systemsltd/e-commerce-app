import { Component } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin/admin.service';
import { TProduct } from 'src/types/product.types';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
})
export class AdminProductsComponent {
  products: TProduct;
  loading: boolean;
  error: string;

  constructor(adminService: AdminService) {
    adminService.getProductsApi();

    adminService.getProductsList().subscribe((products) => {
      this.products = products;
    });

    adminService.getProductsApiLoading().subscribe((loading) => {
      this.loading = loading;
    });

    adminService.getProductsApiError().subscribe((error) => {
      this.error = error;
    });
  }
}

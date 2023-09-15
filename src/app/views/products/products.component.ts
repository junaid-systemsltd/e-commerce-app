import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product/product.service';
import { TProduct } from 'src/types/product.types';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  constructor(private product: ProductService) {}
  products: TProduct;
  loading: boolean;
  error: string;
  ngOnInit(): void {
    this.product.getProducts().subscribe((products) => {
      this.products = products;
    });

    this.product.getLoader().subscribe((loader) => {
      this.loading = loader;
    });

    this.product.getError().subscribe((error) => {
      this.error = error;
    });
  }
}

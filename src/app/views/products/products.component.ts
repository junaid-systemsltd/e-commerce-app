import { Component, OnInit } from '@angular/core';
import ObservableHandler from 'src/app/core/helpers/ObservableHandler';
import { ProductService } from 'src/app/core/services/product/product.service';
import { TProduct } from 'src/types/product.types';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  constructor(private productService: ProductService) {
    this.productService.getProductsApi();
  }
  products: TProduct;
  loading: boolean;
  error: string;
  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });

    ObservableHandler.errorHandler(
      this.productService.getProductsError(),
      this
    );

    ObservableHandler.loadingHandler(
      this.productService.getProductsLoader(),
      this
    );
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import ObservableHandler from 'src/app/core/helpers/ObservableHandler';
import { ProductService } from 'src/app/core/services/product/product.service';
import { IProduct } from 'src/types/product.types';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent {
  error: string;
  loading: boolean;
  product: IProduct | null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {
    this.error = '';
    this.loading = false;

    ObservableHandler.errorHandler(this.productService.getProductError(), this);
    ObservableHandler.loadingHandler(
      this.productService.getProductLoader(),
      this
    );

    this.productService.productSub.subscribe((product) => {
      this.product = product;
    });

    this.activatedRoute.params.subscribe((params) => {
      console.log({ params });
      let productId = params['id'];
      this.productService.getProductByIdApi(productId);
    });
  }
}

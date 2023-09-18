// Libs
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/auth/login/login.component';
import { ProductsComponent } from './views/products/products.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { AdminUsersComponent } from './views/admin/admin-users/admin-users.component';
import { ProductDetailComponent } from './views/product-detail/product-detail.component';
import { AdminProductsComponent } from './views/admin/admin-products/admin-products.component';
import { authGuard } from './core/guards/auth.guard';
import { adminAuthGuard } from './core/guards/admin-auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent, canActivate: [authGuard] },
  {
    path: 'product',
    children: [
      {
        path: ':id',
        component: ProductDetailComponent,
      },
    ],
  },
  // Authentication Routes
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  // Admin Routes
  {
    path: 'admin',
    children: [
      { path: 'products', component: AdminProductsComponent },
      { path: 'users', component: AdminUsersComponent },
    ],
    canActivate: [adminAuthGuard],
  },
  // 404 Route
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}

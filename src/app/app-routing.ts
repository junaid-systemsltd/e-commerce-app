import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { LoginComponent } from './views/login/login.component';
import { ProductsComponent } from './views/products/products.component';
import { AdminProductsComponent } from './views/admin/admin-products/admin-products.component';
import { AdminUsersComponent } from './views/admin/admin-users/admin-users.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent },
  {
    path: 'admin',
    children: [
      { path: 'products', component: AdminProductsComponent },
      { path: 'users', component: AdminUsersComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
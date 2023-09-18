// Libs
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/auth/login/login.component';
import { ProductsComponent } from './views/products/products.component';
import { LoaderComponent } from './components/ui/loader/loader.component';
import { NavbarComponent } from './components/ui/navbar/navbar.component';
import { ProductComponent } from './components/product/product.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { MessageComponent } from './components/ui/message/message.component';
import { AdminUsersComponent } from './views/admin/admin-users/admin-users.component';
import { AdminProductsComponent } from './views/admin/admin-products/admin-products.component';
import { FormContainerComponent } from './components/ui/form-container/form-container.component';

// Services
import { AuthService } from './core/services/user/auth.service';
import { AdminService } from './core/services/admin/admin.service';
import { UserApiService } from './core/services/user/user-api.service';
import { ProductService } from './core/services/product/product.service';
import { AdminApiService } from './core/services/admin/admin-api.service';
import { ProductApiService } from './core/services/product/product-api.service';
import { RegisterComponent } from './views/auth/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NotFoundComponent,
    LoginComponent,
    FormContainerComponent,
    LoaderComponent,
    MessageComponent,
    ProductsComponent,
    ProductComponent,
    AdminProductsComponent,
    AdminUsersComponent,
    RegisterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [
    UserApiService,
    AuthService,
    ProductApiService,
    ProductService,
    AdminApiService,
    AdminService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

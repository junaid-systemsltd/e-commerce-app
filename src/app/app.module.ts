// Libs
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { LoaderComponent } from './components/ui/loader/loader.component';
import { NavbarComponent } from './components/ui/navbar/navbar.component';
import { MessageComponent } from './components/ui/message/message.component';
import { FormContainerComponent } from './components/ui/form-container/form-container.component';

// Services
import { AuthService } from './core/services/user/auth.service';
import { UserApiService } from './core/services/user/user-api.service';

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
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [UserApiService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}

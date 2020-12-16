import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ApiService } from './services/api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { InfoComponent } from './components/info/info.component';
import { LoginComponent } from './components/user/login/login.component';
import { MenuPointComponent } from './components/shared/menu-point/menu-point.component';
import { NgPopupsModule } from 'ng-popups';
import { ProfileComponent } from './components/user/profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/user/signup/signup.component';
import { ToastrModule } from 'ngx-toastr';
import { VerificationComponent } from './components/user/verification/verification.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    VerificationComponent,
    DashboardComponent,
    SignupComponent,
    InfoComponent,
    MenuPointComponent,
    ProfileComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    NgPopupsModule.forRoot(),
    ReactiveFormsModule,
    ToastrModule.forRoot({positionClass: 'toast-top-center', progressBar: true})
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ApiService } from './services/api.service';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/user/login/login.component';
import { VerificationComponent } from './components/user/verification/verification.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InfoComponent } from './components/info/info.component';
import { MenuPointComponent } from './components/shared/menu-point/menu-point.component';
import { ProfileComponent } from './components/user/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    VerificationComponent,
    DashboardComponent,
    RegisterComponent,
    InfoComponent,
    MenuPointComponent,
    ProfileComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

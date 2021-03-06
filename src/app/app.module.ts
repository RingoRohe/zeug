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
import { MainmenuComponent } from './components/mainmenu/mainmenu.component';
import { ItemsComponent } from './components/items/items/items.component';
import { CreateItemComponent } from './components/items/create-item/create-item.component';
import { EditItemComponent } from './components/items/edit-item/edit-item.component';
import { PrimaryItemComponent } from './components/widgets/primary-item/primary-item.component';
import { ItemFormComponent } from './components/items/shared/item-form/item-form.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { SecondaryItemComponent } from './components/widgets/secondary-item/secondary-item.component';
import { StoragesComponent } from './components/storages/storages/storages.component';
import { EditStorageComponent } from './components/storages/edit-storage/edit-storage.component';
import { CreateStorageComponent } from './components/storages/create-storage/create-storage.component';
import { PrimaryStorageComponent } from './components/widgets/primary-storage/primary-storage.component';
import { StorageFormComponent } from './components/storages/shared/storage-form/storage-form.component';


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
    ProfileComponent,
    MainmenuComponent,
    ItemsComponent,
    CreateItemComponent,
    EditItemComponent,
    PrimaryItemComponent,
    ItemFormComponent,
    SecondaryItemComponent,
    StoragesComponent,
    EditStorageComponent,
    CreateStorageComponent,
    PrimaryStorageComponent,
    StorageFormComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    NgPopupsModule.forRoot(),
    ReactiveFormsModule,
    ToastrModule.forRoot({ positionClass: 'toast-top-center', progressBar: true }),
    NgxSmartModalModule.forRoot()
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

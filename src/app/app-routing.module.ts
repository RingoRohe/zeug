import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InfoComponent } from './components/info/info.component';
import { LoginComponent, ProfileComponent, SignupComponent, VerificationComponent } from './components/user';
import { ItemsComponent, CreateItemComponent, EditItemComponent } from './components/items';
import { StoragesComponent, CreateStorageComponent, EditStorageComponent } from './components/storages';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/signup', component: SignupComponent },
  { path: 'user/verify', component: VerificationComponent },
  { path: 'user/profile', component: ProfileComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'items/create', component: CreateItemComponent },
  { path: 'items/edit/:id', component: EditItemComponent },
  { path: 'storages', component: StoragesComponent },
  { path: 'storages/create', component: CreateStorageComponent },
  { path: 'storages/edit/:id', component: EditStorageComponent },
  { path: 'info', component: InfoComponent },
  { path: '**', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

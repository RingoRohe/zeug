import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InfoComponent } from './components/info/info.component';
import { LoginComponent, ProfileComponent, SignupComponent, VerificationComponent } from './components/user';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/signup', component: SignupComponent },
  { path: 'user/verify', component: VerificationComponent },
  { path: 'user/profile', component: ProfileComponent },
  { path: 'info', component: InfoComponent },
  { path: '**', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

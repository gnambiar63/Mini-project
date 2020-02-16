import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { StartComponent } from './start/start.component';
import { DraftsComponent } from './../app/start/drafts/drafts.component';




const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path : 'signup', component : SignupComponent },
  { path : 'home', component : HomeComponent },
  { path : 'start', component : StartComponent },
  { path : 'drafts', component : DraftsComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

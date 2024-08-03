import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { WebListComponent } from './components/web-list/web-list.component';
import { AuthGuardGuard } from './services/authguard.guard';

const routes: Routes = [
  { path : '', redirectTo : 'login', pathMatch : 'full'},
  { path : 'login', component : LoginComponent},
  { path : 'home' , component : HomeComponent,canActivate : [AuthGuardGuard]},
  { path : 'website-list/:id', component : WebListComponent,canActivate : [AuthGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { WebListComponent } from './components/web-list/web-list.component';

const routes: Routes = [
  { path : '', redirectTo : 'login', pathMatch : 'full'},
  { path : 'login', component : LoginComponent},
  { path : 'home' , component : HomeComponent},
  { path : 'website-list', component : WebListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

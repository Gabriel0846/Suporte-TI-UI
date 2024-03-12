import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { TecnicosListComponent } from './components/tecnico/tecnicos-list/tecnicos-list.component';

const routes: Routes = [
  {
    path: '', component: NavComponent,
      children: [
        { path: 'home', component: HomeComponent},
        { path: 'tecnicos', component: TecnicosListComponent}
      ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

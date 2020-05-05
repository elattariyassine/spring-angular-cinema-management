import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CinemaComponent } from './components/cinema/cinema.component';


const routes: Routes = [
  { path:'cinema', component: CinemaComponent },
  { path:'cinema', component: CinemaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

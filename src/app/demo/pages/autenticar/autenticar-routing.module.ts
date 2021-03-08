import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutenticarComponent } from './autenticar.component';

const routes: Routes = [
  {
    path: '',
    component: AutenticarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutenticarRoutingModule { }

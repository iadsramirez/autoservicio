import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrestamoComponent } from './prestamo.component';



const routes: Routes = [
  {
    path: '',
    component:PrestamoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule]
})
export class   PrestamoRoutingModule { }

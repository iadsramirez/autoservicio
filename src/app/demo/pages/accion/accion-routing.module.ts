import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { DatosComponent } from './datos.component';
import { AccionComponent } from './accion.component';




const routes: Routes = [
  {
    path: '',
    component:AccionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule]
})
export class AccionRoutingModule { }

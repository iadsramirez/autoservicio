import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatosComponent } from './datos.component';




const routes: Routes = [
  {
    path: '',
    component:DatosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule]
})
export class DatosRoutingModule { }

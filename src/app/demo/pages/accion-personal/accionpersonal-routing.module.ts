import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccionPersonalComponent } from './accion-personal.component';



const routes: Routes = [
  {
    path: '',
    component:AccionPersonalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule]
})
export class AccionPersonalRoutingModule { }

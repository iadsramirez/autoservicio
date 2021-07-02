import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpedienteComponent } from './expediente.component';




const routes: Routes = [
  {
    path: '',
    component:ExpedienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule]
})
export class ExpedienteRoutingModule { }

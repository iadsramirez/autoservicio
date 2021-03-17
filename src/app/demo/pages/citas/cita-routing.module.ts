import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CitasComponent } from './citas.component';



const routes: Routes = [
  {
    path: '',
    component:CitasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule]
})
export class CitaRoutingModule { }

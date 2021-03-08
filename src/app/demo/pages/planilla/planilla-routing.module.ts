import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanillaComponent } from './planilla.component';


const routes: Routes = [
  {
    path: '',
    component:PlanillaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanillaRoutingModule { }

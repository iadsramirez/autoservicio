import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { VacacionComponent } from "./vacacion.component";




const routes: Routes = [
  {
    path: '',
    component:VacacionComponent
  }
];




@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule]
})
export class   VacacionRoutingModule { }

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxPaginationModule } from "ngx-pagination";
import { SharedModule } from "src/app/theme/shared/shared.module";
import { VacacionRoutingModule } from "./vacacion-routing.module";
import { VacacionComponent } from "./vacacion.component";

@NgModule({
  declarations: [VacacionComponent],
  imports: [NgxPaginationModule,FormsModule,NgbModule.forRoot(),
    CommonModule,
    VacacionRoutingModule,
    SharedModule
  ]
})
export class   VacacionModule { }

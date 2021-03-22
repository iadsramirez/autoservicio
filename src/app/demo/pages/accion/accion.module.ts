import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../../theme/shared/shared.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AccordionModule} from "ng2-accordion";
import { AccionComponent } from './accion.component';
import { AccionRoutingModule } from './accion-routing.module';

@NgModule({
  declarations: [AccionComponent],
  imports: [NgxPaginationModule,FormsModule,NgbModule.forRoot(),
    CommonModule,AccionRoutingModule,AccordionModule
    ,
    SharedModule
  ]
})
export class AccionModule { }

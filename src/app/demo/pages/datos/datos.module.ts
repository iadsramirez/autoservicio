import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../../theme/shared/shared.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { ToastrModule } from 'ngx-toastr';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatosComponent } from './datos.component';
import { DatosRoutingModule } from './datos-routing.module';
import {AccordionModule} from "ng2-accordion";
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [DatosComponent],
  imports: [NgxPaginationModule,FormsModule,NgbModule.forRoot(),
    CommonModule,DatosRoutingModule,AccordionModule,
    SharedModule,
    NgxMaskModule.forRoot()
  ]
})
export class DatosModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../../theme/shared/shared.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { AccionPersonalComponent } from './accion-personal.component';
import { AccionPersonalRoutingModule } from './accionpersonal-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AccionPersonalComponent],
  imports: [NgxPaginationModule,FormsModule,NgbModule.forRoot(),
    CommonModule,
    AccionPersonalRoutingModule,
    SharedModule
  ]
})
export class AccionPersonalModule { }

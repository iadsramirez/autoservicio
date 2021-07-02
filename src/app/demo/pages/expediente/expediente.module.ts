import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../../theme/shared/shared.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExpedienteComponent } from './expediente.component';
import { ExpedienteRoutingModule } from './expediente-routing.module';

@NgModule({
  declarations: [ExpedienteComponent],
  imports: [NgxPaginationModule,FormsModule,NgbModule.forRoot(),
    CommonModule,
    ExpedienteRoutingModule,
    SharedModule
  ]
})
export class ExpedienteModule { }

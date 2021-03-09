import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../../theme/shared/shared.module';
import { PlanillaComponent } from './planilla.component';
import { PlanillaRoutingModule } from './planilla-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [PlanillaComponent],
  imports: [NgxPaginationModule,
    CommonModule,
    PlanillaRoutingModule,
    SharedModule
  ]
})
export class PlanillaModule { }

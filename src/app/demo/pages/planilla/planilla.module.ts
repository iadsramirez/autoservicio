import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../../theme/shared/shared.module';
import { PlanillaComponent } from './planilla.component';
import { PlanillaRoutingModule } from './planilla-routing.module';

@NgModule({
  declarations: [PlanillaComponent],
  imports: [
    CommonModule,
    PlanillaRoutingModule,
    SharedModule
  ]
})
export class PlanillaModule { }

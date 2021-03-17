import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../../theme/shared/shared.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { ToastrModule } from 'ngx-toastr';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CitasComponent } from './citas.component';
import { CitaRoutingModule } from './cita-routing.module';

@NgModule({
  declarations: [CitasComponent],
  imports: [NgxPaginationModule,FormsModule,NgbModule.forRoot(),
    CommonModule,
    CitaRoutingModule,
    SharedModule
  ]
})
export class CitaModule { }

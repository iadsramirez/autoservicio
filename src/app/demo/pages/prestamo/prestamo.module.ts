import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../../theme/shared/shared.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PrestamoComponent } from './prestamo.component';
import { PrestamoRoutingModule } from './prestamo-routing.module';
//import { ToastrModule } from 'ngx-toastr';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [PrestamoComponent],
  imports: [NgxPaginationModule,FormsModule,NgbModule.forRoot(),
    CommonModule,
    PrestamoRoutingModule,
    SharedModule
  ]
})
export class   PrestamoModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrescriptionsScreenRoutingModule } from './prescriptions-screen-routing.module';
import { PrescriptionsScreenComponent } from './prescriptions-screen/prescriptions-screen.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [PrescriptionsScreenComponent],
  imports: [
    CommonModule,
    PrescriptionsScreenRoutingModule,
    FontAwesomeModule
  ]
})
export class PrescriptionsScreenModule { }

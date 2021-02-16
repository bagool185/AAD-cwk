import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrescriptionsScreenRoutingModule } from './prescriptions-screen-routing.module';
import { PrescriptionsScreenComponent } from './prescriptions-screen/prescriptions-screen.component';


@NgModule({
  declarations: [PrescriptionsScreenComponent],
  imports: [
    CommonModule,
    PrescriptionsScreenRoutingModule
  ]
})
export class PrescriptionsScreenModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsScreenRoutingModule } from './patients-screen-routing.module';
import { PatientsScreenComponent } from './patients-screen/patients-screen.component';


@NgModule({
  declarations: [PatientsScreenComponent],
  imports: [
    CommonModule,
    PatientsScreenRoutingModule
  ]
})
export class PatientsScreenModule { }

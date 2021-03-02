import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsScreenRoutingModule } from './patients-screen-routing.module';
import { PatientsScreenComponent } from './patients-screen/patients-screen.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [PatientsScreenComponent],
  imports: [
    CommonModule,
    PatientsScreenRoutingModule,
    SharedModule
  ]
})
export class PatientsScreenModule { }

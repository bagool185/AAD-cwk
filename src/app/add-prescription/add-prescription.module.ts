import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddPrescriptionRoutingModule } from './add-prescription-routing.module';
import { AddPrescriptionComponent } from './add-prescription/add-prescription.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddPrescriptionComponent],
  imports: [
    CommonModule,
    AddPrescriptionRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AddPrescriptionModule { }

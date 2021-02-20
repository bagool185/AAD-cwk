import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrescriptionsScreenRoutingModule } from './prescriptions-screen-routing.module';
import { PrescriptionsScreenComponent } from './prescriptions-screen/prescriptions-screen.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PrescriptionDetailsModalComponent } from './prescription-details-modal/prescription-details-modal.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [PrescriptionsScreenComponent, PrescriptionDetailsModalComponent],
  imports: [
    CommonModule,
    PrescriptionsScreenRoutingModule,
    FontAwesomeModule,
    MatDialogModule
  ]
})
export class PrescriptionsScreenModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PharmacistDashboardRoutingModule } from './pharmacist-dashboard-routing.module';
import { PharmacistDashboardComponent } from './pharmacist-dashboard/pharmacist-dashboard.component';
import { SharedModule } from '@shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DenyPrescriptionModalComponent } from './deny-prescription-modal/deny-prescription-modal.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PharmacistDashboardComponent, DenyPrescriptionModalComponent],
  imports: [
    CommonModule,
    PharmacistDashboardRoutingModule,
    SharedModule,
    FontAwesomeModule,
    FormsModule
  ]
})
export class PharmacistDashboardModule { }

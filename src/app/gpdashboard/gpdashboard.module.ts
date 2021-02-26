import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GPDashboardRoutingModule } from './gpdashboard-routing.module';
import { GPDashboardComponent } from './gpdashboard/gpdashboard.component';
import { SharedModule } from '@shared/shared.module';
import { CreatePrescriptionModalComponent } from './create-prescription-modal/create-prescription-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ScheduleBloodTestModalComponent } from './schedule-blood-test-modal/schedule-blood-test-modal.component';


@NgModule({
  declarations: [GPDashboardComponent, CreatePrescriptionModalComponent, ScheduleBloodTestModalComponent],
  imports: [
    CommonModule,
    GPDashboardRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class GPDashboardModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechnicianDashboardRoutingModule } from './technician-dashboard-routing.module';
import { TechnicianDashboardComponent } from './technician-dashboard/technician-dashboard.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [TechnicianDashboardComponent],
  imports: [
    CommonModule,
    TechnicianDashboardRoutingModule,
    SharedModule
  ]
})
export class TechnicianDashboardModule { }

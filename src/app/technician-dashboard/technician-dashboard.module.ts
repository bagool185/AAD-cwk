import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechnicianDashboardRoutingModule } from './technician-dashboard-routing.module';
import { TechnicianDashboardComponent } from './technician-dashboard/technician-dashboard.component';


@NgModule({
  declarations: [TechnicianDashboardComponent],
  imports: [
    CommonModule,
    TechnicianDashboardRoutingModule
  ]
})
export class TechnicianDashboardModule { }

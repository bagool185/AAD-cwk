import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PharmacistDashboardRoutingModule } from './pharmacist-dashboard-routing.module';
import { PharmacistDashboardComponent } from './pharmacist-dashboard/pharmacist-dashboard.component';


@NgModule({
  declarations: [PharmacistDashboardComponent],
  imports: [
    CommonModule,
    PharmacistDashboardRoutingModule
  ]
})
export class PharmacistDashboardModule { }

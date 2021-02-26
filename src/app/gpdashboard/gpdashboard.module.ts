import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GPDashboardRoutingModule } from './gpdashboard-routing.module';
import { GPDashboardComponent } from './gpdashboard/gpdashboard.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [GPDashboardComponent],
  imports: [
    CommonModule,
    GPDashboardRoutingModule,
    SharedModule
  ]
})
export class GPDashboardModule { }

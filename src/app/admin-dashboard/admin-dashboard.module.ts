import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SharedModule } from '@shared/shared.module';
import { ConfirmUserDeletionModalComponent } from './admin-dashboard/confirm-user-deletion-modal/confirm-user-deletion-modal.component';


@NgModule({
  declarations: [AdminDashboardComponent, ConfirmUserDeletionModalComponent],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    SharedModule
  ]
})
export class AdminDashboardModule { }

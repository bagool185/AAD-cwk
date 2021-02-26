import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '@shared/layout/layout.component';
import { PharmacistDashboardComponent } from './pharmacist-dashboard/pharmacist-dashboard.component';

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [{
    path: '',
    component: PharmacistDashboardComponent,
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmacistDashboardRoutingModule { }

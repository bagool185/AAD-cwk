import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => 
      import('./welcome/welcome.module').then(m => m.WelcomeModule)
  },
  {
    path: 'register',
    loadChildren: () => 
      import('./register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'prescriptions',
    loadChildren: () =>
      import('./prescriptions-screen/prescriptions-screen.module').then(m => m.PrescriptionsScreenModule)
  },
  {
    path: 'add-prescription',
    loadChildren: () => 
      import('./add-prescription/add-prescription.module').then(m => m.AddPrescriptionModule)
  },
  {
    path: 'gp-dashboard',
    loadChildren: () => 
      import('./gpdashboard/gpdashboard.module').then(m => m.GPDashboardModule)
  },
  {
    path: 'pharmacist-dashboard',
    loadChildren: () => 
      import('./pharmacist-dashboard/pharmacist-dashboard.module').then(m => m.PharmacistDashboardModule)
  },
  {
    path: 'technician-dashboard',
    loadChildren: () => 
      import('./technician-dashboard/technician-dashboard.module').then(m => m.TechnicianDashboardModule)
  },
  {
    path: 'patients-screen',
    loadChildren: () =>
      import('./patients-screen/patients-screen.module').then(m => m.PatientsScreenModule)
  },
  {
    path: 'admin',
    loadChildren: () => 
      import('./admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule)
  },
  {
    path: '**',
    redirectTo: 'welcome',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

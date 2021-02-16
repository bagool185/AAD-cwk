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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

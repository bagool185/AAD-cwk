import { Component, OnInit } from '@angular/core';
import { IPrescription, PrescriptionStatus } from 'src/app/shared/models/prescriptions';

@Component({
  selector: 'app-prescriptions-screen',
  templateUrl: './prescriptions-screen.component.html',
  styleUrls: ['./prescriptions-screen.component.scss']
})
export class PrescriptionsScreenComponent implements OnInit {

  prescriptions: IPrescription[];

  constructor() { 
    this.prescriptions = [
      {
        dosage: '100mg',
        medication: 'Lavodopa',
        instructions: '2 tablets by mouth 3 times daily for one month. Take with food',
        status: PrescriptionStatus.Active
      },
      {
        medication: 'Amlodipine',
        dosage: '5mg',
        instructions: 'One tablet daily',
        status: PrescriptionStatus.Expired
      }
    ]

  }

  ngOnInit(): void {
  }

  getActivePrescriptions(): IPrescription[] {
    return this.prescriptions.filter(p => p.status === PrescriptionStatus.Active);
  }

  getExpiredPrescriptions(): IPrescription[] {
    return this.prescriptions.filter(p => p.status === PrescriptionStatus.Expired);
  }

}

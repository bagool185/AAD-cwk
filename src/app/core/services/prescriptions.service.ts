import { Injectable } from '@angular/core';
import { IPrescription, PrescriptionStatus } from '@shared/models/prescriptions';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionsService {

  private prescriptions: IPrescription[];
  

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

  getAll(): IPrescription[] {
    return this.prescriptions;
  }
  
}

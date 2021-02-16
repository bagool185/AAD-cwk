import { Component, OnInit } from '@angular/core';
import { PrescriptionsService } from '@services/prescriptions.service';
import { IPrescription, PrescriptionStatus } from 'src/app/shared/models/prescriptions';

@Component({
  selector: 'app-prescriptions-screen',
  templateUrl: './prescriptions-screen.component.html',
  styleUrls: ['./prescriptions-screen.component.scss']
})
export class PrescriptionsScreenComponent implements OnInit {

  prescriptions: IPrescription[];

  constructor(private readonly prescriptionService: PrescriptionsService) { 
    this.prescriptions = prescriptionService.getAll();
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

import { Component, OnInit } from '@angular/core';
import { MinLengthValidator } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { faBan, faCheck, faCross, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { IPrescriptionRequest, PrescriptionRequestStatuses } from '@shared/models/prescriptions';
import { PrescriptionRequestModalComponent } from '@shared/prescription-request-modal/prescription-request-modal.component';
import { AcceptPrescriptionModalComponent } from '../accept-prescription-modal/accept-prescription-modal.component';
import { DenyPrescriptionModalComponent } from '../deny-prescription-modal/deny-prescription-modal.component';

@Component({
  selector: 'app-pharmacist-dashboard',
  templateUrl: './pharmacist-dashboard.component.html',
  styleUrls: ['./pharmacist-dashboard.component.scss']
})
export class PharmacistDashboardComponent implements OnInit {

  prescriptionRequests!: IPrescriptionRequest[];
  faInfo = faInfoCircle;
  faCancel = faBan;
  faAccept = faCheck;

  constructor(private readonly dialog: MatDialog) { }

  ngOnInit(): void {
    this.prescriptionRequests = [
      {
        dose: '20mg',
        drugName: 'Scopolamine',
        endDate: '10/05/2022',
        id: 12321,
        instructions: 'Take once a day.',
        nextPickUp: '24/02/2021',
        patientEmail: 'tpratchett@gmail.com',
        pharmacistEmail: 'gmartin@gmail.com',
        requestDate: '23/02/2021',
        status: PrescriptionRequestStatuses.Accepted
      },
      {
        dose: '20mg',
        drugName: 'Hydrocodone',
        endDate: '16/04/2021',
        id: 12321,
        instructions: 'Take once a day.',
        nextPickUp: '27/02/2021',
        patientEmail: 'tpratchett@gmail.com',
        pharmacistEmail: 'gmartin@gmail.com',
        requestDate: '25/02/2021',
        status: PrescriptionRequestStatuses.Pending
      }
    ];
  }

  getPendingPrescriptionRequests() {
    return this.prescriptionRequests.filter(p => p.status === PrescriptionRequestStatuses.Pending);
  }

  getReviewedPrescriptionRequests() {
    return this.prescriptionRequests.filter(p => p.status !== PrescriptionRequestStatuses.Pending);
  }

  denyPresriptionRequest(prescriptionRequest: IPrescriptionRequest) {
    this.dialog.open(DenyPrescriptionModalComponent, {
      data: {
        prescriptionRequest
      },
      minWidth: '400px'
    });
  }

  acceptPrescriptionRequest(prescriptionRequest: IPrescriptionRequest) {
    this.dialog.open(AcceptPrescriptionModalComponent, {
      data: {
        prescriptionRequest
      },
      minWidth: '400px'
    })
  }

  showMore(prescriptionRequest: IPrescriptionRequest) {
    this.dialog.open(PrescriptionRequestModalComponent, {
      data: {
        prescriptionRequest
      },
      minWidth: '400px'
    });
  }

}

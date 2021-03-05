import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faBan, faCheck, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@services/auth.service';
import { PharmacistsService } from '@services/pharmacists.service';
import { ConfirmModalComponent } from '@shared/confirm-modal/confirm-modal.component';
import { IPrescriptionRequest, PrescriptionRequestStatuses } from '@shared/models/prescriptions';
import { PrescriptionRequestModalComponent } from '@shared/prescription-request-modal/prescription-request-modal.component';
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

  constructor(
    private readonly dialog: MatDialog,
    private readonly authService: AuthService,
    private readonly pharmacistService: PharmacistsService
  ) { }

  ngOnInit(): void {

    const pharmacistEmail = this.authService.currentUser();

    this.pharmacistService.getPrescriptionRequests(pharmacistEmail).subscribe(
      (res) => {
        this.prescriptionRequests = res.data || [];
      }
    );
  }

  getPendingPrescriptionRequests() {
    return this.prescriptionRequests?.filter(p => p.status === PrescriptionRequestStatuses.Pending) || [];
  }

  getReviewedPrescriptionRequests() {
    return this.prescriptionRequests?.filter(p => p.status !== PrescriptionRequestStatuses.Pending) || [];
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
    this.dialog.open(ConfirmModalComponent, {
      data: {
        title: `Prescription request #${prescriptionRequest.id}`,
        question: `Are you sure you want to accept the prescription request #${prescriptionRequest.id}`
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

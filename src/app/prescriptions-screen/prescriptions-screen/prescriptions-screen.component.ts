import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faInfo, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@services/auth.service';
import { PatientService } from '@services/patient.service';
import { PrescriptionsService } from '@services/prescriptions.service';
import { UserService } from '@services/user.service';
import { IPatientPrescriptions, Prescription } from 'src/app/shared/models/prescriptions';
import { PrescriptionDetailsModalComponent } from '../prescription-details-modal/prescription-details-modal.component';

@Component({
  selector: 'app-prescriptions-screen',
  templateUrl: './prescriptions-screen.component.html',
  styleUrls: ['./prescriptions-screen.component.scss']
})
export class PrescriptionsScreenComponent implements OnInit {

  faInfo = faInfoCircle;

  prescriptions: IPatientPrescriptions | undefined;
  
  cannotFetchPrescriptions = false;

  constructor(
    private readonly authService: AuthService,
    private readonly dialog: MatDialog,
    private readonly patientsService: PatientService
  ) { 
  }

  ngOnInit(): void {

    const patientEmail = this.authService.currentUser();

    this.patientsService.get(patientEmail).subscribe(
      (res) => {
        this.prescriptions = res.prescriptions;
      }
    );
  }

  getActivePrescriptions(): Prescription[] {
    return this.prescriptions?.current ?? [];
  }

  getExpiredPrescriptions(): Prescription[] {
    return this.prescriptions?.previous ?? [];
  }

  showMore(selectedPrescription: Prescription) {

    this.dialog.open(PrescriptionDetailsModalComponent, {
      data: {
        prescription: selectedPrescription
      }
    });
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '@services/auth.service';
import { PrescriptionsService } from '@services/prescriptions.service';
import { IPrescriptionRequest } from '@shared/models/prescriptions';
import { PrescriptionRequestModalComponent } from '@shared/prescription-request-modal/prescription-request-modal.component';
import { CreatePrescriptionModalComponent } from '../create-prescription-modal/create-prescription-modal.component';
import { ScheduleBloodTestModalComponent } from '../schedule-blood-test-modal/schedule-blood-test-modal.component';

@Component({
  selector: 'app-gpdashboard',
  templateUrl: './gpdashboard.component.html',
  styleUrls: ['./gpdashboard.component.scss']
})
export class GPDashboardComponent implements OnInit {

  readonly displayedColumns = ['requestDate', 'drugName', 'pharmacistEmail', 'patientEmail', 'status', 'details', 'requestBloodTest'];
  dataSource!: MatTableDataSource<IPrescriptionRequest>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(
    private readonly dialog: MatDialog,
    private readonly prescriptionsService: PrescriptionsService,
    private readonly authService: AuthService,
    private readonly snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    const userEmail = this.authService.currentUser();

    if (userEmail == null) {
      // todo: remove when route guards are added
      return;
    }

    this.prescriptionsService.getPrescriptionRequests(userEmail).subscribe(
      (res) => {
        setTimeout(() => {

          this.dataSource = new MatTableDataSource<IPrescriptionRequest>(res);
                
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }, 5);
      },
      (err) => {

        if (err?.status != 404) {
          this.snackBar.open("Could not retrieve prescription requests. Please try again later.", 'Dismiss');
        }
      });
  }
   
  showPrescriptionDetails(prescriptionRequest: IPrescriptionRequest) {
     this.dialog.open(PrescriptionRequestModalComponent, {
      data: {
        prescriptionRequest
       },
       minWidth: '400px'
    });
  }

  createPrescriptionRequest() {
    this.dialog.open(CreatePrescriptionModalComponent, {
      minWidth: '400px'
    });
  }

  scheduleBloodTest(patientEmail: string) { 
    this.dialog.open(ScheduleBloodTestModalComponent, {
      minWidth: '400px',
      data: {
        patientEmail
      }
    });
  }
}

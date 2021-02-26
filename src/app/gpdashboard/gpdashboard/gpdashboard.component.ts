import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IPrescriptionRequest, PrescriptionRequestStatuses } from '@shared/models/prescriptions';
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

  constructor(private readonly dialog: MatDialog) { }

  ngOnInit(): void {

    const mockPrescriptionRequests: IPrescriptionRequest[] = [
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

    setTimeout(() => {
      this.dataSource = new MatTableDataSource<IPrescriptionRequest>(mockPrescriptionRequests);
      
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, 5);
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

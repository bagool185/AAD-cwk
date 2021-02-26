import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IPrescriptionRequest, PrescriptionRequestStatuses } from '@shared/models/prescriptions';
import { PrescriptionRequestModalComponent } from '@shared/prescription-request-modal/prescription-request-modal.component';

@Component({
  selector: 'app-gpdashboard',
  templateUrl: './gpdashboard.component.html',
  styleUrls: ['./gpdashboard.component.scss']
})
export class GPDashboardComponent implements OnInit {

  readonly displayedColumns = ['requestDate', 'drugName', 'pharmacistEmail', 'patientEmail', 'status', 'details'];
  dataSource!: MatTableDataSource<IPrescriptionRequest>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(private readonly dialog: MatDialog) { }

  ngOnInit(): void {

    const mockPrescriptionRequests: IPrescriptionRequest[] = [
      {
        dose: 'Scopolamine',
        drugName: '12321',
        endDate: '12321321',
        id: 12321,
        instructions: 'adssadasdas',
        nextPickUp: '123213',
        patientEmail: '1321321',
        pharmacistEmail: '12321321',
        requestDate: '12321312',
        status: PrescriptionRequestStatuses.Accepted
      },
            {
        dose: '213',
        drugName: '1125214512321',
        endDate: '12334213321321',
        id: 12321,
        instructions: 'asdas',
        nextPickUp: '2132',
        patientEmail: '21312',
        pharmacistEmail: '123',
        requestDate: '12312',
        status: PrescriptionRequestStatuses.Pending
      },
                  {
        dose: '12321',
        drugName: 'asdas',
        endDate: '12321321',
        id: 12321,
        instructions: 'adssadasdas',
        nextPickUp: '125',
        patientEmail: '123',
        pharmacistEmail: '123',
        requestDate: '242',
        status: PrescriptionRequestStatuses.Denied
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

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatedTabHeader } from '@angular/material/tabs/paginated-tab-header';
import { IPrescriptionRequest, PrescriptionRequestStatuses } from '@shared/models/prescriptions';

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
        dose: '123',
        drugName: '12321',
        endDate: '12321321',
        id: 12321,
        instructions: 'adssadasdas',
        nextPickUp: '123213',
        patientEmail: '1321321',
        pharmacistEmail: '12321321',
        requestDate: '12321312',
        status: PrescriptionRequestStatuses.Accepted
      }
    ];

    this.dataSource = new MatTableDataSource<IPrescriptionRequest>(mockPrescriptionRequests);
    
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  showPrescriptionDetails(prescriptionRequest: IPrescriptionRequest) {
    // todo
  }

}

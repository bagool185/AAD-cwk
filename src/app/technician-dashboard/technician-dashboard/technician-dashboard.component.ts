import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmModalComponent } from '@shared/confirm-modal/confirm-modal.component';
import { IPickUp } from '@shared/models/medication';
import { PrescriptionDetailsModalComponent } from 'src/app/prescriptions-screen/prescription-details-modal/prescription-details-modal.component';

@Component({
  selector: 'app-technician-dashboard',
  templateUrl: './technician-dashboard.component.html',
  styleUrls: ['./technician-dashboard.component.scss']
})
export class TechnicianDashboardComponent implements OnInit {

  readonly displayedColumns = ['requestDate', 'prescriptionId', 'patientEmail', 'prescriptionDetails', 'confirmPickup'];
  dataSource!: MatTableDataSource<object>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  constructor(private readonly dialog: MatDialog) { }

  ngOnInit(): void {
    const mockPickUps: object[] = [
      {
        patientEmail: 'tpratchett@gmail.com',
        patientPrescription: {
          current: [{
            dose: '20mg',
            drugName: 'Scopolamine',
            gpData: ['mygp@gmail.com'],
            instructions: 'Take one a day',
            endDate: '10/05/2022',
            startDate: '5/05/2021',
            id: 1232
          }],
          previous: []
        },
        requestDate: '23/02/2021'
      },
      {
        patientEmail: 'ptrapchepp@gmail.com',
        patientPrescription: {
          current: [{
            dose: '20mg',
            drugName: 'Hydrocodone',
            gpData: ['gmartin@gmail.com'],
            instructions: 'Take one a day',
            endDate: '16/04/2021',
            startDate: '1/01/2021',
            id: 1235
          }],
          previous: []
        },
        requestDate: '21/02/2021'
      }
    ];

      setTimeout(() => {
        this.dataSource = new MatTableDataSource<object>(mockPickUps);
        
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, 5);
  }

  showPrescriptionDetails(pickUp: any) {
    this.dialog.open(PrescriptionDetailsModalComponent, {
      data: {
        prescription: pickUp.patientPrescription.current[0]
      }
    });
  }

  confirmPickUp(pickUp: any) {
    const prescriptionID = pickUp.patientPrescription.current[0].id;
    
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: `Pick-up prescription #${prescriptionID}`,
        question: `Are you sure you want to confirm the pick-up for prescription #${prescriptionID}`
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res['confirmed'] === true) {
        // todo confirm pick-up
      }
      else {
        // todo abort
      }
    });
  }
}

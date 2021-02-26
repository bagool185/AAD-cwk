import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IPickUp } from '@shared/models/medication';
import { PrescriptionDetailsModalComponent } from 'src/app/prescriptions-screen/prescription-details-modal/prescription-details-modal.component';
import { ConfirmPickUpModalComponent } from '../confirm-pick-up-modal/confirm-pick-up-modal.component';

@Component({
  selector: 'app-technician-dashboard',
  templateUrl: './technician-dashboard.component.html',
  styleUrls: ['./technician-dashboard.component.scss']
})
export class TechnicianDashboardComponent implements OnInit {

  readonly displayedColumns = ['requestDate', 'prescriptionId', 'patientEmail', 'prescriptionDetails', 'confirmPickup'];
  dataSource!: MatTableDataSource<IPickUp>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  constructor(private readonly dialog: MatDialog) { }

  ngOnInit(): void {
    const mockPickUps: IPickUp[] = [
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
        this.dataSource = new MatTableDataSource<IPickUp>(mockPickUps);
        
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, 5);
  }

  showPrescriptionDetails(pickUp: IPickUp) {
    this.dialog.open(PrescriptionDetailsModalComponent, {
      data: {
        prescription: pickUp.patientPrescription.current[0]
      }
    });
  }

  confirmPickUp(pickUp: IPickUp) {
    this.dialog.open(ConfirmPickUpModalComponent, {
      data: {
        pickUp
      },
      minWidth: '400px'
    });
  }


}

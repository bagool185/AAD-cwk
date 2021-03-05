import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '@services/auth.service';
import { GpService } from '@services/gp.service';
import { PatientService } from '@services/patient.service';
import { ConfirmModalComponent } from '@shared/confirm-modal/confirm-modal.component';
import { Patient } from '@shared/models/user';
import { AddPatientModalComponent } from '../add-patient-modal/add-patient-modal.component';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  patients!: Patient[];

  dataSource!: MatTableDataSource<Patient>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  displayedColumns = ['fullName', 'unassign']

  constructor(
    private readonly gpService: GpService,
    private readonly patientService: PatientService,
    private readonly authService: AuthService,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.patientService.getAll().subscribe(
      (res) => {
        this.patients = res.data;

        setTimeout(() => {
          this.dataSource = new MatTableDataSource<Patient>(this.patients);
          
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }, 5);
      },
      (err) => {
      }
    )

    // TODO: uncomment when service is fixed
    // this.gpService.getPatients(this.authService.currentUser()).subscribe(
    // (res) => {
    //     this.patients = res.data;
    //     console.log(this.patients);
    //   },
    //   (err) => {
    //     if (err.status === 404) {
    //       this.patients = [];
    //     }
    // });
  }

  addPatient() {
    const dialogRef = this.dialog.open(AddPatientModalComponent, {
      data: {
        patients: this.patients
      },
      minWidth: '400px'
    });

    dialogRef.afterClosed().subscribe((res) => {

      const newPatient: Patient = res?.selectedPatient;

      if (newPatient != null) {
        this.gpService.assignPatientToGP(newPatient.email, this.authService.currentUser()).subscribe((res) => {
          this.patients.push(newPatient);
        });
      }
    });
  }

  unassignPatient(patient: Patient) {

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: `Unassign patient ${patient.firstName} ${patient.lastName}`,
        question: `Are you sure you want to unassign  ${patient.firstName} ${patient.lastName}`
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res?.confirmed) {
        this.gpService.dissociatePatientFromGP(patient.email, this.authService.currentUser()).subscribe(
          (res) => {
            this.patients = this.patients.filter(p => p.email !== patient.email);
          }
        );
      }
    });
  }
}

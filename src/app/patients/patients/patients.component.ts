import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '@services/auth.service';
import { GpService } from '@services/gp.service';
import { ConfirmModalComponent } from '@shared/confirm-modal/confirm-modal.component';
import { Patient } from '@shared/models/user';
import { AddPatientModalComponent } from '../add-patient-modal/add-patient-modal.component';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  patients!: string[];

  dataSource!: MatTableDataSource<string>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  displayedColumns = ['email', 'unassign']

  constructor(
    private readonly gpService: GpService,
    private readonly authService: AuthService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.gpService.getPatients(this.authService.currentUser()).subscribe(
    (res) => {
        this.patients = res.data;

        this.renderTable();
      },
      (err) => {
        if (err.status === 404) {
          this.patients = [];
        }
    });
  }

  private renderTable() {
      setTimeout(() => {
          this.dataSource = new MatTableDataSource<string>(this.patients);
          
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }, 5);
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
        this.gpService.assignPatientToGP(newPatient.email, this.authService.currentUser()).subscribe(
          (res) => {
            this.patients.push(newPatient.email);
            this.renderTable();
          },
          (err) => {
            if (err?.status === 400) {
              this.snackBar.open(`Patient with email ${newPatient.email} is already assigned to you`,
                'Dismiss', { duration: 5000 });
            }
          }
        );
      }
    });
  }

  unassignPatient(patientEmail: string) {

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: `Unassign patient ${patientEmail}`,
        question: `Are you sure you want to unassign ${patientEmail}`
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res?.confirmed) {
        this.gpService.dissociatePatientFromGP(patientEmail, this.authService.currentUser()).subscribe(
          (res) => {
            this.patients = this.patients.filter(p => p !== patientEmail);
            this.renderTable();
          }
        );
      }
    });
  }
}

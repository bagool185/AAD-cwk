import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientService } from '@services/patient.service';
import { Patient } from '@shared/models/user';

@Component({
  selector: 'app-add-patient-modal',
  templateUrl: './add-patient-modal.component.html',
  styleUrls: ['./add-patient-modal.component.scss']
})
export class AddPatientModalComponent implements OnInit {

  patients!: Patient[];

  selectedPatient!: Patient;

  constructor(
    private readonly dialogRef: MatDialogRef<AddPatientModalComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: { patients: Patient[] },
    private readonly patientService: PatientService
  )  
  { }


  ngOnInit(): void {
    this.patientService.getAll().subscribe(
      (res) => {
        this.patients = res.data.filter(p => this.data.patients.find(_ =>  _.email === p.email) == undefined);

        for (const patient of res.data) {
          this.data.patients.find(p => p.email === patient.email);
        }

        this.patients = res.data.filter(p => p.email )
      }
    )
  }

  save() {
    this.dialogRef.close({
      selectedPatient: this.selectedPatient
    })
  }

  close() {
    this.dialogRef.close();
  }

}

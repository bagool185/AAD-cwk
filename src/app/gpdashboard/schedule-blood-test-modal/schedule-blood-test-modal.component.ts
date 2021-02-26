import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-schedule-blood-test-modal',
  templateUrl: './schedule-blood-test-modal.component.html',
  styleUrls: ['./schedule-blood-test-modal.component.scss']
})
export class ScheduleBloodTestModalComponent implements OnInit {

  patientEmail!: string; 
  bloodsForm!: FormGroup;

  constructor(
    private readonly dialogRef: MatDialogRef<ScheduleBloodTestModalComponent>,
    private readonly formBuilder: FormBuilder,
     @Inject(MAT_DIALOG_DATA) private readonly data: { patientEmail: string }) { 
  }

  ngOnInit(): void {
    console.log(this.data);
    this.patientEmail = this.data.patientEmail;
    this.bloodsForm = this.formBuilder.group({
      date: ['', Validators.required]
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close({
      date: this.bloodsForm.get('date')?.value
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IPrescriptionRequest } from '@shared/models/prescriptions';

@Component({
  selector: 'app-create-prescription-modal',
  templateUrl: './create-prescription-modal.component.html',
  styleUrls: ['./create-prescription-modal.component.scss']
})
export class CreatePrescriptionModalComponent implements OnInit {

  prescriptionRequestForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<CreatePrescriptionModalComponent>) { 
  }

  ngOnInit(): void {

    this.prescriptionRequestForm = this.formBuilder.group({
      patientEmail: ["", Validators.required],
      pharmacistEmail: ["", Validators.required],
      drugName: ["", Validators.required],
      dose: ["", Validators.required],
      instructions: ["", Validators.required],
      endDate: ["", Validators.required]
    });
  }

  save() {
    this.dialogRef.close(this.prescriptionRequestForm.value);
  }

  close() {
    this.dialogRef.close();
  }

}

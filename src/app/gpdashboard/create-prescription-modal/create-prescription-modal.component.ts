import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@services/auth.service';
import { GpService } from '@services/gp.service';

@Component({
  selector: 'app-create-prescription-modal',
  templateUrl: './create-prescription-modal.component.html',
  styleUrls: ['./create-prescription-modal.component.scss']
})
export class CreatePrescriptionModalComponent implements OnInit {

  prescriptionRequestForm!: FormGroup;
  patients: string[];
  pharmacists: string[];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly gpService: GpService,
    private readonly authService: AuthService,
    private readonly dialogRef: MatDialogRef<CreatePrescriptionModalComponent>) { 
  
    this.patients = [];
    this.pharmacists = [];
  }

  ngOnInit(): void {

    this.initForm();

    // get associated patients
    this.gpService.getPatients(this.authService.currentUser()).subscribe(
      (res) => {
        this.patients = res.data;
      },
      (err) => {
        if (err.status === 404) {
          this.patients = [];
        }
      }
    );

    // get associated pharmacists?

   
  }

  private initForm() {
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

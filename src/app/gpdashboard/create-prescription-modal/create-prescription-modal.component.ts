import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@services/auth.service';
import { DrugsService } from '@services/drugs.service';
import { GpService } from '@services/gp.service';
import { PharmacistsService } from '@services/pharmacists.service';
import { IDrug } from '@shared/models/medication';
import { IPharmacist } from '@shared/models/pharmacist';
import { IPrescriptionRequest } from '@shared/models/prescriptions';
import { convertToShortDate } from '@shared/utils/date.util';

@Component({
  selector: 'app-create-prescription-modal',
  templateUrl: './create-prescription-modal.component.html',
  styleUrls: ['./create-prescription-modal.component.scss']
})
export class CreatePrescriptionModalComponent implements OnInit {

  prescriptionRequestForm!: FormGroup;
  patients: string[];
  pharmacists: IPharmacist[];
  drugs!: IDrug[];
  gpEmail!: string;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly gpService: GpService,
    private readonly pharmacistService: PharmacistsService,
    private readonly authService: AuthService,
    private readonly drugService: DrugsService,
    private readonly dialogRef: MatDialogRef<CreatePrescriptionModalComponent>) { 
  
    this.patients = [];
    this.pharmacists = [];
  }

  ngOnInit(): void {

    this.initForm();

    this.gpEmail = this.authService.currentUser();

    this.gpService.getPatients(this.gpEmail).subscribe(
      (res) => {
        this.patients = res.data;
      },
      (err) => {
        if (err.status === 404) {
          this.patients = [];
        }
      }
    );

    this.pharmacistService.getAll().subscribe(
      (res) => {
        this.pharmacists = res.data;
      },
      (err) => {
        if (err.status === 404) {
          this.pharmacists = [];
        }
      }
    );

    this.drugService.getAll().subscribe(
      (res) => {
        this.drugs = res.data;
      },
      (err) => {
        if (err.status === 404) {
          this.drugs = [];
        }
      }
    )
  }

  private initForm() {
     this.prescriptionRequestForm = this.formBuilder.group({
      patientEmail: ["", Validators.required],
      pharmacistEmail: ["", Validators.required],
      drugName: ["", Validators.required],
      dose: ["", Validators.required],
      instructions: ["", Validators.required],
      endDate: ["", Validators.required],
      nextPickUp: ["", Validators.required],
    });
  }

  save() {

    let prescriptionRequest: IPrescriptionRequest = this.prescriptionRequestForm.value;
    prescriptionRequest.GPEmail = this.gpEmail;
    prescriptionRequest.endDate = convertToShortDate(prescriptionRequest.endDate);
    prescriptionRequest.nextPickUp = convertToShortDate(prescriptionRequest.nextPickUp);

    console.log(prescriptionRequest);
    this.dialogRef.close(prescriptionRequest);
  }

  close() {
    this.dialogRef.close();
  }

}

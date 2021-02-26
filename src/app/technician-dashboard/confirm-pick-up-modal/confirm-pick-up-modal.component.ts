import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPickUp } from '@shared/models/medication';

@Component({
  selector: 'app-confirm-pick-up-modal',
  templateUrl: './confirm-pick-up-modal.component.html',
  styleUrls: ['./confirm-pick-up-modal.component.scss']
})
export class ConfirmPickUpModalComponent implements OnInit {

  pickUp!: IPickUp;

  constructor(
    public dialogRef: MatDialogRef<ConfirmPickUpModalComponent>,
     @Inject(MAT_DIALOG_DATA) private readonly data: { pickUp: IPickUp }) { 
  }

  ngOnInit(): void {
    this.pickUp = this.data.pickUp;

    this.pickUp.patientPrescription.current[0].id
  }

  getPrescriptionID() {
    return this.pickUp.patientPrescription.current[0].id;
  }

  confirm() {
    this.dialogRef.close({
      confirmPickUp: true
    });
  }

  close() {
    this.dialogRef.close();
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPrescriptionRequest } from '@shared/models/prescriptions';

@Component({
  selector: 'app-accept-prescription-modal',
  templateUrl: './accept-prescription-modal.component.html',
  styleUrls: ['./accept-prescription-modal.component.scss']
})
export class AcceptPrescriptionModalComponent implements OnInit {

  prescriptionRequest!: IPrescriptionRequest;

  constructor(
    public dialogRef: MatDialogRef<AcceptPrescriptionModalComponent>,
     @Inject(MAT_DIALOG_DATA) private readonly data: { prescriptionRequest: IPrescriptionRequest }) { 
    }

  ngOnInit(): void {
    this.prescriptionRequest = this.data.prescriptionRequest;
  }

  accept() {
    this.dialogRef.close({
      accepted: true
    });
  }

  close() {
    this.dialogRef.close();
  }

}

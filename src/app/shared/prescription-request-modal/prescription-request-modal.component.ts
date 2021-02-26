import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPrescriptionRequest } from '@shared/models/prescriptions';

@Component({
  selector: 'app-prescription-request-modal',
  templateUrl: './prescription-request-modal.component.html',
  styleUrls: ['./prescription-request-modal.component.scss']
})
export class PrescriptionRequestModalComponent implements OnInit {

  prescriptionRequest!: IPrescriptionRequest;  

  constructor(
    public dialogRef: MatDialogRef<PrescriptionRequestModalComponent>,
     @Inject(MAT_DIALOG_DATA) private readonly data: { prescriptionRequest: IPrescriptionRequest }) { 
  }

  ngOnInit(): void {
    this.prescriptionRequest = this.data.prescriptionRequest;
  }

  close() {
    this.dialogRef.close();
  }
}

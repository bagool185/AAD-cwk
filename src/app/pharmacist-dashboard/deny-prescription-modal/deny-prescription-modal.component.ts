import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPrescriptionRequest } from '@shared/models/prescriptions';

@Component({
  selector: 'app-deny-prescription-modal',
  templateUrl: './deny-prescription-modal.component.html',
  styleUrls: ['./deny-prescription-modal.component.scss']
})
export class DenyPrescriptionModalComponent implements OnInit {

  prescriptionRequest!: IPrescriptionRequest;
  @Input() reason!: string;
  
  constructor(
    public dialogRef: MatDialogRef<DenyPrescriptionModalComponent>,
     @Inject(MAT_DIALOG_DATA) private readonly data: { prescriptionRequest: IPrescriptionRequest }) { 
    }

  ngOnInit(): void {
    this.reason = "";
    this.prescriptionRequest = this.data.prescriptionRequest;
  }

  deny() {
    this.dialogRef.close({
      denied: true
    });
  }

  close(): void {
    this.dialogRef.close();
  }

}

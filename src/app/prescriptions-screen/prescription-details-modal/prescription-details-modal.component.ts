import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Prescription } from '@shared/models/prescriptions';

@Component({
  selector: 'app-prescription-details-modal',
  templateUrl: './prescription-details-modal.component.html',
  styleUrls: ['./prescription-details-modal.component.scss']
})
export class PrescriptionDetailsModalComponent implements OnInit {

  prescription!: Prescription;

  faTimesCircle = faTimesCircle;

   constructor(
    public dialogRef: MatDialogRef<PrescriptionDetailsModalComponent>,
     @Inject(MAT_DIALOG_DATA) private readonly data: { prescription: Prescription }) { 
    }


  ngOnInit(): void {
    this.prescription = this.data.prescription;
  }

  close(): void {
    this.dialogRef.close();
  }
}

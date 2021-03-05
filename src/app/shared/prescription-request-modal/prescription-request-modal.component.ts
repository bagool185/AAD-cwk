import { RepositionScrollStrategy } from '@angular/cdk/overlay';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DrugsService } from '@services/drugs.service';
import { IDrug } from '@shared/models/medication';
import { IPrescriptionRequest } from '@shared/models/prescriptions';

@Component({
  selector: 'app-prescription-request-modal',
  templateUrl: './prescription-request-modal.component.html',
  styleUrls: ['./prescription-request-modal.component.scss']
})
export class PrescriptionRequestModalComponent implements OnInit {

  prescriptionRequest!: IPrescriptionRequest;  
  drugData: IDrug | undefined; 

  constructor(
    private readonly dialogRef: MatDialogRef<PrescriptionRequestModalComponent>,
    private readonly drugsService: DrugsService,
     @Inject(MAT_DIALOG_DATA) private readonly data: { prescriptionRequest: IPrescriptionRequest }) { 
  }

  ngOnInit(): void {
    this.prescriptionRequest = this.data.prescriptionRequest;
  
    this.drugsService.getAll().subscribe((res) => {
      
      this.drugData = res.data.find(d => d.drugName === this.prescriptionRequest.drugName);
      console.log(this.drugData?.bloodsRequired[0].result);
      console.log(this.drugData?.bloodsRequired)
    });
  }

  close() {
    this.dialogRef.close();
  }
}

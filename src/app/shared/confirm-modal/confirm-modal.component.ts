import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  question: string = '';
  title: string = '';

  // TODO - add optional confirm / close text

  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
     @Inject(MAT_DIALOG_DATA) private readonly data: { title: string, question: string }) { 
  }

  ngOnInit(): void {
    this.question = this.data.question;
    this.title = this.data.title;
  }


  confirm() {
    this.dialogRef.close({
      confirmed: true
    });
  }

  close() {
    this.dialogRef.close({
      confirmed: false
    });
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from '@shared/models/user';

@Component({
  selector: 'app-confirm-user-deletion-modal',
  templateUrl: './confirm-user-deletion-modal.component.html',
  styleUrls: ['./confirm-user-deletion-modal.component.scss']
})
export class ConfirmUserDeletionModalComponent implements OnInit {

  user!: IUser;

  constructor(
    private readonly dialogRef: MatDialogRef<ConfirmUserDeletionModalComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: { user: IUser }) {
  }

  ngOnInit() {
    this.user = this.data.user;
  }

  delete() {
    this.dialogRef.close({
      delete: true
    });
  }

  close() {
    this.dialogRef.close();
  }
}


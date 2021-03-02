import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmModalComponent } from '@shared/confirm-modal/confirm-modal.component';
import { IUser, UserTypes } from '@shared/models/user';
import { ConfirmUserDeletionModalComponent } from './confirm-user-deletion-modal/confirm-user-deletion-modal.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {


  readonly displayedColumns = ['email', 'fullName', 'userType', 'delete'];
  dataSource!: MatTableDataSource<IUser>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(private readonly dialog: MatDialog) { }

  ngOnInit(): void {

    const mockUsers: IUser[] = [
      {
        email: 'mockemail@gmail.com',
        firstName: 'John',
        lastName: 'Doe',
        type: UserTypes.GP
      },
      {
        email: 'anothermockemail@gmail.com',
        firstName: 'Jane',
        lastName: 'Doe',
        type: UserTypes.Patient
      }
    ];

    setTimeout(() => {
      this.dataSource = new MatTableDataSource<IUser>(mockUsers);
      
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, 5);
  }

  deleteUser(user: IUser) {
    this.dialog.open(ConfirmModalComponent, {
      data: {
        title: 'Confirm user deletion',
        question: `Are you sure you want to delete user with email ${user.email}?`
      },
      minWidth: '400px'
    })
  }
}

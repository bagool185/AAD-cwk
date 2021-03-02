import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Patient } from '@shared/models/user';

@Component({
  selector: 'app-patients-screen',
  templateUrl: './patients-screen.component.html',
  styleUrls: ['./patients-screen.component.scss']
})
export class PatientsScreenComponent implements OnInit {

  readonly displayedColumns = ['fullName', 'delete', 'seeMore'];
  dataSource!: MatTableDataSource<Patient>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;


  constructor() { 

    setTimeout(() => {
      this.dataSource = new MatTableDataSource<Patient>([]);
      
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, 5);

  }

  ngOnInit(): void {
  }

  deleteUser(patient: Patient) {
    // todo - launch modal
  }

}

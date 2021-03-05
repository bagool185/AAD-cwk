import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GpService } from '@services/gp.service';
import { PatientService } from '@services/patient.service';
import { PharmacistsService } from '@services/pharmacists.service';
import { TechniciansService } from '@services/technicians.service';
import { UserService } from '@services/user.service';
import { ConfirmModalComponent } from '@shared/confirm-modal/confirm-modal.component';
import { IPharmacist } from '@shared/models/pharmacist';
import { GP, IUser, Patient, UserTypes } from '@shared/models/user';
import { isUnionTypeNode } from 'typescript';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {


  readonly displayedColumns = ['email', 'fullName', 'userType', 'delete'];
  dataSource!: MatTableDataSource<IUser>;

  pharmacists!: IUser[];
  patients!: IUser[];
  gps!: IUser[];
  technicians!: IUser[];

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(
    private readonly dialog: MatDialog,
    private readonly pharmacistsSerivce: PharmacistsService,
    private readonly gpService: GpService,
    private readonly patientService: PatientService,
    private readonly technicianService: TechniciansService,
  ) { }

  ngOnInit(): void {

    this.pharmacistsSerivce.getAll().subscribe((res) => {
      this.pharmacists = res.data.map(r => {
        return {
          email: r.email,
          firstName: r.firstName,
          lastName: r.lastName,
          type: UserTypes.Pharmacist
        };
      });

      this.technicianService.getAll().subscribe((res) => {
        this.technicians = res.data.map(r => {
          return {
            email: r.email,
            firstName: r.firstName,
            lastName: r.lastName,
            type: UserTypes.Technician
          };
        });

        this.patientService.getAll().subscribe((res) => {
          this.patients = res.data.map(r => {
            return {
              email: r.email,
              firstName: r.firstName,
              lastName: r.lastName,
              type: UserTypes.Patient
            };
          });

          this.gpService.getAll().subscribe((res) => {
            this.gps = res.data.map(r => {
              return {
                email: r.email,
                firstName: r.firstName,
                lastName: r.lastName,
                type: UserTypes.GP
              };
            });

            let users: IUser[] = [];
            users = users.concat(this.pharmacists);
            users = users.concat(this.technicians);
            users = users.concat(this.gps);
            users = users.concat(this.patients);

            setTimeout(() => {
              this.dataSource = new MatTableDataSource<IUser>(users);
            
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
            }, 5);
          });
        });

      });
    });
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

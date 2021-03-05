import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '@services/auth.service';
import { PrescriptionsService } from '@services/prescriptions.service';
import { IPrescriptionRequest, PrescriptionRequestStatuses } from '@shared/models/prescriptions';
import { PrescriptionRequestModalComponent } from '@shared/prescription-request-modal/prescription-request-modal.component';
import { CreatePrescriptionModalComponent } from '../create-prescription-modal/create-prescription-modal.component';
import { ScheduleBloodTestModalComponent } from '../schedule-blood-test-modal/schedule-blood-test-modal.component';

@Component({
  selector: 'app-gpdashboard',
  templateUrl: './gpdashboard.component.html',
  styleUrls: ['./gpdashboard.component.scss']
})
export class GPDashboardComponent implements OnInit, AfterViewInit {

  readonly displayedColumns = ['requestDate', 'drugName', 'pharmacistEmail', 'patientEmail', 'status', 'details', 'requestBloodTest'];
  dataSource!: MatTableDataSource<IPrescriptionRequest>;

  prescriptionRequests!: IPrescriptionRequest[];

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(
    private readonly dialog: MatDialog,
    private readonly prescriptionsService: PrescriptionsService,
    private readonly authService: AuthService,
    private readonly snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    const userEmail = this.authService.currentUser();

    if (userEmail == null) {
      // todo: remove when route guards are added
      return;
    }


    this.prescriptionsService.getPrescriptionRequests(userEmail).subscribe(
      (res) => {
        this.prescriptionRequests = res.data.pending.map(p => {
          p.status = PrescriptionRequestStatuses.Pending
          return p
        });

        this.prescriptionRequests.concat(res.data.processed.map(p => {
          p.status = PrescriptionRequestStatuses.Processed
          return p;
        }));

        this.renderTable();

      },
      (err) => {

        if (err?.status != 404) {
          this.prescriptionRequests = [];
        }
      });
  }
   
  showPrescriptionDetails(prescriptionRequest: IPrescriptionRequest) {
     this.dialog.open(PrescriptionRequestModalComponent, {
      data: {
        prescriptionRequest
       },
       minWidth: '400px'
    });
  }

  ngAfterViewInit() {
    this.renderTable();
  }

  private renderTable() {
    setTimeout(() => {
      this.dataSource = new MatTableDataSource<IPrescriptionRequest>(this.prescriptionRequests);
            
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, 5);
  }

  createPrescriptionRequest() {
    const dialogRef = this.dialog.open(CreatePrescriptionModalComponent, {
      minWidth: '400px'
    });

    dialogRef.afterClosed().subscribe(
      (dialogRes) => {
        if (dialogRes != null) {
          this.prescriptionsService.createPrescriptionRequest(dialogRes).subscribe(
            (res) => {
              this.prescriptionRequests.push(dialogRes);
              this.renderTable();
            },
            (err) => {
              if (err?.status === 400) {
                this.snackBar.open(`Drug not in store.`, 'Dismiss', {duration: 5000})
              }
              console.log(err);
            }
          )
        }
      }
    )
  }

  scheduleBloodTest(patientEmail: string) { 
    this.dialog.open(ScheduleBloodTestModalComponent, {
      minWidth: '400px',
      data: {
        patientEmail
      }
    });
  }
}

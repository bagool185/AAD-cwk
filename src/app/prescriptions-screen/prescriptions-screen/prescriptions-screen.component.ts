import { Component, OnInit } from '@angular/core';
import { faInfo, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';
import { IPatientPrescriptions, Prescription } from 'src/app/shared/models/prescriptions';

@Component({
  selector: 'app-prescriptions-screen',
  templateUrl: './prescriptions-screen.component.html',
  styleUrls: ['./prescriptions-screen.component.scss']
})
export class PrescriptionsScreenComponent implements OnInit {

  faInfo = faInfoCircle;

  prescriptions: IPatientPrescriptions | undefined;
  cannotFetchPrescriptions = false;

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService) { 
  }

  ngOnInit(): void {
    const userEmail = this.authService.currentUser();

        this.prescriptions = {
            current: [{
              dose: '100mg',
              drugName: 'Vicodinq',
              gpData: ['examplegp@nhs.co.uk', ''],
              id: 2,
              instructions: 'Take 3 tablets daily',
              startDate: '16/02/2021',
              endDate: '16/03/2021'
            }],

            previous: [{
              dose: '50mg',
              drugName: 'Vicodinq',
              gpData: ['examplegp@nhs.co.uk', ''],
              id: 1,
              instructions: 'Take 3 tablets daily',
              startDate: '16/01/2021',
              endDate: '16/02/2021'
            }]
          };

    if (userEmail !== '') {
      this.userService.getPatient(userEmail).subscribe(
        (res) => {
          this.prescriptions = res.data.prescriptions;

      
        },
        (err) => {
          this.cannotFetchPrescriptions = true;
        }
      );
    }
  }

  getActivePrescriptions(): Prescription[] {
    return this.prescriptions?.current ?? [];
  }

  getExpiredPrescriptions(): Prescription[] {
    return this.prescriptions?.previous ?? [];
  }

  showMore() {
    //TODO: open dialog
  }

}

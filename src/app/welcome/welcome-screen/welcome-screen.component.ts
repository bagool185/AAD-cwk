import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserTypes } from '@shared/models/user';
import { getRedirectRoute } from '@shared/utils/route-redirect.util';
import { AuthService } from 'src/app/core/services/auth.service';
import { emailPattern } from 'src/app/shared/utils/regex-patterns.util';


@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.scss']
})
export class WelcomeScreenComponent implements OnInit, OnDestroy {

  userFormGroup: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly snackbar: MatSnackBar,
    private readonly router: Router,
    @Inject(DOCUMENT) private readonly document: Document
  ) { 
    
    this.userFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      password: ['', Validators.required],
      userType: [UserTypes.Patient, Validators.required]
    });
  }

  ngOnInit(): void {
    this.document.body.classList.add('bodybg-colour');
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove('bodybg-colour');
  }

  getUserTypes() {
    return Object.values(UserTypes);
  }

  logIn() {
    if (this.userFormGroup.valid) {

      const email = this.userFormGroup.get('email')?.value;
      const password = this.userFormGroup.get('password')?.value;
      const userType = this.userFormGroup.get('userType')?.value;

      this.authService.logIn(email, password, userType).subscribe(
        (res) => {
          
          this.authService.setCurrentUser({
            email: email,
            type: userType
          });
          
          const redirectRoute = getRedirectRoute(userType);
          this.router.navigate([redirectRoute]);
        },
        (err) => {

          let errMessage = '';

          switch (err?.status) {
            case 400:
              errMessage = 'Invalid credentials. Please make sure you have selected the right user type.';
              break;
            case 404:
              errMessage = `A user with the email ${email} could not be found.`;
              break;
            default:
              errMessage = 'Could not process your request. Please try again later.'
              break;
          }

          this.snackbar.open(errMessage, 'Dismiss', { duration: 5000 });
        }
      );
    }
  }

}

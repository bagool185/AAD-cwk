import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserTypes } from '@shared/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { emailPattern } from 'src/app/shared/utils/regex-patterns.util';


@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.scss']
})
export class WelcomeScreenComponent implements OnInit, OnDestroy {

  userFormGroup: FormGroup;
  UserTypes = UserTypes;

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

  logIn() {
    if (this.userFormGroup.valid) {

      const email = this.userFormGroup.get('email')?.value;
      const password = this.userFormGroup.get('password')?.value;
      const userType = this.userFormGroup.get('userType')?.value;

      const isSuccessfulLogin = this.authService.logIn(email, password, userType); 
      
      if (isSuccessfulLogin) {
        switch (userType) {
          case UserTypes.GP:
            this.router.navigate(['/prescription-requests']);
            break;
          
          default:
            this.router.navigate(['/prescriptions']);
        }
      }
      else {
        this.snackbar.open('Invalid credentials', 'Dismiss', {
          duration: 5000
        });
      }
    }
  }

}

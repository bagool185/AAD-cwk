import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { IUser, UserTypes } from '@shared/models/user';
import { getRedirectRoute } from '@shared/utils/route-redirect.util';
import { PasswordConfirmationValidator } from 'src/app/core/validators/password-confirmation.validator';
import { emailPattern } from 'src/app/shared/utils/regex-patterns.util';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  userFormGroup: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    @Inject(DOCUMENT) private readonly document: Document
  ) { 
    
    this.userFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConf: ['', [Validators.required, Validators.minLength(6)]],
      userType: [UserTypes.Patient, Validators.required]
    },
    {
      validators: [PasswordConfirmationValidator('password', 'passwordConf')]
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

  register() {
    if (this.userFormGroup.invalid === false) {
      
      const user: IUser = this.userFormGroup.value;
      this.authService.register(user).subscribe(
        (res) => {
          this.authService.setCurrentUser(user);

          const redirectRoute = getRedirectRoute(user.type);
          this.router.navigate([redirectRoute]);
        },
        (err) => {
          const errMessage = (err?.status === 400) ?
            `An account with the email ${user.email} already exists.` : 'Could not process your request. Please try again later.';
          
          this.snackBar.open(errMessage, 'Dismiss', { duration: 5000 })
        }
      )
    }
  }
}

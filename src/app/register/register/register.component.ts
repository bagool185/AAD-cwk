import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserTypes } from '@shared/models/user';
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
    if (this.userFormGroup.invalid) {
      return;
    }
  }
}

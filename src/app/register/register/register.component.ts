import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordConfirmationValidator } from 'src/app/core/validators/password-confirmation.validator';
import { emailPattern } from 'src/app/shared/utils/regex-patterns.util';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userFormGroup: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) { 
    this.userFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      fullName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConf: ['', [Validators.required, Validators.minLength(6)]]
    },
    {
      validators: [PasswordConfirmationValidator('password', 'passwordConf')]
    });
  }

  ngOnInit(): void {
  }

  register() {
    if (this.userFormGroup.invalid) {
      return;
    }
  }
}

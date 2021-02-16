import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { emailPattern } from '@utils/regex-patterns.util';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.scss']
})
export class WelcomeScreenComponent implements OnInit {

  userFormGroup: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) { 
    this.userFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  logIn() {

  }

}

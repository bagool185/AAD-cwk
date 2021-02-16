import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { emailPattern } from 'src/app/shared/utils/regex-patterns.util';


@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.scss']
})
export class WelcomeScreenComponent implements OnInit {

  userFormGroup: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly snackbar: MatSnackBar,
    private readonly router: Router
  ) { 
    
    this.userFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  logIn() {
    if (this.userFormGroup.valid) {

      const email = this.userFormGroup.get('email')?.value;
      const password = this.userFormGroup.get('password')?.value;

      const userData = this.authService.logIn(email, password); 
      
      if (userData) {
        this.router.navigate(['/prescriptions']);
      }
      else {
        this.snackbar.open('Invalid credentials', 'Dismiss', {
          duration: 5000
        });
      }
    }
  }

}

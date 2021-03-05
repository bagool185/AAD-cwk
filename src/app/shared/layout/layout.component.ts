import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { UserTypes } from '@shared/models/user';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  navbarIsCollapsed = false;
  userType!: UserTypes;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService) { }

  ngOnInit(): void {
    this.userType = this.authService.currentUserType();
  }

  toggleNavbar() {
    this.navbarIsCollapsed = !this.navbarIsCollapsed;
  }

  isGP() {
    return this.userType === UserTypes.GP;
  }

  isPatient() {
    return this.userType === UserTypes.Patient;
  }

  isPharmacist() {
    return this.userType === UserTypes.Pharmacist;
  }

  isTechnician() {
    return this.userType === UserTypes.Technician;
  }

  logOut() {
    this.router.navigate(['/welcome']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  navbarIsCollapsed = false;

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  toggleNavbar() {
    this.navbarIsCollapsed = !this.navbarIsCollapsed;
  }

  logOut() {
    this.router.navigate(['/welcome']);
  }
}

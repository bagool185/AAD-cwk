import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [WelcomeScreenComponent],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class WelcomeModule { }

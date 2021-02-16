import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [WelcomeScreenComponent],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    SharedModule
  ]
})
export class WelcomeModule { }

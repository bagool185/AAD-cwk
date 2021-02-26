import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GPDashboardComponent } from './gpdashboard.component';

describe('GPDashboardComponent', () => {
  let component: GPDashboardComponent;
  let fixture: ComponentFixture<GPDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GPDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GPDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsScreenComponent } from './patients-screen.component';

describe('PatientsScreenComponent', () => {
  let component: PatientsScreenComponent;
  let fixture: ComponentFixture<PatientsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientsScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

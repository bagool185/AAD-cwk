import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptPrescriptionModalComponent } from './accept-prescription-modal.component';

describe('AcceptPrescriptionModalComponent', () => {
  let component: AcceptPrescriptionModalComponent;
  let fixture: ComponentFixture<AcceptPrescriptionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptPrescriptionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptPrescriptionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

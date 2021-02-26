import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenyPrescriptionModalComponent } from './deny-prescription-modal.component';

describe('DenyPrescriptionModalComponent', () => {
  let component: DenyPrescriptionModalComponent;
  let fixture: ComponentFixture<DenyPrescriptionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DenyPrescriptionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DenyPrescriptionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

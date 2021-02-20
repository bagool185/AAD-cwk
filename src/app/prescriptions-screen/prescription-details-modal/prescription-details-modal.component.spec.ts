import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionDetailsModalComponent } from './prescription-details-modal.component';

describe('PrescriptionDetailsModalComponent', () => {
  let component: PrescriptionDetailsModalComponent;
  let fixture: ComponentFixture<PrescriptionDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrescriptionDetailsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

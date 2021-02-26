import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionRequestModalComponent } from './prescription-request-modal.component';

describe('PrescriptionRequestModalComponent', () => {
  let component: PrescriptionRequestModalComponent;
  let fixture: ComponentFixture<PrescriptionRequestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrescriptionRequestModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

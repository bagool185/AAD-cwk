import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPickUpModalComponent } from './confirm-pick-up-modal.component';

describe('ConfirmPickUpModalComponent', () => {
  let component: ConfirmPickUpModalComponent;
  let fixture: ComponentFixture<ConfirmPickUpModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmPickUpModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPickUpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

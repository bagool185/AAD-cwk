import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmUserDeletionModalComponent } from './confirm-user-deletion-modal.component';

describe('ConfirmUserDeletionModalComponent', () => {
  let component: ConfirmUserDeletionModalComponent;
  let fixture: ComponentFixture<ConfirmUserDeletionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmUserDeletionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmUserDeletionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

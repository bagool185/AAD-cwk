import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleBloodTestModalComponent } from './schedule-blood-test-modal.component';

describe('ScheduleBloodTestModalComponent', () => {
  let component: ScheduleBloodTestModalComponent;
  let fixture: ComponentFixture<ScheduleBloodTestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleBloodTestModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleBloodTestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

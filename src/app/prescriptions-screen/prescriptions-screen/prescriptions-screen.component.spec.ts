import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionsScreenComponent } from './prescriptions-screen.component';

describe('PrescriptionsScreenComponent', () => {
  let component: PrescriptionsScreenComponent;
  let fixture: ComponentFixture<PrescriptionsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrescriptionsScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

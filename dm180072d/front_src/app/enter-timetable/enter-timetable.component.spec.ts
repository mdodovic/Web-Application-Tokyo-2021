import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterTimetableComponent } from './enter-timetable.component';

describe('EnterTimetableComponent', () => {
  let component: EnterTimetableComponent;
  let fixture: ComponentFixture<EnterTimetableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterTimetableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

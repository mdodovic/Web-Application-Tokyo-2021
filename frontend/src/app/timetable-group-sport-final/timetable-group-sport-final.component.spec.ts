import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableGroupSportFinalComponent } from './timetable-group-sport-final.component';

describe('TimetableGroupSportFinalComponent', () => {
  let component: TimetableGroupSportFinalComponent;
  let fixture: ComponentFixture<TimetableGroupSportFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimetableGroupSportFinalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimetableGroupSportFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

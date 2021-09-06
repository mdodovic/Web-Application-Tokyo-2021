import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldRecordsComponent } from './world-records.component';

describe('WorldRecordsComponent', () => {
  let component: WorldRecordsComponent;
  let fixture: ComponentFixture<WorldRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorldRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

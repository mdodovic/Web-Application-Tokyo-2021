import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedalsStatisticsTableComponent } from './medals-statistics-table.component';

describe('MedalsStatisticsTableComponent', () => {
  let component: MedalsStatisticsTableComponent;
  let fixture: ComponentFixture<MedalsStatisticsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedalsStatisticsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedalsStatisticsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

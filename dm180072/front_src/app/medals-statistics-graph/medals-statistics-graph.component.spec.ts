import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedalsStatisticsGraphComponent } from './medals-statistics-graph.component';

describe('MedalsStatisticsGraphComponent', () => {
  let component: MedalsStatisticsGraphComponent;
  let fixture: ComponentFixture<MedalsStatisticsGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedalsStatisticsGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedalsStatisticsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

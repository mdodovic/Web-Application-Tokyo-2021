import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatesStatisticsComponent } from './states-statistics.component';

describe('StatesStatisticsComponent', () => {
  let component: StatesStatisticsComponent;
  let fixture: ComponentFixture<StatesStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatesStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatesStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsAndDisciplinesComponent } from './sports-and-disciplines.component';

describe('SportsAndDisciplinesComponent', () => {
  let component: SportsAndDisciplinesComponent;
  let fixture: ComponentFixture<SportsAndDisciplinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportsAndDisciplinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportsAndDisciplinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

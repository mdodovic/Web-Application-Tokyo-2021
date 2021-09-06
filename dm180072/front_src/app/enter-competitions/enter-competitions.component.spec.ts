import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterCompetitionsComponent } from './enter-competitions.component';

describe('EnterCompetitionsComponent', () => {
  let component: EnterCompetitionsComponent;
  let fixture: ComponentFixture<EnterCompetitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterCompetitionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterCompetitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

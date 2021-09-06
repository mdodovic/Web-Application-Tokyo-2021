import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterResultsComponent } from './enter-results.component';

describe('EnterResultsComponent', () => {
  let component: EnterResultsComponent;
  let fixture: ComponentFixture<EnterResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalLeaderComponent } from './national-leader.component';

describe('NationalLeaderComponent', () => {
  let component: NationalLeaderComponent;
  let fixture: ComponentFixture<NationalLeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NationalLeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

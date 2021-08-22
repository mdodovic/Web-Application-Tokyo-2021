import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsFormationComponent } from './teams-formation.component';

describe('TeamsFormationComponent', () => {
  let component: TeamsFormationComponent;
  let fixture: ComponentFixture<TeamsFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsFormationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

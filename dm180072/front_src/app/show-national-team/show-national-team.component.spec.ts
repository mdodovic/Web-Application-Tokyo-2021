import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowNationalTeamComponent } from './show-national-team.component';

describe('ShowNationalTeamComponent', () => {
  let component: ShowNationalTeamComponent;
  let fixture: ComponentFixture<ShowNationalTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowNationalTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowNationalTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersApplicationsComponent } from './players-applications.component';

describe('PlayersApplicationsComponent', () => {
  let component: PlayersApplicationsComponent;
  let fixture: ComponentFixture<PlayersApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayersApplicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

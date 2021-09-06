import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptUsersComponent } from './accept-users.component';

describe('AcceptUsersComponent', () => {
  let component: AcceptUsersComponent;
  let fixture: ComponentFixture<AcceptUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

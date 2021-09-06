import { TestBed } from '@angular/core/testing';

import { NationalTeamsService } from './national-teams.service';

describe('NationalTeamsService', () => {
  let service: NationalTeamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NationalTeamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

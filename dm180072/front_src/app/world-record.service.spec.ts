import { TestBed } from '@angular/core/testing';

import { WorldRecordService } from './world-record.service';

describe('WorldRecordService', () => {
  let service: WorldRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorldRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

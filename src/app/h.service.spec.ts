import { TestBed } from '@angular/core/testing';

import { HService } from './h.service';

describe('HService', () => {
  let service: HService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

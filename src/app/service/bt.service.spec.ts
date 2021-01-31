import { TestBed } from '@angular/core/testing';

import { BtService } from './bt.service';

describe('BtService', () => {
  let service: BtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

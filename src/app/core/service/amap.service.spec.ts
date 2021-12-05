import { TestBed } from '@angular/core/testing';

import { AmapService } from './amap.service';

describe('AmapService', () => {
  let service: AmapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

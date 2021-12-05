import { TestBed } from '@angular/core/testing';

import { GsapService } from './gsap.service';

describe('GsapService', () => {
  let service: GsapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GsapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

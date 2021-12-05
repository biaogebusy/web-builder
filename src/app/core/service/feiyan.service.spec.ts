import { TestBed } from '@angular/core/testing';

import { FeiyanService } from './feiyan.service';

describe('FeiyanService', () => {
  let service: FeiyanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeiyanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

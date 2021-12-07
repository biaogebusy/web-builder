import { TestBed } from '@angular/core/testing';

import { CryptoJSService } from './crypto-js.service';

describe('CryptoJSService', () => {
  let service: CryptoJSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoJSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

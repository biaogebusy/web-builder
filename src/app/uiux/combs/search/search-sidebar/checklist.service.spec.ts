import { TestBed } from '@angular/core/testing';

import { ChecklistService } from './checklist.service';

describe('ChecklistService', () => {
  let service: ChecklistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChecklistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

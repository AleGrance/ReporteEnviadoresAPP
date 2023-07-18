import { TestBed } from '@angular/core/testing';

import { Api48hsService } from './api-48hs.service';

describe('Api48hsService', () => {
  let service: Api48hsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Api48hsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

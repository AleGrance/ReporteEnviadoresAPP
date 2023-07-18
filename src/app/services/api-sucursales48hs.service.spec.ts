import { TestBed } from '@angular/core/testing';

import { ApiSucursales48hsService } from './api-sucursales48hs.service';

describe('ApiSucursales48hsService', () => {
  let service: ApiSucursales48hsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSucursales48hsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

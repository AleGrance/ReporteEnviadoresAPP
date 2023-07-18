import { TestBed } from '@angular/core/testing';

import { ApiNoasistidosService } from './api-noasistidos.service';

describe('ApiNoasistidosService', () => {
  let service: ApiNoasistidosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiNoasistidosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

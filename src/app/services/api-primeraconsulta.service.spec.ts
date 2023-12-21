import { TestBed } from '@angular/core/testing';

import { ApiPrimeraconsultaService } from './api-primeraconsulta.service';

describe('ApiPrimeraconsultaService', () => {
  let service: ApiPrimeraconsultaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPrimeraconsultaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

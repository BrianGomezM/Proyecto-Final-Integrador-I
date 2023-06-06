import { TestBed } from '@angular/core/testing';

import { ConsumoServiciosService } from './consumo-servicios.service';

describe('ConsumoServiciosService', () => {
  let service: ConsumoServiciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumoServiciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDetalleProcesoConstruccionesComponent } from './ver-detalle-proceso-construcciones.component';

describe('VerDetalleProcesoConstruccionesComponent', () => {
  let component: VerDetalleProcesoConstruccionesComponent;
  let fixture: ComponentFixture<VerDetalleProcesoConstruccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerDetalleProcesoConstruccionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerDetalleProcesoConstruccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoConstruccionesComponent } from './proceso-construcciones.component';

describe('ProcesoConstruccionesComponent', () => {
  let component: ProcesoConstruccionesComponent;
  let fixture: ComponentFixture<ProcesoConstruccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcesoConstruccionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcesoConstruccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

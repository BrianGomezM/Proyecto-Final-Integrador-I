import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriaImagenesContruccionesComponent } from './galeria-imagenes-contrucciones.component';

describe('GaleriaImagenesContruccionesComponent', () => {
  let component: GaleriaImagenesContruccionesComponent;
  let fixture: ComponentFixture<GaleriaImagenesContruccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaleriaImagenesContruccionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GaleriaImagenesContruccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

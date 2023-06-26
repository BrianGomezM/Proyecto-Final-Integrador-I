import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDetalleArquitecturaComponent } from './ver-detalle-arquitectura.component';

describe('VerDetalleArquitecturaComponent', () => {
  let component: VerDetalleArquitecturaComponent;
  let fixture: ComponentFixture<VerDetalleArquitecturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerDetalleArquitecturaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerDetalleArquitecturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

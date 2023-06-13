import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDetalleMitosHistoriasComponent } from './ver-detalle-mitos-historias.component';

describe('VerDetalleMitosHistoriasComponent', () => {
  let component: VerDetalleMitosHistoriasComponent;
  let fixture: ComponentFixture<VerDetalleMitosHistoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerDetalleMitosHistoriasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerDetalleMitosHistoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDetallePracticasComponent } from './ver-detalle-practicas.component';

describe('VerDetallePracticasComponent', () => {
  let component: VerDetallePracticasComponent;
  let fixture: ComponentFixture<VerDetallePracticasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerDetallePracticasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerDetallePracticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorarConstruccionesComponent } from './explorar-construcciones.component';

describe('ExplorarConstruccionesComponent', () => {
  let component: ExplorarConstruccionesComponent;
  let fixture: ComponentFixture<ExplorarConstruccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExplorarConstruccionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplorarConstruccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

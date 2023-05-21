import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriaImagenesReligionComponent } from './galeria-imagenes-religion.component';

describe('GaleriaImagenesReligionComponent', () => {
  let component: GaleriaImagenesReligionComponent;
  let fixture: ComponentFixture<GaleriaImagenesReligionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaleriaImagenesReligionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GaleriaImagenesReligionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriaImagenesMitologicasComponent } from './galeria-imagenes-mitologicas.component';

describe('GaleriaImagenesMitologicasComponent', () => {
  let component: GaleriaImagenesMitologicasComponent;
  let fixture: ComponentFixture<GaleriaImagenesMitologicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaleriaImagenesMitologicasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GaleriaImagenesMitologicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

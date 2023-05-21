import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarClaveComponent } from './asignar-clave.component';

describe('AsignarClaveComponent', () => {
  let component: AsignarClaveComponent;
  let fixture: ComponentFixture<AsignarClaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarClaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarClaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

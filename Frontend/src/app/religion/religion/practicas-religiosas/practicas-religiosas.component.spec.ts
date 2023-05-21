import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticasReligiosasComponent } from './practicas-religiosas.component';

describe('PracticasReligiosasComponent', () => {
  let component: PracticasReligiosasComponent;
  let fixture: ComponentFixture<PracticasReligiosasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticasReligiosasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticasReligiosasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

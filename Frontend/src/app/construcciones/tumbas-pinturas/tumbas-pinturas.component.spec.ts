import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TumbasPinturasComponent } from './tumbas-pinturas.component';

describe('TumbasPinturasComponent', () => {
  let component: TumbasPinturasComponent;
  let fixture: ComponentFixture<TumbasPinturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TumbasPinturasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TumbasPinturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

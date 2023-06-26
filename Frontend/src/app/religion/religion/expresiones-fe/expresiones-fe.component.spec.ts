import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpresionesFeComponent } from './expresiones-fe.component';

describe('ExpresionesFeComponent', () => {
  let component: ExpresionesFeComponent;
  let fixture: ComponentFixture<ExpresionesFeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpresionesFeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpresionesFeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

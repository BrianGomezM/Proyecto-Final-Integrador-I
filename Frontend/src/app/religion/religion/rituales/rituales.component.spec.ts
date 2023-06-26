import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RitualesComponent } from './rituales.component';

describe('RitualesComponent', () => {
  let component: RitualesComponent;
  let fixture: ComponentFixture<RitualesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RitualesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RitualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

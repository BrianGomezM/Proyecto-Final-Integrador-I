import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorarMitologiaComponent } from './explorar-mitologia.component';

describe('ExplorarMitologiaComponent', () => {
  let component: ExplorarMitologiaComponent;
  let fixture: ComponentFixture<ExplorarMitologiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExplorarMitologiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplorarMitologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

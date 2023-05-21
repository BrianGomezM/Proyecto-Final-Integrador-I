import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorarDiosesComponent } from './explorar-dioses.component';

describe('ExplorarDiosesComponent', () => {
  let component: ExplorarDiosesComponent;
  let fixture: ComponentFixture<ExplorarDiosesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExplorarDiosesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplorarDiosesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MitosHistoriaComponent } from './mitos-historia.component';

describe('MitosHistoriaComponent', () => {
  let component: MitosHistoriaComponent;
  let fixture: ComponentFixture<MitosHistoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MitosHistoriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MitosHistoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

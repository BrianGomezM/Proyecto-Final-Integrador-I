import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeremoniasComponent } from './ceremonias.component';

describe('CeremoniasComponent', () => {
  let component: CeremoniasComponent;
  let fixture: ComponentFixture<CeremoniasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CeremoniasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CeremoniasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

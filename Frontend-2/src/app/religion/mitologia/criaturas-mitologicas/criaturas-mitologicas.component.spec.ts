import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriaturasMitologicasComponent } from './criaturas-mitologicas.component';

describe('CriaturasMitologicasComponent', () => {
  let component: CriaturasMitologicasComponent;
  let fixture: ComponentFixture<CriaturasMitologicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriaturasMitologicasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriaturasMitologicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

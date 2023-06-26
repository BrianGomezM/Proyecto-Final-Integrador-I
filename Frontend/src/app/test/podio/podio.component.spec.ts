import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodioComponent } from './podio.component';

describe('PodioComponent', () => {
  let component: PodioComponent;
  let fixture: ComponentFixture<PodioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PodioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

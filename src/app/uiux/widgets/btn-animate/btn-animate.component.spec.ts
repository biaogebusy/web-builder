import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnAnimateComponent } from './btn-animate.component';

describe('BtnAnimateComponent', () => {
  let component: BtnAnimateComponent;
  let fixture: ComponentFixture<BtnAnimateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnAnimateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnAnimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

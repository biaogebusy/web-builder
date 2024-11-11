import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnGeneraterComponent } from './btn-generater.component';

describe('BtnGeneraterComponent', () => {
  let component: BtnGeneraterComponent;
  let fixture: ComponentFixture<BtnGeneraterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnGeneraterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnGeneraterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

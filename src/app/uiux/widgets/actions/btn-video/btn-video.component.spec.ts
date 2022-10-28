import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnVideoComponent } from './btn-video.component';

describe('BtnVideoComponent', () => {
  let component: BtnVideoComponent;
  let fixture: ComponentFixture<BtnVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

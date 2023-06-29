import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoBgComponent } from './video-bg.component';

describe('VideoBgComponent', () => {
  let component: VideoBgComponent;
  let fixture: ComponentFixture<VideoBgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoBgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

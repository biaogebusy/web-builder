import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerSimpleComponent } from './banner-simple.component';

describe('BannerSimpleComponent', () => {
  let component: BannerSimpleComponent;
  let fixture: ComponentFixture<BannerSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BannerSimpleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

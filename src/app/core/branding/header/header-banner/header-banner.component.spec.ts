import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideCoreMocks } from '@core/testing/mocks';

import { HeaderBannerComponent } from './header-banner.component';

describe('HeaderBannerComponent', () => {
  let component: HeaderBannerComponent;
  let fixture: ComponentFixture<HeaderBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderBannerComponent],
      providers: [provideRouter([]), ...provideCoreMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderBannerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

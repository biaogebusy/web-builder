import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { ArticleBannerComponent } from './article-banner.component';

describe('ArticleBannerComponent', () => {
  let component: ArticleBannerComponent;
  let fixture: ComponentFixture<ArticleBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleBannerComponent],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleBannerComponent);
    fixture.componentRef.setInput('content', {});
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { ImgComponent } from './img.component';

describe('ImgComponent', () => {
  let component: ImgComponent;
  let fixture: ComponentFixture<ImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgComponent],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should lazy load non-priority images by default', () => {
    fixture.componentRef.setInput('content', {
      type: 'img',
      src: '/assets/images/test.png',
      alt: 'Test image',
      width: 400,
      height: 300,
    });
    fixture.detectChanges();

    const img = fixture.nativeElement.querySelector('img');
    expect(img.getAttribute('loading')).toBe('lazy');
    expect(img.getAttribute('fetchpriority')).toBe('auto');
  });

  it('should eagerly load priority images with high fetch priority', () => {
    fixture.componentRef.setInput('content', {
      type: 'img',
      src: '/assets/images/hero.png',
      alt: 'Hero image',
      priority: true,
      width: 1200,
      height: 800,
    });
    fixture.detectChanges();

    const img = fixture.nativeElement.querySelector('img');
    expect(img.getAttribute('loading')).toBe('eager');
    expect(img.getAttribute('fetchpriority')).toBe('high');
  });

  it.each([undefined, '/details'])('updates intrinsic dimensions with href %s', href => {
    const content = { src: '/image.svg', alt: 'Image', width: 320, height: 240, href };
    fixture.componentRef.setInput('content', content);
    fixture.detectChanges();
    const original = fixture.nativeElement.querySelector('img');
    fixture.componentRef.setInput('content', { ...content, width: 640, height: 480 });
    expect(() => fixture.detectChanges()).not.toThrow();
    const resized = fixture.nativeElement.querySelector('img');
    expect(resized).not.toBe(original);
    expect(resized.getAttribute('width')).toBe('640');
    expect(resized.getAttribute('height')).toBe('480');
    expect(resized.getAttribute('alt')).toBe('Image');
    expect(fixture.nativeElement.querySelector('a')?.getAttribute('href')).toBe(href);
  });

  it('keeps the element when only ordinary image properties change', () => {
    const content = { src: '/image.svg', alt: 'Image', width: 320, height: 240 };
    fixture.componentRef.setInput('content', content);
    fixture.detectChanges();
    const original = fixture.nativeElement.querySelector('img');
    fixture.componentRef.setInput('content', { ...content,
      src: '/replacement.svg', alt: 'Replacement', style: { borderRadius: '12px' } });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('img')).toBe(original);
    expect(original.getAttribute('src')).toBe('/replacement.svg');
    expect(original.getAttribute('alt')).toBe('Replacement');
    expect(original.style.borderRadius).toBe('12px');
  });

  it('preserves the existing fallback dimensions', () => {
    fixture.componentRef.setInput('content', { src: '/image.svg' });
    fixture.detectChanges();
    const img = fixture.nativeElement.querySelector('img');
    expect(img.getAttribute('width')).toBe('400');
    expect(img.getAttribute('height')).toBe('300');
  });
});

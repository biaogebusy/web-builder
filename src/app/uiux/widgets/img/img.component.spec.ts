import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgComponent } from './img.component';

describe('ImgComponent', () => {
  let component: ImgComponent;
  let fixture: ComponentFixture<ImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgComponent],
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
});

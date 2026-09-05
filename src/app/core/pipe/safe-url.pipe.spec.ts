import { SecurityContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SafeUrlPipe } from '@core/pipe/safe-url.pipe';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

describe('SafeUrlPipe', () => {
  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  it('wraps the url as a SafeResourceUrl', () => {
    const pipe = TestBed.runInInjectionContext(() => new SafeUrlPipe());
    const url = 'https://www.youtube.com/embed/dQw4w9WgXcQ';

    const result = pipe.transform(url);

    expect(result).toBeTruthy();
    // Must be a SafeResourceUrl (i.e. pass through the security context as a resource URL)
    expect(TestBed.inject(DomSanitizer).sanitize(SecurityContext.RESOURCE_URL, result)).toBe(url);
  });

  it('returns a SafeResourceUrl even for an empty string', () => {
    const pipe = TestBed.runInInjectionContext(() => new SafeUrlPipe());
    const result = pipe.transform('');
    expect(result).toBeTruthy();
  });

  it('preserves the original url value through the security context', () => {
    const pipe = TestBed.runInInjectionContext(() => new SafeUrlPipe());
    const url = '/assets/video.mp4';
    const result = pipe.transform(url) as SafeResourceUrl;

    expect(TestBed.inject(DomSanitizer).sanitize(SecurityContext.RESOURCE_URL, result)).toBe(url);
  });
});

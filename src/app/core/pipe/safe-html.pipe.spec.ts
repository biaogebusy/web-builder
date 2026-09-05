import { TestBed } from '@angular/core/testing';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { ScreenService } from '@core/service/screen.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SecurityContext } from '@angular/core';

describe('SafeHtmlPipe', () => {
  const setup = (isBrowser = true) => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ScreenService,
          useValue: { isPlatformBrowser: vi.fn(() => isBrowser) },
        },
      ],
    });
    return TestBed.runInInjectionContext(() => new SafeHtmlPipe());
  };

  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  it('sanitizes an XSS payload by stripping the script tag', () => {
    const pipe = setup();
    const result = pipe.transform('<p>hi</p><script>alert(1)</script>');
    const sanitizer = TestBed.inject(DomSanitizer);

    // The result must be a SafeHtml wrapper; serialize back to confirm safety
    const html = sanitizer.sanitize(SecurityContext.HTML, result);
    expect(html).toBe('<p>hi</p>');
    expect(html).not.toContain('<script>');
    expect(html).not.toContain('alert');
  });

  it('keeps safe HTML intact', () => {
    const pipe = setup();
    const result = pipe.transform('<p class="intro">hello <strong>world</strong></p>');
    const sanitizer = TestBed.inject(DomSanitizer);

    const html = sanitizer.sanitize(SecurityContext.HTML, result);
    expect(html).toContain('<p class="intro">');
    expect(html).toContain('<strong>world</strong>');
  });

  it('removes javascript: hrefs from anchor tags', () => {
    const pipe = setup();
    const result = pipe.transform('<a href="javascript:alert(1)">click</a>');
    const sanitizer = TestBed.inject(DomSanitizer);

    const html = sanitizer.sanitize(SecurityContext.HTML, result);
    expect(html).not.toContain('javascript:');
  });

  it('returns undefined on the server (SSR safety)', () => {
    const pipe = setup(false);

    expect(pipe.transform('<p>hi</p>')).toBeUndefined();
  });

  it('returns undefined for non-string input', () => {
    const pipe = setup();

    expect(pipe.transform(null as never)).toBeUndefined();
    expect(pipe.transform(undefined as never)).toBeUndefined();
    expect(pipe.transform(123 as never)).toBeUndefined();
    expect(pipe.transform({} as never)).toBeUndefined();
  });

  it('produces a value that can pass through Angular\'s HTML security context', () => {
    const pipe = setup();
    const safe = pipe.transform('<b>ok</b>');
    const sanitizer = TestBed.inject(DomSanitizer);

    // A SafeHtml value must serialize without throwing in the HTML context
    expect(() => sanitizer.sanitize(SecurityContext.HTML, safe)).not.toThrow();
  });
});

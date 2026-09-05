import { Clipboard } from '@angular/cdk/clipboard';
import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ScreenService } from '@core/service/screen.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { CORE_CONFIG } from '@core/token/token-providers';

const createSnackbarMock = () => ({
  open: vi.fn(),
  dismiss: vi.fn(),
});

const createClipboardMock = () => ({
  copy: vi.fn(() => true),
});

describe('UtilitiesService', () => {
  let service: UtilitiesService;
  let snackbar: ReturnType<typeof createSnackbarMock>;
  let clipboard: ReturnType<typeof createClipboardMock>;
  let doc: Document;
  let isBrowser: boolean;

  const setup = (browser = true, coreConfig: Record<string, unknown> = {}) => {
    isBrowser = browser;
    snackbar = createSnackbarMock();
    clipboard = createClipboardMock();
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        { provide: MatSnackBar, useValue: snackbar },
        { provide: Clipboard, useValue: clipboard },
        { provide: CORE_CONFIG, useValue: coreConfig },
        {
          provide: ScreenService,
          useValue: {
            isPlatformBrowser: vi.fn(() => isBrowser),
            isPlatformServer: vi.fn(() => !isBrowser),
          },
        },
      ],
    });
    service = TestBed.inject(UtilitiesService);
    doc = TestBed.inject(DOCUMENT);
  };

  beforeEach(() => setup());

  afterEach(() => {
    doc.head.querySelectorAll('script, link').forEach(el => el.remove());
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  describe('snackbar', () => {
    it('opens with the default placement and duration', () => {
      service.openSnackbar('保存成功');

      expect(snackbar.open).toHaveBeenCalledWith('保存成功', '', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      });
    });

    it('lets the caller override the defaults', () => {
      service.openSnackbar('出错了', 'ok', { duration: 5000 });

      expect(snackbar.open).toHaveBeenCalledWith(
        '出错了',
        'ok',
        expect.objectContaining({ duration: 5000, verticalPosition: 'top' })
      );
    });

    it('dismisses the current snackbar', () => {
      service.dismissSnackbar();

      expect(snackbar.dismiss).toHaveBeenCalled();
    });
  });

  it('copies through the cdk clipboard', () => {
    service.copy('text');

    expect(clipboard.copy).toHaveBeenCalledWith('text');
  });

  describe('loadScript', () => {
    const src = 'https://cdn.example.com/lib.js';
    const scriptFor = (url = src) =>
      doc.head.querySelector(`script[src="${url}"]`) as HTMLScriptElement;

    it('resolves without touching the DOM on the server', async () => {
      setup(false);

      await service.loadScript(src);

      expect(scriptFor()).toBeNull();
    });

    it('appends the script and resolves once it loads', async () => {
      const pending = service.loadScript(src, 'lib', true);
      const script = scriptFor();

      expect(script.async).toBe(true);
      expect(script.defer).toBe(true);
      expect(script.id).toBe('lib');

      script.onload?.(new Event('load'));

      await expect(pending).resolves.toBeUndefined();
      expect(script.dataset['loaded']).toBe('true');
    });

    it('rejects and removes the script when it fails', async () => {
      const pending = service.loadScript(src);
      const script = scriptFor();

      script.onerror?.(new Event('error'));

      await expect(pending).rejects.toThrow(`Failed to load script: ${src}`);
      expect(scriptFor()).toBeNull();
    });

    it('resolves immediately for an already loaded script', async () => {
      const first = service.loadScript(src);
      const script = scriptFor();
      script.onload?.(new Event('load'));
      await first;

      await expect(service.loadScript(src)).resolves.toBeUndefined();
      // The existing tag is reused instead of a duplicate being appended
      expect(doc.head.querySelectorAll(`script[src="${src}"]`).length).toBe(1);
    });

    it('waits for an in-flight script instead of appending a second tag', async () => {
      const first = service.loadScript(src);
      const second = service.loadScript(src);
      const script = scriptFor();

      expect(doc.head.querySelectorAll(`script[src="${src}"]`).length).toBe(1);

      script.onload?.(new Event('load'));
      script.dispatchEvent(new Event('load'));

      await expect(Promise.all([first, second])).resolves.toEqual([undefined, undefined]);
    });
  });

  describe('loadStyle', () => {
    const href = 'https://cdn.example.com/lib.css';
    const linkFor = () => doc.head.querySelector(`link[href="${href}"]`) as HTMLLinkElement;

    it('resolves without touching the DOM on the server', async () => {
      setup(false);

      await service.loadStyle(href);

      expect(linkFor()).toBeNull();
    });

    it('appends a stylesheet link and resolves on load', async () => {
      const pending = service.loadStyle(href);
      const link = linkFor();

      expect(link.rel).toBe('stylesheet');

      link.onload?.(new Event('load'));

      await expect(pending).resolves.toBeUndefined();
      expect(link.dataset['loaded']).toBe('true');
    });

    it('rejects when the stylesheet fails', async () => {
      const pending = service.loadStyle(href);

      linkFor().onerror?.(new Event('error'));

      await expect(pending).rejects.toThrow(`Failed to load ${href}`);
    });

    it('resolves immediately for an already loaded stylesheet', async () => {
      const first = service.loadStyle(href);
      linkFor().onload?.(new Event('load'));
      await first;

      await expect(service.loadStyle(href)).resolves.toBeUndefined();
      expect(doc.head.querySelectorAll(`link[href="${href}"]`).length).toBe(1);
    });
  });

  describe('loadScriptWithoutAmd', () => {
    const win = window as unknown as Record<string, unknown>;

    afterEach(() => {
      delete win['define'];
    });

    it('suppresses an AMD define while loading and restores it afterwards', async () => {
      const define = Object.assign(vi.fn(), { amd: {} });
      win['define'] = define;
      const loadScript = vi.spyOn(service, 'loadScript').mockImplementation(() => {
        expect(win['define']).toBeUndefined();
        return Promise.resolve();
      });

      await service.loadScriptWithoutAmd('https://cdn.example.com/umd.js', 'umd', true);

      expect(loadScript).toHaveBeenCalledWith('https://cdn.example.com/umd.js', 'umd', true);
      expect(win['define']).toBe(define);
    });

    it('restores the AMD define even when loading fails', async () => {
      const define = Object.assign(vi.fn(), { amd: {} });
      win['define'] = define;
      vi.spyOn(service, 'loadScript').mockRejectedValue(new Error('boom'));

      await expect(service.loadScriptWithoutAmd('https://cdn.example.com/umd.js')).rejects.toThrow(
        'boom'
      );
      expect(win['define']).toBe(define);
    });

    it('leaves a non-AMD define untouched', async () => {
      const define = vi.fn();
      win['define'] = define;
      vi.spyOn(service, 'loadScript').mockImplementation(() => {
        expect(win['define']).toBe(define);
        return Promise.resolve();
      });

      await service.loadScriptWithoutAmd('https://cdn.example.com/umd.js');

      expect(win['define']).toBe(define);
    });
  });

  describe('initAnimate', () => {
    let animateEle: HTMLElement;
    let triggerEle: HTMLElement;

    const aosInputs = (enable: boolean) => ({
      animate: {
        aos: { enable, animation: 'fade-up', behaviour: { duration: '600', delay: '100' } },
      },
    });

    beforeEach(() => {
      animateEle = doc.createElement('div');
      triggerEle = doc.createElement('div');
    });

    it('does nothing when animation is disabled in the core config', async () => {
      await service.initAnimate(aosInputs(true) as never, animateEle, triggerEle);

      expect(animateEle.getAttribute('data-aos')).toBeNull();
    });

    it('does nothing on the server', async () => {
      setup(false, { animate: true });

      await service.initAnimate(aosInputs(true) as never, animateEle, triggerEle);

      expect(animateEle.getAttribute('data-aos')).toBeNull();
    });

    it('writes the aos attributes from the behaviour map', async () => {
      setup(true, { animate: true });

      await service.initAnimate(aosInputs(true) as never, animateEle, triggerEle);

      expect(animateEle.classList.contains('aos-item')).toBe(true);
      expect(animateEle.getAttribute('data-aos')).toBe('fade-up');
      expect(animateEle.getAttribute('data-aos-duration')).toBe('600');
      expect(animateEle.getAttribute('data-aos-delay')).toBe('100');
    });

    it('clears the aos attributes when disabled', async () => {
      setup(true, { animate: true });
      await service.initAnimate(aosInputs(true) as never, animateEle, triggerEle);

      await service.initAnimate(aosInputs(false) as never, animateEle, triggerEle);

      expect(animateEle.classList.contains('aos-item')).toBe(false);
      expect(animateEle.getAttribute('data-aos')).toBeNull();
    });

    it('reads the animate config from content for widget-shaped inputs', async () => {
      setup(true, { animate: true });

      await service.initAnimate(
        { content: aosInputs(true) } as never,
        animateEle,
        triggerEle
      );

      expect(animateEle.getAttribute('data-aos')).toBe('fade-up');
    });

    it('warns when both gsap and aos are enabled', async () => {
      setup(true, { animate: true });
      // gsap's ScrollTrigger registration needs matchMedia, which jsdom does not provide
      vi.stubGlobal('matchMedia', () => ({
        matches: false,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }));
      // jsdom does not implement scrollIntoView; the 800ms error toast
      // scroll-to is cosmetic, so stub it to prevent an unhandled timeout
      Element.prototype.scrollIntoView = vi.fn();
      vi.useFakeTimers();
      await service.initAnimate(
        {
          animate: {
            gsap: { enable: true, trigger: {} },
            aos: { enable: true, animation: 'fade-up', behaviour: {} },
          },
        } as never,
        animateEle,
        triggerEle
      );

      expect(snackbar.open).toHaveBeenCalledWith(
        '不能同时开启AOS和GSAP动画，请检查！',
        'ok',
        expect.objectContaining({ duration: 5000 })
      );
      // Let the 800ms scrollIntoView timer fire so it does not leak
      await vi.advanceTimersByTimeAsync(1000);
      vi.useRealTimers();
      vi.unstubAllGlobals();
    });
  });

  describe('intersectionObserver', () => {
    it('returns a no-op teardown on the server', () => {
      setup(false);

      expect(service.intersectionObserver('.item', doc)()).toBeUndefined();
    });

    it('observes matching elements and stops on teardown', () => {
      const observe = vi.fn();
      const disconnect = vi.fn();
      vi.stubGlobal(
        'IntersectionObserver',
        class {
          observe = observe;
          unobserve = vi.fn();
          disconnect = disconnect;
          constructor(public cb: unknown) {}
        }
      );
      const root = doc.createElement('div');
      root.innerHTML = '<span class="item"></span><span class="item"></span>';

      const teardown = service.intersectionObserver('.item', root);

      expect(observe).toHaveBeenCalledTimes(2);

      teardown();

      expect(disconnect).toHaveBeenCalled();
      vi.unstubAllGlobals();
    });
  });

  it('exposes the current year', () => {
    expect(service.fullYear).toBe(new Date().getFullYear());
  });
});

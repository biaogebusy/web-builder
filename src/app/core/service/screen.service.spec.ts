import { DOCUMENT, PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ScreenService } from '@core/service/screen.service';

describe('ScreenService', () => {
  const setup = (platform: 'browser' | 'server' = 'browser') => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        ScreenService,
        { provide: PLATFORM_ID, useValue: platform },
      ],
    });
    return {
      service: TestBed.inject(ScreenService),
      doc: TestBed.inject(DOCUMENT),
    };
  };

  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  describe('platform detection', () => {
    it('reports server platform correctly', () => {
      const { service } = setup('server');
      expect(service.isPlatformServer()).toBe(true);
      expect(service.isPlatformBrowser()).toBe(false);
    });

    it('reports browser platform correctly', () => {
      const { service } = setup('browser');
      expect(service.isPlatformBrowser()).toBe(true);
      expect(service.isPlatformServer()).toBe(false);
    });
  });

  describe('isElementInViewport', () => {
    const makeEl = (rect: Partial<DOMRect>): any => ({
      getBoundingClientRect: () => ({
        top: 0, left: 0, bottom: 100, right: 100, ...rect,
      }),
    });

    it('returns true when the element is fully inside the viewport', () => {
      const { service } = setup();
      // jsdom default viewport is 1024x768-ish; set a known viewport via innerHeight/innerWidth
      Object.defineProperty(window, 'innerHeight', { value: 768, writable: true });
      Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });

      const rect = { top: 100, left: 100, bottom: 200, right: 200 };
      expect(service.isElementInViewport(makeEl(rect))).toBe(true);
    });

    it('returns false when the element is above the viewport', () => {
      const { service } = setup();
      Object.defineProperty(window, 'innerHeight', { value: 768, writable: true });
      const rect = { top: -200, left: 0, bottom: -50, right: 100 };
      expect(service.isElementInViewport(makeEl(rect))).toBe(false);
    });

    it('returns false when the element extends below the viewport', () => {
      const { service } = setup();
      Object.defineProperty(window, 'innerHeight', { value: 768, writable: true });
      const rect = { top: 700, left: 0, bottom: 900, right: 100 };
      expect(service.isElementInViewport(makeEl(rect))).toBe(false);
    });

    it('returns false when the element is to the left of the viewport', () => {
      const { service } = setup();
      Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
      const rect = { top: 0, left: -200, bottom: 100, right: -50 };
      expect(service.isElementInViewport(makeEl(rect))).toBe(false);
    });

    it('returns false when the element extends to the right of the viewport', () => {
      const { service } = setup();
      Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
      const rect = { top: 0, left: 900, bottom: 100, right: 1100 };
      expect(service.isElementInViewport(makeEl(rect))).toBe(false);
    });

    it('returns true when the element is exactly flush with all viewport edges', () => {
      const { service } = setup();
      Object.defineProperty(window, 'innerHeight', { value: 500, writable: true });
      Object.defineProperty(window, 'innerWidth', { value: 500, writable: true });
      const rect = { top: 0, left: 0, bottom: 500, right: 500 };
      expect(service.isElementInViewport(makeEl(rect))).toBe(true);
    });
  });

  describe('isElementOutTopViewport', () => {
    const makeEl = (rect: Partial<DOMRect>, clientHeight = 100): any => ({
      clientHeight,
      getBoundingClientRect: () => ({
        top: 0, left: 0, bottom: clientHeight, right: 100, ...rect,
      }),
    });

    it('returns true when the element is fully above the viewport', () => {
      const { service } = setup();
      // top < -clientHeight AND bottom <= 0 → out top
      expect(service.isElementOutTopViewport(makeEl({ top: -300, bottom: -200 }, 100))).toBe(true);
    });

    it('returns false when the element is partially visible at the top', () => {
      const { service } = setup();
      // top < 0 but bottom > 0 → partially visible
      expect(service.isElementOutTopViewport(makeEl({ top: -50, bottom: 50 }, 100))).toBe(false);
    });

    it('returns false when the element is fully inside the viewport', () => {
      const { service } = setup();
      expect(service.isElementOutTopViewport(makeEl({ top: 100, bottom: 200 }, 100))).toBe(false);
    });

    it('returns false when the element bottom is exactly at the viewport top (bottom = 0)', () => {
      const { service } = setup();
      // top = -100 is NOT strictly less than -clientHeight (-100), so returns false.
      expect(service.isElementOutTopViewport(makeEl({ top: -100, bottom: 0 }, 100))).toBe(false);
    });

    it('returns true when the element is fully above by even one pixel', () => {
      const { service } = setup();
      expect(service.isElementOutTopViewport(makeEl({ top: -101, bottom: -1 }, 100))).toBe(true);
    });
  });

  describe('isElementOutBottomViewport', () => {
    const makeEl = (rect: Partial<DOMRect>): any => ({
      getBoundingClientRect: () => ({
        top: 0, left: 0, bottom: 100, right: 100, ...rect,
      }),
    });

    it('returns true when the element is fully below the viewport', () => {
      const { service } = setup();
      Object.defineProperty(window, 'innerHeight', { value: 500, writable: true });
      expect(service.isElementOutBottomViewport(makeEl({ top: 600, bottom: 700 }))).toBe(true);
    });

    it('returns false when the element is partially visible at the bottom', () => {
      const { service } = setup();
      Object.defineProperty(window, 'innerHeight', { value: 500, writable: true });
      expect(service.isElementOutBottomViewport(makeEl({ top: 450, bottom: 550 }))).toBe(false);
    });

    it('returns false when the element is fully inside the viewport', () => {
      const { service } = setup();
      Object.defineProperty(window, 'innerHeight', { value: 500, writable: true });
      expect(service.isElementOutBottomViewport(makeEl({ top: 100, bottom: 200 }))).toBe(false);
    });
  });

  describe('scrollToAnchor', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      // jsdom does not implement scrollIntoView; stub it on the prototype.
      if (!Element.prototype.scrollIntoView) {
        Element.prototype.scrollIntoView = vi.fn();
      }
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('scrolls immediately to an existing anchor element', () => {
      const { service, doc } = setup();
      const el = doc.createElement('div');
      el.id = 'section-1';
      doc.body.appendChild(el);
      const spy = vi.spyOn(el, 'scrollIntoView');

      service.scrollToAnchor('section-1');
      vi.advanceTimersByTime(150); // past the 100ms revealAndScroll timeout

      expect(spy).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
      el.remove();
    });

    it('waits for the element to appear and then scrolls', () => {
      const { service, doc } = setup();
      const scrollIntoViewSpy = vi.fn();

      // Element doesn't exist at first, appears after 300ms
      service.scrollToAnchor('late-element');
      vi.advanceTimersByTime(250); // 2-3 intervals, element still missing

      // Now add the element
      const el = doc.createElement('div');
      el.id = 'late-element';
      el.scrollIntoView = scrollIntoViewSpy;
      doc.body.appendChild(el);

      vi.advanceTimersByTime(200); // next interval should find it
      vi.advanceTimersByTime(150); // past the revealAndScroll timeout

      expect(scrollIntoViewSpy).toHaveBeenCalled();
      el.remove();
    });

    it('gives up after maxWait ms when the element never appears', () => {
      const { service } = setup();
      // setInterval should be cleared after maxWait
      const setIntervalSpy = vi.spyOn(window, 'setInterval');

      service.scrollToAnchor('never-exists', 300);
      vi.advanceTimersByTime(500); // well past maxWait

      // No errors, no scroll
      expect(setIntervalSpy).toHaveBeenCalled();
      setIntervalSpy.mockRestore();
    });
  });

  describe('revealAndScroll (via scrollToAnchor)', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      if (!Element.prototype.scrollIntoView) {
        Element.prototype.scrollIntoView = vi.fn();
      }
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('strips data-aos and adds aos-animate to the target and its ancestors', () => {
      const { service, doc } = setup();
      const grandparent = doc.createElement('section');
      grandparent.setAttribute('data-aos', 'fade-up');
      const parent = doc.createElement('div');
      parent.setAttribute('data-aos', 'slide-up');
      const child = doc.createElement('span');
      child.setAttribute('data-aos', 'zoom-in');
      child.id = 'aos-target';

      parent.appendChild(child);
      grandparent.appendChild(parent);
      doc.body.appendChild(grandparent);

      service.scrollToAnchor('aos-target');
      vi.advanceTimersByTime(50); // before the 100ms scroll timeout

      // All data-aos attributes should be stripped
      expect(child.hasAttribute('data-aos')).toBe(false);
      expect(parent.hasAttribute('data-aos')).toBe(false);
      expect(grandparent.hasAttribute('data-aos')).toBe(false);

      // All should have aos-animate class
      expect(child.classList.contains('aos-animate')).toBe(true);
      expect(parent.classList.contains('aos-animate')).toBe(true);
      expect(grandparent.classList.contains('aos-animate')).toBe(true);

      grandparent.remove();
    });

    it('leaves elements without data-aos untouched', () => {
      const { service, doc } = setup();
      const parent = doc.createElement('div');
      const child = doc.createElement('span');
      child.id = 'plain-target';
      parent.appendChild(child);
      doc.body.appendChild(parent);

      service.scrollToAnchor('plain-target');
      vi.advanceTimersByTime(50);

      expect(parent.classList.contains('aos-animate')).toBe(false);
      expect(child.classList.contains('aos-animate')).toBe(false);

      parent.remove();
    });
  });

  describe('gotoTop', () => {
    it('calls window.scroll to scroll to top with smooth behavior', () => {
      const { service } = setup();
      const scrollSpy = vi.spyOn(window, 'scroll').mockImplementation(() => {});

      service.gotoTop();

      expect(scrollSpy).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'smooth' });
    });
  });

  describe('initSidebarStyle', () => {
    const setupSidebarDom = (doc: Document) => {
      const main = doc.createElement('main');
      main.id = 'main-container';
      const sidebar = doc.createElement('aside');
      sidebar.id = 'sidebar';
      const container = doc.createElement('div');
      container.className = 'mat-drawer-inner-container';
      sidebar.appendChild(container);
      doc.body.appendChild(main);
      doc.body.appendChild(sidebar);
      return { main, sidebar, container };
    };

    it('applies open styling when opened is truthy', () => {
      const { service, doc } = setup();
      const { main, sidebar, container } = setupSidebarDom(doc);

      service.initSidebarStyle(true);

      expect(main.style.paddingLeft).toBe('0px');
      expect(sidebar.style.overflow).toBe('auto');
      expect(container.style.overflow).toBe('auto');

      main.remove();
      sidebar.remove();
    });

    it('applies closed styling when opened is falsy', () => {
      const { service, doc } = setup();
      const { main, sidebar, container } = setupSidebarDom(doc);

      service.initSidebarStyle(false);

      expect(main.style.paddingLeft).toBe('80px');
      expect(sidebar.style.overflow).toBe('visible');
      expect(container.style.overflow).toBe('visible');

      main.remove();
      sidebar.remove();
    });
  });
});

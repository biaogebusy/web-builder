import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ScreenState } from '@core/state/screen/ScreenState';
import { ScreenService } from '@core/service/screen.service';
import { BehaviorSubject, firstValueFrom, Subject } from 'rxjs';

describe('ScreenState', () => {
  const LARGE_RESULT = {
    matches: true,
    breakpoints: {
      [Breakpoints.XSmall]: false,
      [Breakpoints.Small]: false,
      [Breakpoints.Medium]: false,
      [Breakpoints.Large]: true,
      [Breakpoints.XLarge]: false,
    },
  };

  const setup = (options: {
    platform?: 'browser' | 'server';
    result?: any;
  } = {}) => {
    const { platform = 'browser', result = LARGE_RESULT } = options;
    const result$ = new BehaviorSubject<any>(result);
    const observe = vi.fn(() => result$.asObservable());
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        ScreenState,
        { provide: BreakpointObserver, useValue: { observe } },
        { provide: ScreenService, useValue: { isPlatformBrowser: vi.fn(() => platform === 'browser') } },
        { provide: PLATFORM_ID, useValue: platform },
      ],
    });
    return { state: TestBed.inject(ScreenState), observe, result$ };
  };

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  describe('construction', () => {
    it('observes all five breakpoints on the browser', () => {
      const { observe } = setup();
      expect(observe).toHaveBeenCalledWith([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ]);
    });

    it('does not observe breakpoints on the server', () => {
      const { observe } = setup({ platform: 'server' });
      expect(observe).not.toHaveBeenCalled();
    });
  });

  describe('eq', () => {
    it('matches the current viewport alias on the browser', () => {
      const { state } = setup();
      expect(state.eq('lg')).toBe(true);
    });

    it('does not match other aliases on the browser', () => {
      const { state } = setup();
      expect(state.eq('xs')).toBe(false);
      expect(state.eq('sm')).toBe(false);
      expect(state.eq('md')).toBe(false);
      expect(state.eq('xl')).toBe(false);
    });

    it('returns false before the viewport is resolved', () => {
      // Breakpoint observer never emits: viewPort stays undefined.
      const observe = vi.fn(() => new Subject<any>().asObservable());
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          ScreenState,
          { provide: BreakpointObserver, useValue: { observe } },
          {
            provide: ScreenService,
            useValue: { isPlatformBrowser: vi.fn(() => true) },
          },
        ],
      });
      const state = TestBed.inject(ScreenState);
      expect(state.eq('lg')).toBe(false);
    });

    it('assumes xs on the server', () => {
      const { state } = setup({ platform: 'server' });
      expect(state.eq('xs')).toBe(true);
      expect(state.eq('lg')).toBe(false);
    });

    it('reflects viewport changes when breakpoints flip', () => {
      const { state, result$ } = setup();
      expect(state.eq('lg')).toBe(true);

      result$.next({
        matches: true,
        breakpoints: {
          [Breakpoints.XSmall]: true,
          [Breakpoints.Small]: false,
          [Breakpoints.Medium]: false,
          [Breakpoints.Large]: false,
          [Breakpoints.XLarge]: false,
        },
      });
      expect(state.eq('xs')).toBe(true);
      expect(state.eq('lg')).toBe(false);
    });
  });

  describe('mqAlias$', () => {
    it('maps the first matching breakpoint to its display alias', async () => {
      const { state } = setup();
      expect(await firstValueFrom(state.mqAlias$())).toEqual(['lg']);
    });

    it('returns unknown when no breakpoint matches', async () => {
      const { state } = setup({
        result: {
          matches: false,
          breakpoints: {
            [Breakpoints.XSmall]: false,
            [Breakpoints.Small]: false,
            [Breakpoints.Medium]: false,
            [Breakpoints.Large]: false,
            [Breakpoints.XLarge]: false,
          },
        },
      });
      expect(await firstValueFrom(state.mqAlias$())).toEqual(['unknown']);
    });

    it('returns Unknown for queries missing from the display name map', async () => {
      const { state } = setup({
        result: {
          matches: true,
          breakpoints: { '(min-width: 1234px)': true },
        },
      });
      expect(await firstValueFrom(state.mqAlias$())).toEqual(['Unknown']);
    });
  });

  describe('initBrowserEvents', () => {
    it('emits true on scroll$ after a 200ms debounce', () => {
      vi.useFakeTimers();
      const { state } = setup();
      const emissions: boolean[] = [];
      state.scroll$.subscribe(v => emissions.push(v));
      const initialCount = emissions.length;

      window.dispatchEvent(new Event('scroll'));
      // Before the debounce window elapses, nothing new is emitted.
      vi.advanceTimersByTime(199);
      expect(emissions.length).toBe(initialCount);

      vi.advanceTimersByTime(1);
      expect(emissions.length).toBe(initialCount + 1);
      expect(emissions[emissions.length - 1]).toBe(true);
    });

    it('debounces bursts of scroll events into a single emission', () => {
      vi.useFakeTimers();
      const { state } = setup();
      const emissions: boolean[] = [];
      state.scroll$.subscribe(v => emissions.push(v));
      const initialCount = emissions.length;

      for (let i = 0; i < 5; i++) {
        window.dispatchEvent(new Event('scroll'));
        vi.advanceTimersByTime(50);
      }
      vi.advanceTimersByTime(200);

      expect(emissions.length).toBe(initialCount + 1);
    });
  });

  describe('toggleDrawer', () => {
    it('emits true on drawer$', () => {
      const { state } = setup();
      const observer = vi.fn();
      state.drawer$.subscribe(observer);

      state.toggleDrawer();

      expect(observer).toHaveBeenCalledWith(true);
    });
  });
});

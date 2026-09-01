import { Location } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NavigationService } from '@core/service/navigation.service';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';

describe('NavigationService', () => {
  let service: NavigationService;
  let events: Subject<unknown>;
  let router: { events: Subject<unknown>; navigateByUrl: ReturnType<typeof vi.fn> };
  let location: { back: ReturnType<typeof vi.fn> };

  const setup = (platform: 'browser' | 'server' = 'browser') => {
    events = new Subject();
    router = { events, navigateByUrl: vi.fn() };
    location = { back: vi.fn() };
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: router },
        { provide: Location, useValue: location },
        { provide: PLATFORM_ID, useValue: platform },
      ],
    });
    service = TestBed.inject(NavigationService);
  };

  const visit = (url: string) => events.next(new NavigationEnd(1, url, url));

  beforeEach(() => setup());

  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  it('records nothing until history tracking is started', () => {
    visit('/about');

    expect(service.getHistory()).toEqual([]);
  });

  it('records the redirected url of each navigation', () => {
    service.startSaveHistory();

    visit('/about');
    visit('/contact');

    expect(service.getHistory()).toEqual(['/about', '/contact']);
  });

  it('ignores router events other than NavigationEnd', () => {
    service.startSaveHistory();

    events.next({ id: 1, url: '/about' });

    expect(service.getHistory()).toEqual([]);
  });

  describe('goBack', () => {
    it('steps back in the browser history when there is somewhere to return to', () => {
      service.startSaveHistory();
      visit('/about');
      visit('/contact');

      service.goBack();

      expect(location.back).toHaveBeenCalled();
      expect(router.navigateByUrl).not.toHaveBeenCalled();
      expect(service.getHistory()).toEqual(['/about']);
    });

    it('falls back to the home page when the history is exhausted', () => {
      service.startSaveHistory();
      visit('/about');

      service.goBack();

      expect(router.navigateByUrl).toHaveBeenCalledWith('/');
      expect(location.back).not.toHaveBeenCalled();
    });

    it('falls back to the home page when nothing was recorded', () => {
      service.goBack();

      expect(router.navigateByUrl).toHaveBeenCalledWith('/');
    });
  });

  describe('getPreviousUrl', () => {
    it('returns the entry before the current one', () => {
      service.startSaveHistory();
      visit('/about');
      visit('/contact');

      expect(service.getPreviousUrl()).toBe('/about');
    });

    it('returns an empty string with no history', () => {
      expect(service.getPreviousUrl()).toBe('');
    });
  });

  describe('isIE', () => {
    it('is false on the server', () => {
      setup('server');

      expect(service.isIE).toBe(false);
    });

    it('detects legacy engines from the user agent', () => {
      vi.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue(
        'Mozilla/5.0 (Windows NT 10.0; Trident/7.0; rv:11.0) like Gecko'
      );

      expect(service.isIE).toBe(true);
    });

    it('is false for a modern browser', () => {
      vi.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue(
        'Mozilla/5.0 (Macintosh) AppleWebKit/537.36 Chrome/120.0 Safari/537.36'
      );

      expect(service.isIE).toBe(false);
    });
  });
});

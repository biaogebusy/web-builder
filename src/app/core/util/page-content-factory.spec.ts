import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import type { IPage } from '@core/interface/IAppConfig';
import {
  isBuilderCustomPageUrl,
  pageContentFactory,
  preloadInitialDynamicComponents,
  shouldPreloadPageComponents,
} from '@core/factory/factory';
import { ComponentService } from '@core/service/component.service';
import { ContentService } from '@core/service/content.service';
import { ContentState } from '@core/state/ContentState';
import { CORE_CONFIG } from '@core/token/token-providers';
import { of, Subject } from 'rxjs';

describe('pageContentFactory', () => {
  it('keeps the current page until the next page component types are ready', async () => {
    const routerEvents = new Subject<NavigationEnd>();
    let currentUrl = '/home';
    const loadPageContent = vi.fn((pageUrl: string) => of({ body: [], title: pageUrl } as IPage));
    let resolveCalendar: () => void;
    const calendarReady = new Promise<void>(resolve => {
      resolveCalendar = resolve;
    });
    const preloadComponentTypes = vi.fn((page: IPage) => {
      return page.title === '/calendar' ? calendarReady : Promise.resolve();
    });

    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { url: of([]) },
        },
        {
          provide: Router,
          useValue: { events: routerEvents.asObservable() },
        },
        {
          provide: ContentService,
          useValue: {
            get pageUrl(): string {
              return currentUrl;
            },
            getCachedPageContent: () => undefined,
            loadConfig: () => Promise.resolve(),
            loadPageContent,
          },
        },
        {
          provide: ComponentService,
          useValue: { preloadComponentTypes },
        },
        {
          provide: ContentState,
          useValue: { pageConfig: signal(undefined) },
        },
        { provide: CORE_CONFIG, useValue: {} },
      ],
    });

    const pageContent = TestBed.runInInjectionContext(pageContentFactory);
    const pageTitle = () => {
      const page = pageContent();
      return page ? page.title : undefined;
    };
    await vi.waitFor(() => expect(pageTitle()).toBe('/home'));

    currentUrl = '/calendar';
    routerEvents.next(new NavigationEnd(2, '/calendar', '/calendar'));

    await vi.waitFor(() => expect(loadPageContent).toHaveBeenCalledWith('/calendar'));
    expect(pageTitle()).toBe('/home');

    resolveCalendar!();
    await vi.waitFor(() => expect(pageTitle()).toBe('/calendar'));
    const currentPage = pageContent();
    expect(currentPage).toBeTruthy();
    if (!currentPage) {
      throw new Error('Expected calendar page content');
    }
    expect(currentPage.title).toBe('/calendar');
  });

  it('ignores navigations to routes that PageComponent does not render', async () => {
    const routerEvents = new Subject<NavigationEnd>();
    let currentUrl = '/home';
    const loadPageContent = vi.fn((pageUrl: string) => of({ body: [], title: pageUrl } as IPage));

    TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: { url: of([]) } },
        { provide: Router, useValue: { events: routerEvents.asObservable() } },
        {
          provide: ContentService,
          useValue: {
            get pageUrl(): string {
              return currentUrl;
            },
            getCachedPageContent: () => undefined,
            loadConfig: () => Promise.resolve(),
            loadPageContent,
          },
        },
        { provide: ComponentService, useValue: { preloadComponentTypes: () => Promise.resolve() } },
        { provide: ContentState, useValue: { pageConfig: signal(undefined) } },
        { provide: CORE_CONFIG, useValue: {} },
      ],
    });

    TestBed.runInInjectionContext(pageContentFactory);
    await vi.waitFor(() => expect(loadPageContent).toHaveBeenCalledWith('/home'));

    currentUrl = '/builder';
    routerEvents.next(new NavigationEnd(2, '/builder', '/builder'));
    await Promise.resolve();
    expect(loadPageContent).not.toHaveBeenCalledWith('/builder');

    // Coming back must refetch, so TagsService restores the page title the
    // builder route replaced.
    currentUrl = '/home';
    routerEvents.next(new NavigationEnd(3, '/home', '/home'));
    await vi.waitFor(() => expect(loadPageContent).toHaveBeenCalledTimes(2));
  });

  it('follows builder custom pages when the builder workspace owns the factory', async () => {
    const routerEvents = new Subject<NavigationEnd>();
    let currentUrl = '/builder/conversations';
    const loadPageContent = vi.fn((pageUrl: string) => of({ body: [], title: pageUrl } as IPage));

    TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: { url: of([]) } },
        { provide: Router, useValue: { events: routerEvents.asObservable() } },
        {
          provide: ContentService,
          useValue: {
            get pageUrl(): string {
              return currentUrl;
            },
            getCachedPageContent: () => undefined,
            loadConfig: () => Promise.resolve(),
            loadPageContent,
          },
        },
        { provide: ComponentService, useValue: { preloadComponentTypes: () => Promise.resolve() } },
        { provide: ContentState, useValue: { pageConfig: signal(undefined) } },
        { provide: CORE_CONFIG, useValue: {} },
      ],
    });

    const pageContent = TestBed.runInInjectionContext(() =>
      pageContentFactory({ builderPages: true })
    );
    await vi.waitFor(() => {
      const page = pageContent();
      expect(page && page.title).toBe('/builder/conversations');
    });

    currentUrl = '/builder/dashboard';
    routerEvents.next(new NavigationEnd(2, currentUrl, currentUrl));
    await vi.waitFor(() => {
      const page = pageContent();
      expect(page && page.title).toBe('/builder/dashboard');
    });
  });

  it('uses synchronously preloaded page content for the first hydration render', () => {
    const cachedPage = { body: [], title: '/home' } as IPage;

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: { events: new Subject<NavigationEnd>() } },
        {
          provide: ContentService,
          useValue: {
            pageUrl: '/',
            getCachedPageContent: (pageUrl: string) => {
              return pageUrl === '/home' ? cachedPage : undefined;
            },
            loadConfig: () => Promise.resolve(),
            loadPageContent: () => of(cachedPage),
          },
        },
        { provide: ComponentService, useValue: { preloadComponentTypes: () => Promise.resolve() } },
        { provide: ContentState, useValue: { pageConfig: signal(undefined) } },
        { provide: CORE_CONFIG, useValue: {} },
      ],
    });

    const pageContent = TestBed.runInInjectionContext(pageContentFactory);

    expect(pageContent()).toBe(cachedPage);
  });
});

describe('shouldPreloadPageComponents', () => {
  it('preloads public content routes only', () => {
    expect(shouldPreloadPageComponents('/node/36')).toBe(true);
    expect(shouldPreloadPageComponents('/en/calendar')).toBe(true);
    expect(shouldPreloadPageComponents('/builder/page-list')).toBe(false);
    expect(shouldPreloadPageComponents('/en/builder/page-list')).toBe(false);
    expect(shouldPreloadPageComponents('/me/login')).toBe(false);
    expect(shouldPreloadPageComponents('/my/account')).toBe(false);
    expect(shouldPreloadPageComponents('/preview')).toBe(false);
    expect(shouldPreloadPageComponents('/en/me')).toBe(true);
  });
});

describe('isBuilderCustomPageUrl', () => {
  it('matches CMS pages served under the builder catch-all only', () => {
    expect(isBuilderCustomPageUrl('/builder/conversations')).toBe(true);
    expect(isBuilderCustomPageUrl('/en/builder/dashboard')).toBe(true);
    expect(isBuilderCustomPageUrl('/builder')).toBe(false);
    expect(isBuilderCustomPageUrl('/builder/')).toBe(false);
    expect(isBuilderCustomPageUrl('/home')).toBe(false);
  });
});

describe('preloadInitialDynamicComponents', () => {
  it('preloads page and branding component types before the first render', async () => {
    const page = { body: [{ type: 'article' }], title: 'Article' } as IPage;
    const branding = { footer: { type: 'text' } };
    const preloadComponentTypes = vi.fn(() => Promise.resolve());
    const loadPageContent = vi.fn(() => of(page));

    TestBed.configureTestingModule({
      providers: [
        {
          provide: ContentService,
          useValue: {
            pageUrl: '/node/36',
            loadBranding: () => of(branding),
            loadPageContent,
          },
        },
        { provide: ComponentService, useValue: { preloadComponentTypes } },
      ],
    });

    await TestBed.runInInjectionContext(preloadInitialDynamicComponents);

    expect(loadPageContent).toHaveBeenCalledWith('/node/36', false);
    expect(preloadComponentTypes).toHaveBeenCalledWith({ branding, page });
  });
});

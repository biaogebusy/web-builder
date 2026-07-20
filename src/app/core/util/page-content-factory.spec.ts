import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import type { IPage } from '@core/interface/IAppConfig';
import { pageContentFactory } from '@core/factory/factory';
import { ContentService } from '@core/service/content.service';
import { ContentState } from '@core/state/ContentState';
import { CORE_CONFIG } from '@core/token/token-providers';
import { of, Subject } from 'rxjs';

describe('pageContentFactory', () => {
  it('reloads page content after navigation within the wildcard page route', async () => {
    const routerEvents = new Subject<NavigationEnd>();
    let currentUrl = '/home';
    const loadPageContent = vi.fn((pageUrl: string) => of({ body: [], title: pageUrl } as IPage));

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
            loadConfig: () => Promise.resolve(),
            loadPageContent,
          },
        },
        {
          provide: ContentState,
          useValue: { pageConfig: signal(undefined) },
        },
        { provide: CORE_CONFIG, useValue: {} },
      ],
    });

    const pageContent = TestBed.runInInjectionContext(pageContentFactory);
    await vi.waitFor(() => expect(loadPageContent).toHaveBeenCalledWith('/home'));

    currentUrl = '/calendar';
    routerEvents.next(new NavigationEnd(2, '/calendar', '/calendar'));

    await vi.waitFor(() => expect(loadPageContent).toHaveBeenCalledWith('/calendar'));
    const currentPage = pageContent();
    expect(currentPage).toBeTruthy();
    if (!currentPage) {
      throw new Error('Expected calendar page content');
    }
    expect(currentPage.title).toBe('/calendar');
  });
});

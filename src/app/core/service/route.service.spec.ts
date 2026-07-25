import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { ContentService } from '@core/service/content.service';
import { RouteService } from '@core/service/route.service';
import { ContentState } from '@core/state/ContentState';
import { createContentServiceMock } from '@core/testing/mocks';
import { of } from 'rxjs';

describe('RouteService', () => {
  let service: RouteService;
  let contentState: ContentState;
  const contentService = createContentServiceMock();

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: ContentService, useValue: contentService }],
    });
    service = TestBed.inject(RouteService);
    contentState = TestBed.inject(ContentState);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  it('detects absolute urls including protocol-relative ones', () => {
    expect(service.isAbsolute('https://example.com')).toBe(true);
    expect(service.isAbsolute('//cdn.example.com/x.js')).toBe(true);
    expect(service.isAbsolute('/about')).toBe(false);
    expect(service.isAbsolute('about')).toBe(false);
  });

  it('opens pictures in the drawer as an image widget', () => {
    const event = { preventDefault: vi.fn() };

    service.toNavigate(event, { href: '/files/hero.png', drawerIframe: true, label: '效果图' });

    expect(contentState.drawerOpened()).toBe(true);
    expect(contentState.drawerLoading()).toBe(false);
    const drawer = contentState.drawerContent() as { title: string; body: { type: string }[] };
    expect(drawer.title).toBe('效果图');
    expect(drawer.body[0].type).toBe('img');
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('opens other drawer links as an iframe widget', () => {
    service.toNavigate(undefined, { href: 'https://example.com/report', drawerIframe: true });

    const drawer = contentState.drawerContent() as { body: { type: string }[] };
    expect(drawer.body[0].type).toBe('iframe');
  });

  it('navigates internally for relative links', () => {
    const router = TestBed.inject(Router);
    const navigate = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    const event = { preventDefault: vi.fn() };

    service.toNavigate(event, { href: '/about' });

    expect(navigate).toHaveBeenCalledWith(['/about']);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('opens absolute links in a window instead of routing', () => {
    const open = vi.spyOn(window, 'open').mockReturnValue(null);

    service.toNavigate(undefined, { href: 'https://example.com', target: '_blank' });

    expect(open).toHaveBeenCalledWith('https://example.com', '_blank');
  });

  it('hands manage/print/export paths to the browser', () => {
    const open = vi.spyOn(window, 'open').mockReturnValue(null);

    service.toNavigate(undefined, { href: '/manage/media' });

    expect(open).toHaveBeenCalledWith('/manage/media', '_self');
  });

  it('rewrites the url with the merged query params', () => {
    const location = TestBed.inject(Location);
    const go = vi.spyOn(location, 'go');

    service.updateQueryParams({ page: 2 });

    expect(go).toHaveBeenCalledWith(expect.stringContaining('page=2'));
  });

  it('loads drawer-linked pages into the drawer', () => {
    contentService.loadPageContent.mockReturnValueOnce(of({ title: '文档', body: [] }));
    const event = {
      target: {
        nodeName: 'A',
        href: 'http://localhost/docs/guide',
        host: 'localhost',
        rel: 'drawer',
      },
      preventDefault: vi.fn(),
    };

    service.eventLinkToNav(event);

    expect(contentService.loadPageContent).toHaveBeenCalledWith('/docs/guide');
    expect(contentState.drawerContent()).toEqual({ title: '文档', body: [] });
    expect(contentState.drawerLoading()).toBe(false);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('routes plain anchor clicks through the router', () => {
    const router = TestBed.inject(Router);
    const navigate = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    const event = {
      target: {
        nodeName: 'A',
        href: 'http://localhost/about',
        host: 'localhost',
        rel: '',
        target: '',
      },
      preventDefault: vi.fn(),
    };

    service.eventLinkToNav(event);

    expect(navigate).toHaveBeenCalledWith(['/about']);
    expect(event.preventDefault).toHaveBeenCalled();
  });
});

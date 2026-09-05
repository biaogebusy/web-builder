import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import type { IPage } from '@core/interface/IAppConfig';
import { TagsService } from '@core/service/tags.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import { environment } from 'src/environments/environment';

const createUtilMock = () => ({
  loadStyle: vi.fn(() => Promise.resolve()),
});

describe('TagsService', () => {
  let service: TagsService;
  let doc: Document;
  let meta: Meta;

  const head = () => doc.head;
  const alternates = () =>
    Array.from(head().querySelectorAll('link[rel="alternate"][hreflang]')).map(el => [
      el.getAttribute('hreflang'),
      el.getAttribute('href'),
    ]);

  const page = (overrides: Partial<IPage> = {}): IPage =>
    ({ title: '首页', body: [], ...overrides }) as IPage;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        { provide: CORE_CONFIG, useValue: {} },
        { provide: UtilitiesService, useValue: createUtilMock() },
      ],
    });
    doc = TestBed.inject(DOCUMENT);
    doc.head.querySelectorAll('link, script[type="application/ld+json"]').forEach(el => el.remove());
    service = TestBed.inject(TagsService);
    meta = TestBed.inject(Meta);
  });

  afterEach(() => {
    doc.head.querySelectorAll('link, script[type="application/ld+json"]').forEach(el => el.remove());
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  it('adds preconnect hints for the api origin on creation', () => {
    const origin = new URL(environment.apiUrl).origin;

    expect(head().querySelector(`link[rel="preconnect"][href="${origin}"]`)).not.toBeNull();
    expect(head().querySelector(`link[rel="dns-prefetch"][href="${origin}"]`)).not.toBeNull();
  });

  it('sets the document title from the page', () => {
    service.updateTags(page({ title: '关于我们' }));

    expect(TestBed.inject(Title).getTitle()).toBe('关于我们');
  });

  it('derives the social tags from the page meta', () => {
    service.updateTags(
      page({
        title: '产品',
        meta: [
          { name: 'description', content: '产品介绍' },
          { property: 'og:image', content: 'https://cdn.example.com/og.png' },
        ],
      } as Partial<IPage>)
    );

    expect(meta.getTag('property="og:title"')?.content).toBe('产品');
    expect(meta.getTag('property="og:description"')?.content).toBe('产品介绍');
    expect(meta.getTag('property="og:image"')?.content).toBe('https://cdn.example.com/og.png');
    expect(meta.getTag('property="og:type"')?.content).toBe('website');
    expect(meta.getTag('property="og:url"')?.content).toBe(doc.location.href);
    expect(meta.getTag('name="twitter:card"')?.content).toBe('summary_large_image');
    expect(meta.getTag('name="twitter:title"')?.content).toBe('产品');
    expect(meta.getTag('name="twitter:description"')?.content).toBe('产品介绍');
    expect(meta.getTag('name="twitter:image"')?.content).toBe('https://cdn.example.com/og.png');
  });

  it('resets description and keywords and uses the fallback image when the page has no meta', () => {
    service.updateTags(page());

    expect(meta.getTag('name="description"')?.content).toBe('');
    expect(meta.getTag('name="keywords"')?.content).toBe('');
    expect(meta.getTag('property="og:image"')?.content).toBe(
      `${doc.location.origin}/assets/images/favicon.png`
    );
  });

  it('keeps a single canonical link and updates it across pages', () => {
    service.updateTags(page());
    service.updateTags(page({ title: '第二页' }));

    const canonical = head().querySelectorAll('link[rel="canonical"]');
    expect(canonical.length).toBe(1);
    expect(canonical[0].getAttribute('href')).toBe(doc.location.href);
  });

  describe('hreflang', () => {
    it('emits one alternate per language plus x-default', () => {
      service.updateTags(page());

      const langs = environment.langs ?? [];
      const links = alternates();
      expect(links.length).toBe(langs.length + 1);
      expect(links).toContainEqual(['x-default', `${doc.location.origin}${doc.location.pathname}`]);
      // Default language keeps the bare path, others get their lang prefix
      expect(links).toContainEqual(['zh-hans', `${doc.location.origin}${doc.location.pathname}`]);
      expect(links).toContainEqual([
        'en',
        `${doc.location.origin}/en${doc.location.pathname === '/' ? '/' : doc.location.pathname}`,
      ]);
    });

    it('strips an existing lang prefix instead of stacking prefixes', () => {
      // jsdom's location cannot be redefined, so run this case against a document
      // stub that only overrides location and delegates the rest.
      const location = {
        origin: 'https://example.com',
        pathname: '/en/about',
        href: 'https://example.com/en/about',
      };
      const docStub = {
        location,
        head: doc.head,
        createElement: (tag: string) => doc.createElement(tag),
        querySelector: (selector: string) => doc.querySelector(selector),
        querySelectorAll: (selector: string) => doc.querySelectorAll(selector),
      };
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          { provide: CORE_CONFIG, useValue: {} },
          { provide: UtilitiesService, useValue: createUtilMock() },
          { provide: DOCUMENT, useValue: docStub },
        ],
      });

      TestBed.inject(TagsService).updateTags(page());

      expect(alternates()).toEqual(
        expect.arrayContaining([
          ['zh-hans', 'https://example.com/about'],
          ['en', 'https://example.com/en/about'],
          ['x-default', 'https://example.com/about'],
        ])
      );
    });

    it('does not accumulate stale alternates across navigations', () => {
      service.updateTags(page());
      const first = alternates().length;

      service.updateTags(page({ title: '第二页' }));

      expect(alternates().length).toBe(first);
    });
  });

  describe('json-ld', () => {
    it('describes a plain page as a WebPage', () => {
      service.updateTags(page({ title: '首页', langcode: 'zh-hans' } as Partial<IPage>));

      const schema = JSON.parse(
        head().querySelector('script[type="application/ld+json"]')?.textContent ?? '{}'
      );
      expect(schema['@type']).toBe('WebPage');
      expect(schema['name']).toBe('首页');
      expect(schema['headline']).toBe('首页');
      expect(schema['url']).toBe(doc.location.href);
      expect(schema['inLanguage']).toBe('zh-hans');
      expect(schema['datePublished']).toBeUndefined();
    });

    it('describes a dated page as an Article and carries the dates', () => {
      service.updateTags(
        page({ time: '2026-01-01', changed: '2026-02-02', langcode: 'en' } as Partial<IPage>)
      );

      const schema = JSON.parse(
        head().querySelector('script[type="application/ld+json"]')?.textContent ?? '{}'
      );
      expect(schema['@type']).toBe('Article');
      expect(schema['datePublished']).toBe('2026-01-01');
      expect(schema['dateModified']).toBe('2026-02-02');
      expect(schema['inLanguage']).toBe('en');
    });

    it('reuses the existing script tag rather than appending a new one', () => {
      service.updateTags(page());
      service.updateTags(page({ title: '第二页' }));

      expect(head().querySelectorAll('script[type="application/ld+json"]').length).toBe(1);
    });

    it('defaults the language to zh-hans', () => {
      service.updateTags(page());

      const schema = JSON.parse(
        head().querySelector('script[type="application/ld+json"]')?.textContent ?? '{}'
      );
      expect(schema['inLanguage']).toBe('zh-hans');
    });
  });
});

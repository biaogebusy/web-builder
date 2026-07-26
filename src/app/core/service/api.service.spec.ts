import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ApiService } from '@core/service/api.service';
import { API_URL } from '@core/token/token-providers';

describe('ApiService url and pager helpers', () => {
  function createService(pathname = '/', search = ''): ApiService {
    TestBed.configureTestingModule({
      providers: [
        { provide: DOCUMENT, useValue: { location: { pathname, search } } },
        { provide: HttpClient, useValue: {} },
        { provide: API_URL, useValue: '' },
      ],
    });
    return TestBed.inject(ApiService);
  }

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('returns the plain pathname as the page url', () => {
    expect(createService('/en/about').pageUrl).toBe('/en/about');
  });

  it('keeps whitelisted query params on the page url', () => {
    expect(createService('/en/about', '?version=2').pageUrl).toBe('/en/about&version=2');
  });

  it('drops non-whitelisted query params from the page url', () => {
    expect(createService('/en/about', '?utm_source=x').pageUrl).toBe('/en/about');
  });

  it('resolves the language from the url prefix', () => {
    expect(createService().getLang('/en/about')?.langCode).toBe('en');
  });

  it('falls back to the default language for unknown prefixes', () => {
    const lang = createService().getLang('/fr/about');

    expect(lang?.langCode).toBe('zh-hans');
    expect(lang?.default).toBe(true);
  });

  it('splits a prefixed url into lang and path', () => {
    expect(createService().getUrlPath('/en/about')).toEqual({ lang: '/en', path: '/about' });
  });

  it('keeps default-language urls unprefixed', () => {
    expect(createService().getUrlPath('/about')).toEqual({ lang: '', path: '/about' });
  });

  it('normalizes the empty drupal views pager', () => {
    const pager = createService().handlerPager(
      { current_page: null, total_pages: 0, total_items: 0 },
      5
    );

    expect(pager).toEqual({ itemsPerPage: 5, currentPage: 0, totalItems: 0, totalPages: 0 });
  });

  it('maps a filled drupal views pager one to one', () => {
    const pager = createService().handlerPager({
      current_page: 2,
      total_pages: 10,
      total_items: 95,
      items_per_page: 10,
    });

    expect(pager).toEqual({ itemsPerPage: 10, currentPage: 2, totalItems: 95, totalPages: 10 });
  });
});

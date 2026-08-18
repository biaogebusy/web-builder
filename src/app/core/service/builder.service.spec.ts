import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import type { IPage } from '@core/interface/IAppConfig';
import { BuilderState } from '@core/state/BuilderState';
import { API_URL } from '@core/token/token-providers';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'ngx-webstorage';
import { of, throwError } from 'rxjs';
import { BuilderService } from './builder.service';
import { ContentService } from './content.service';
import { NodeService } from './node.service';
import { UtilitiesService } from './utilities.service';

describe('BuilderService', () => {
  const patch = vi.fn((_url: string, _body: unknown, _options: unknown) => of({ status: true }));
  const post = vi.fn((_url: string, _body: unknown, _options: unknown) => of({ status: true }));
  const loadingSet = vi.fn();
  const loadNewPage = vi.fn();
  const fetch = vi.fn();
  const openSnackbar = vi.fn();

  const createService = (): BuilderService => {
    TestBed.configureTestingModule({
      providers: [
        BuilderService,
        { provide: API_URL, useValue: 'https://example.com' },
        { provide: DOCUMENT, useValue: document },
        { provide: HttpClient, useValue: { patch, post } },
        { provide: MatDialog, useValue: {} },
        {
          provide: BuilderState,
          useValue: { loading: { set: loadingSet }, loadNewPage },
        },
        { provide: UtilitiesService, useValue: { openSnackbar } },
        { provide: NodeService, useValue: { fetch } },
        { provide: ContentService, useValue: { loadBuilderConfig: () => of({}) } },
        { provide: Router, useValue: { url: '/builder' } },
        { provide: LocalStorageService, useValue: {} },
        { provide: TranslateService, useValue: { instant: (key: string) => key } },
      ],
    });
    return TestBed.inject(BuilderService);
  };

  beforeEach(() => {
    vi.clearAllMocks();
    fetch.mockReset();
    TestBed.resetTestingModule();
  });

  it('loads a page and clears the loading state', () => {
    fetch.mockReturnValueOnce(
      of({
        nid: '42',
        title: 'Test page',
        body: [{ uuid: 'body-1', type: 'json', attributes: { body: { type: 'text' } } }],
        status: true,
      })
    );
    const service = createService();

    service.loadPage({ nid: '42', langcode: 'zh-hans' });

    expect(loadNewPage).toHaveBeenCalledOnce();
    expect(loadingSet).toHaveBeenCalledWith(false);
    expect(openSnackbar).toHaveBeenCalledWith('BUILDER.PAGE_LIST.LOADED_PAGE', 'ok');
  });

  it('clears the loading state and reports a failed page load', () => {
    fetch.mockReturnValueOnce(throwError(() => new Error('request failed')));
    const service = createService();

    service.loadPage({ nid: '42', langcode: 'zh-hans' });

    expect(loadNewPage).not.toHaveBeenCalled();
    expect(loadingSet).toHaveBeenCalledWith(false);
    expect(openSnackbar).toHaveBeenCalledWith('BUILDER.PAGE_LIST.LOAD_PAGE_FAIL', 'ok');
  });

  it('patches the landing page endpoint and skips reloading after a toolbar update', () => {
    const service = createService();
    const loadPage = vi.spyOn(service, 'loadPage');
    const page = { nid: '42', title: 'Test page', body: [] } as IPage;

    service.updateLandingPage(page, false).subscribe();

    expect(loadingSet).toHaveBeenCalledWith(true);
    expect(patch).toHaveBeenCalledOnce();
    expect(patch.mock.calls[0][0]).toBe('https://example.com/api/v3/landingPage/update/42');
    expect(loadPage).not.toHaveBeenCalled();
  });

  it('posts to the translation delete endpoint for the given language', () => {
    const service = createService();

    service.deleteTranslation('42', 'en').subscribe();

    expect(post).toHaveBeenCalledOnce();
    expect(post.mock.calls[0][0]).toBe(
      'https://example.com/api/v3/landingPage/translations/delete/42/en'
    );
  });
});

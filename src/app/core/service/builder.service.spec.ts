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
  const getLocalPageByPage = vi.fn((_page: Partial<IPage>): IPage | undefined => undefined);
  const deleteLocalPageByPage = vi.fn();
  const updateSuccessNext = vi.fn();
  // Restores are confirmed in a dialog, so the default answer is yes
  const dialogOpen = vi.fn((_component: unknown, _config: unknown) => ({
    afterClosed: () => of(true),
  }));

  const createService = (): BuilderService => {
    TestBed.configureTestingModule({
      providers: [
        BuilderService,
        { provide: API_URL, useValue: 'https://example.com' },
        { provide: DOCUMENT, useValue: document },
        { provide: HttpClient, useValue: { patch, post } },
        { provide: MatDialog, useValue: { open: dialogOpen } },
        {
          provide: BuilderState,
          useValue: {
            loading: { set: loadingSet },
            loadNewPage,
            getLocalPageByPage,
            deleteLocalPageByPage,
            updateSuccess$: { next: updateSuccessNext },
          },
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
    getLocalPageByPage.mockReturnValue(undefined);
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

  it('reloads a clean canvas page in place after a page json update', () => {
    getLocalPageByPage.mockReturnValue({ nid: '42', current: true } as IPage);
    const service = createService();
    const loadPage = vi.spyOn(service, 'loadPage').mockImplementation(() => undefined);
    let updated: boolean | undefined;

    service
      .updatePageJSON({ nid: '42', langcode: 'zh-hans' }, { title: '页面', body: [] })
      .subscribe(res => (updated = res));

    expect(patch.mock.calls[0][0]).toBe('https://example.com/api/v3/landingPage/update/42');
    expect(openSnackbar).toHaveBeenCalledWith('更新成功！', 'ok');
    expect(loadPage).toHaveBeenCalledWith({ nid: '42', langcode: 'zh-hans' });
    expect(deleteLocalPageByPage).not.toHaveBeenCalled();
    expect(updated).toBe(true);
  });

  it('drops the stale local copy of a page that is not on the canvas', () => {
    getLocalPageByPage.mockReturnValue({ nid: '42' } as IPage);
    const service = createService();
    const loadPage = vi.spyOn(service, 'loadPage').mockImplementation(() => undefined);

    service.updatePageJSON({ nid: '42', langcode: 'zh-hans' }, { title: '页面', body: [] }).subscribe();

    expect(deleteLocalPageByPage).toHaveBeenCalledWith({ nid: '42', langcode: 'zh-hans' });
    expect(loadPage).not.toHaveBeenCalled();
  });

  it('leaves a dirty canvas draft untouched after a page json update', () => {
    getLocalPageByPage.mockReturnValue({ nid: '42', current: true, dirty: true } as IPage);
    const service = createService();
    const loadPage = vi.spyOn(service, 'loadPage').mockImplementation(() => undefined);

    service.updatePageJSON({ nid: '42' }, { title: '页面', body: [] }).subscribe();

    expect(loadPage).not.toHaveBeenCalled();
    expect(deleteLocalPageByPage).not.toHaveBeenCalled();
  });

  it('reports a failed page json update without syncing the local copy', () => {
    patch.mockReturnValueOnce(throwError(() => new Error('422')));
    getLocalPageByPage.mockReturnValue({ nid: '42', current: true } as IPage);
    const service = createService();
    const loadPage = vi.spyOn(service, 'loadPage').mockImplementation(() => undefined);
    let updated: boolean | undefined;

    service
      .updatePageJSON({ nid: '42' }, { title: '页面', body: [] })
      .subscribe(res => (updated = res));

    expect(openSnackbar).toHaveBeenCalledWith('更新失败，请重试', 'ok');
    expect(loadPage).not.toHaveBeenCalled();
    expect(updated).toBe(false);
  });

  it('posts to the translation delete endpoint for the given language', () => {    const service = createService();

    service.deleteTranslation('42', 'en').subscribe();

    expect(post).toHaveBeenCalledOnce();
    expect(post.mock.calls[0][0]).toBe(
      'https://example.com/api/v3/landingPage/translations/delete/42/en'
    );
  });

  it('marks a previewed draft with the revision it was loaded from', () => {
    fetch.mockReturnValueOnce(of({ nid: '42', title: 'Old page', body: [], status: true }));
    const service = createService();

    service.loadPageRevision({ nid: '42', vid: '28' });

    expect(fetch.mock.calls[0][0]).toBe('/api/v3/landingPage/revisions/42/28');
    expect(loadNewPage).toHaveBeenCalledWith(
      expect.objectContaining({ dirty: true, revisionVid: '28' })
    );
  });

  it('saves an old revision as the newest one and reloads what the server now serves', () => {
    getLocalPageByPage.mockReturnValue({ nid: '42', current: true } as IPage);
    fetch
      .mockReturnValueOnce(of({ nid: '42', title: 'Old page', body: [], status: true, vid: '30' }))
      .mockReturnValueOnce(of({ nid: '42', title: 'Old page', body: [], status: true, vid: '31' }));
    const service = createService();

    service.restoreRevision({ nid: '42', vid: '28' });

    expect(patch).toHaveBeenCalledOnce();
    expect(patch.mock.calls[0][0]).toBe('https://example.com/api/v3/landingPage/update/42');
    expect(fetch.mock.calls[1][0]).toBe('/api/v3/landingPage/json/42');
    // Keeping the drawer open leaves the revision list the restore started from in place
    expect(loadNewPage).toHaveBeenCalledWith(expect.objectContaining({ vid: '31' }), false);
    expect(updateSuccessNext).toHaveBeenCalledWith(true);
  });

  // Restores can be started from the page list, for a page other than the one being edited
  it('drops the local copy of a restored page instead of opening it on the canvas', () => {
    getLocalPageByPage.mockReturnValue({ nid: '42' } as IPage);
    fetch.mockReturnValueOnce(of({ nid: '42', title: 'Old page', body: [], status: true }));
    const service = createService();

    service.restoreRevision({ nid: '42', vid: '28' });

    expect(patch).toHaveBeenCalledOnce();
    expect(deleteLocalPageByPage).toHaveBeenCalledWith({ nid: '42', langcode: undefined });
    expect(loadNewPage).not.toHaveBeenCalled();
    expect(updateSuccessNext).toHaveBeenCalledWith(true);
  });

  it('restores nothing when the confirm is dismissed', () => {
    dialogOpen.mockReturnValueOnce({ afterClosed: () => of(false) });
    const service = createService();

    service.restoreRevision({ nid: '42', vid: '28' });

    expect(fetch).not.toHaveBeenCalled();
    expect(patch).not.toHaveBeenCalled();
  });

  it('keeps the draft when the revision behind a restore cannot be read', () => {
    fetch.mockReturnValueOnce(of({ status: false, message: 'Invalid revision' }));
    const service = createService();

    service.restoreRevision({ nid: '42', vid: '28' });

    expect(patch).not.toHaveBeenCalled();
    expect(loadNewPage).not.toHaveBeenCalled();
    expect(openSnackbar).toHaveBeenCalledWith('BUILDER.REVISION.LOAD_FAIL', 'ok');
  });
});

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import type { IPage } from '@core/interface/IAppConfig';
import { BuilderState } from '@core/state/BuilderState';
import { API_URL } from '@core/token/token-providers';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Subject, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BuilderService } from './builder.service';
import { ContentService } from './content.service';
import { NodeService } from './node.service';
import { ScreenService } from './screen.service';
import { UtilitiesService } from './utilities.service';

describe('BuilderService', () => {
  const patch = vi.fn((_url: string, _body: unknown, _options: unknown) => of({ status: true }));
  const post = vi.fn((_url: string, _body: unknown, _options: unknown) => of({ status: true }));
  const get = vi.fn((_url: string): any => of({ data: {} }));
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

  const createService = (pages?: IPage[]): BuilderService => {
    TestBed.configureTestingModule({
      providers: [
        BuilderService,
        { provide: API_URL, useValue: 'https://example.com' },
        { provide: DOCUMENT, useValue: document },
        { provide: HttpClient, useValue: { patch, post, get } },
        { provide: MatDialog, useValue: { open: dialogOpen } },
        BuilderState,
        { provide: UtilitiesService, useValue: { openSnackbar } },
        { provide: NodeService, useValue: { fetch } },
        { provide: ContentService, useValue: { loadBuilderConfig: () => of({}) } },
        { provide: Router, useValue: { url: '/builder' } },
        { provide: LocalStorageService, useValue: {
          retrieve: () => pages ?? [{ title: 'Current draft', body: [], current: true }],
          store: vi.fn(),
        } },
        { provide: ScreenService, useValue: {
          isPlatformBrowser: () => false, scrollToAnchor: vi.fn(),
        } },
        { provide: TranslateService, useValue: { instant: (key: string) => key } },
      ],
    });
    const service = TestBed.inject(BuilderService);
    if (!pages) {
      const state = TestBed.inject(BuilderState);
      vi.spyOn(state.loading, 'set').mockImplementation(loadingSet);
      vi.spyOn(state, 'loadNewPage').mockImplementation(loadNewPage);
      vi.spyOn(state, 'getLocalPageByPage').mockImplementation(getLocalPageByPage);
      vi.spyOn(state, 'deleteLocalPageByPage').mockImplementation(deleteLocalPageByPage);
      vi.spyOn(state.updateSuccess$, 'next').mockImplementation(updateSuccessNext);
    }
    return service;
  };

  beforeEach(() => {
    TestBed.resetTestingModule();
    vi.clearAllMocks();
    fetch.mockReset();
    dialogOpen.mockReset();
    get.mockReturnValue(of({ data: {} }));
    getLocalPageByPage.mockReturnValue(undefined);
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

  it.each([
    ['zh-hans', 'zh-hans', ''], ['en', 'en', ''],
    ['zh-hans', 'en', '/en'], ['en', 'zh-hans', '/zh-hans'],
  ])('keeps page updates language-aware with default %s and content %s', (defaultLang, langcode, prefix) => {
    const languages = environment.langs;
    try {
      environment.langs = languages?.map(lang => ({
        ...lang, default: lang.langCode === defaultLang,
      }));
      const service = createService();
      const page = { nid: '42', uuid: 'page-42', langcode, title: 'Updated page', body: [] };
      service.updateLandingPage(page, false).subscribe();
      expect(patch).toHaveBeenLastCalledWith(
        `https://example.com${prefix}/api/v3/landingPage/update/42`,
        expect.objectContaining({ nid: '42', langcode }), expect.anything()
      );

      service.updateAttributes(page, '/api/v1/node/landing_page', { title: page.title }, {})
        .subscribe();
      expect(patch).toHaveBeenLastCalledWith(
        `${prefix}/api/v1/node/landing_page/page-42`,
        { data: { type: 'node--landing_page', id: 'page-42',
          attributes: { title: 'Updated page' }, relationships: {} } }, expect.anything()
      );
    } finally {
      environment.langs = languages;
    }
  });

  it('shows the server refusal once and preserves the unsaved page', () => {
    const page: IPage = { title: 'About us', body: [{ type: 'text' }] };
    post.mockReturnValueOnce(throwError(() => new HttpErrorResponse({
      status: 403,
      error: { status: false, code: 'permission_denied', message: 'No permission to publish this page.' },
    })));
    const service = createService();
    const next = vi.fn();

    service.createLandingPage(page, false).subscribe(next);

    expect(next).toHaveBeenCalledWith(false);
    expect(openSnackbar).toHaveBeenCalledExactlyOnceWith('No permission to publish this page.', 'ok', { duration: 6000 });
    expect(loadingSet).toHaveBeenLastCalledWith(false);
    expect(deleteLocalPageByPage).not.toHaveBeenCalled();
    expect(loadNewPage).not.toHaveBeenCalled();
    expect(post).toHaveBeenCalledTimes(1);
    expect(page).toEqual({ title: 'About us', body: [{ type: 'text' }] });
  });

  it.each([
    [0, '网络连接失败，请检查网络并确认页面是否已保存'],
    [401, '登录已失效，请重新登录后保存页面'],
    [403, '没有创建页面或组件的权限，请联系管理员检查权限'],
    [500, '创建页面失败，请重试'],
  ])('shows a safe fallback for HTTP %s without a JSON message', (status, message) => {
    post.mockReturnValueOnce(throwError(() => new HttpErrorResponse({ status, error: '<html>error</html>' })));
    const service = createService();

    service.createLandingPage({ title: 'Page', body: [{ type: 'text' }] }, false).subscribe();

    expect(openSnackbar).toHaveBeenCalledExactlyOnceWith(message, 'ok', { duration: 6000 });
    expect(loadingSet).toHaveBeenLastCalledWith(false);
    expect(post).toHaveBeenCalledTimes(1);
  });

  it('shows a business refusal without trying to read a missing page ID', () => {
    post.mockReturnValueOnce(of({ status: false, message: 'Please choose a page title.' }));
    const next = vi.fn();

    createService().createLandingPage({ title: 'Page', body: [{ type: 'text' }] }).subscribe(next);

    expect(next).toHaveBeenCalledWith(false);
    expect(openSnackbar).toHaveBeenCalledExactlyOnceWith('Please choose a page title.', 'ok', { duration: 6000 });
    expect(fetch).not.toHaveBeenCalled();
  });

  it('keeps the successful creation response and loads its page', () => {
    const response = { status: true, message: 'Saved', data: { nid: 42 } };
    post.mockReturnValueOnce(of(response));
    const service = createService();
    const loadPage = vi.spyOn(service, 'loadPage').mockImplementation(() => undefined);
    const next = vi.fn();

    service.createLandingPage({ title: 'Page', body: [{ type: 'text' }] }).subscribe(next);

    expect(next).toHaveBeenCalledWith(response);
    expect(loadPage).toHaveBeenCalledExactlyOnceWith({ nid: '42' }, true);
    expect(openSnackbar).not.toHaveBeenCalled();
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

  it('shows an update refusal once without retrying or reloading the page', () => {
    patch.mockReturnValueOnce(throwError(() => new HttpErrorResponse({
      status: 409, error: { code: 'version_conflict', message: 'Reload the latest page before saving.' },
    })));
    const service = createService();
    const loadPage = vi.spyOn(service, 'loadPage');
    const next = vi.fn();

    service.updateLandingPage({ nid: '42', title: 'Page', body: [] }, false).subscribe(next);

    expect(next).toHaveBeenCalledWith(false);
    expect(openSnackbar).toHaveBeenCalledExactlyOnceWith('Reload the latest page before saving.', 'ok', { duration: 6000 });
    expect(loadingSet).toHaveBeenLastCalledWith(false);
    expect(patch).toHaveBeenCalledTimes(1);
    expect(loadPage).not.toHaveBeenCalled();
    expect(deleteLocalPageByPage).not.toHaveBeenCalled();
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

    expect(openSnackbar).toHaveBeenCalledExactlyOnceWith('更新失败，请重试', 'ok', { duration: 6000 });
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

  it('rejects a translation deletion when the CMS returns a business failure', async () => {
    const service = createService();
    post.mockReturnValueOnce(of({ status: false }));
    await expect(new Promise((resolve, reject) => service.deleteTranslation('42', 'en')
      .subscribe({ next: resolve, error: reject }))).rejects
      .toThrow('The CMS did not confirm translation deletion.');
  });

  // Patching the node's path field over JSON:API drops the pathauto flag that marks an
  // alias as hand-written — core copies the parsed field across with getValue(), which
  // skips computed properties — so the write goes through a backend endpoint that sets
  // the field server-side and covers every translation in one save
  it('posts a page alias to the backend alias endpoint', async () => {
    const service = createService();

    const written = await service.updateUrlalias({ nid: '42', langcode: 'zh-hans' }, '/about');

    expect(written).toBe(true);
    expect(post).toHaveBeenCalledOnce();
    expect(post.mock.calls[0][0]).toBe('https://example.com/api/v3/landingPage/alias/42');
    expect(post.mock.calls[0][1]).toEqual({ alias: '/about' });
    // The backend aligns the other languages inside that save, so nothing else runs here
    expect(get).not.toHaveBeenCalled();
    expect(patch).not.toHaveBeenCalled();
  });

  // The alias field is prefilled with the language prefix of the page it belongs to
  it('drops a leading language prefix without touching the rest of the alias', async () => {
    const service = createService();

    await service.updateUrlalias({ nid: '42', langcode: 'en' }, '/en/enterprise');

    expect((post.mock.calls[0][1] as any).alias).toBe('/enterprise');

    post.mockClear();
    await service.updateUrlalias({ nid: '42', langcode: 'en' }, '/enterprise');

    expect((post.mock.calls[0][1] as any).alias).toBe('/enterprise');
  });

  it('reports a refusal the backend answers with a false status', async () => {
    post.mockReturnValueOnce(of({ status: false, message: 'Missing alias' }));
    const service = createService();

    await expect(
      service.updateUrlalias({ nid: '42', langcode: 'zh-hans' }, '/about')
    ).resolves.toBe(false);
  });

  it('reports a taken alias and rejects before the rest of the settings are saved', async () => {
    post.mockReturnValueOnce(throwError(() => ({ status: 409 })));
    const service = createService();

    await expect(
      service.updateUrlalias({ nid: '42', langcode: 'zh-hans' }, '/about')
    ).rejects.toEqual({ status: 409 });
    expect(openSnackbar).toHaveBeenCalledWith('URL 已存在，请更换后重试', 'ok');
  });

  // The backend creates the target language alias inside the same save now
  it('creates a translation without patching alias records afterwards', () => {
    const service = createService();

    service
      .addTranslation({
        nid: '42',
        langcode: 'zh-hans',
        target: 'en',
        title: 'Home',
        body: [],
      } as IPage)
      .subscribe();

    expect(post).toHaveBeenCalledOnce();
    expect(post.mock.calls[0][0]).toBe(
      'https://example.com/api/v3/landingPage/translations/add/42/zh-hans/en'
    );
    expect(get).not.toHaveBeenCalled();
    expect(patch).not.toHaveBeenCalled();
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

  describe('revision draft requests', () => {
    const revision = (vid: string, langcode = 'en'): IPage => ({
      nid: '42', langcode, title: `Revision ${vid}`, body: [], status: true,
      vid: '31', changed: '1740226733',
    });
    let first: Subject<IPage>;
    let latest: Subject<IPage>;
    let service: BuilderService;

    beforeEach(() => {
      first = new Subject<IPage>();
      latest = new Subject<IPage>();
      fetch.mockReturnValueOnce(first).mockReturnValueOnce(latest);
      service = createService();
      service.loadPageRevision({ nid: '42', langcode: 'en', vid: '28' });
      service.loadPageRevision({ nid: '42', langcode: 'en', vid: '29' });
    });

    it('keeps the latest revision when an older response arrives last', () => {
      latest.next(revision('29'));
      first.next(revision('28'));

      expect(loadNewPage).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({
        nid: '42', langcode: 'en', title: 'Revision 29', dirty: true,
        revisionVid: '29', vid: '31', changed: '1740226733',
      }));
      expect(openSnackbar).toHaveBeenCalledExactlyOnceWith('BUILDER.REVISION.LOADED', 'ok');
      expect(patch).not.toHaveBeenCalled();
      expect(post).not.toHaveBeenCalled();
    });

    it('does not finish loading when only the replaced read completes', () => {
      first.next(revision('28'));

      expect(loadingSet).not.toHaveBeenCalledWith(false);
      expect(loadNewPage).not.toHaveBeenCalled();
      latest.next(revision('29'));
      expect(loadingSet).toHaveBeenLastCalledWith(false);
    });

    it('unsubscribes the replaced read and ignores its failure', () => {
      expect(first.observed).toBe(false);
      first.error(new HttpErrorResponse({ status: 503 }));

      expect(openSnackbar).not.toHaveBeenCalled();
      expect(loadingSet).not.toHaveBeenCalledWith(false);
      expect(latest.observed).toBe(true);
    });

    it('preserves the draft on a current failure and permits retry', () => {
      latest.error(new HttpErrorResponse({ status: 503 }));
      first.next(revision('28'));

      expect(loadNewPage).not.toHaveBeenCalled();
      expect(openSnackbar).toHaveBeenCalledExactlyOnceWith('BUILDER.REVISION.LOAD_FAIL', 'ok');
      expect(loadingSet).toHaveBeenLastCalledWith(false);
      fetch.mockReturnValueOnce(of(revision('30')));
      service.loadPageRevision({ nid: '42', langcode: 'en', vid: '30' });
      expect(loadNewPage).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({
        revisionVid: '30', title: 'Revision 30', dirty: true,
      }));
    });

    it.each([{ nid: '43', langcode: 'en' }, { nid: '42', langcode: 'zh-hans' }])(
      'keeps a later page selection %j in charge of loading', page => {
        const pageRead = new Subject<IPage>();
        fetch.mockReturnValueOnce(pageRead);
        service.loadPage(page);
        first.next(revision('28'));
        latest.next(revision('29'));

        expect(loadNewPage).not.toHaveBeenCalled();
        expect(openSnackbar).not.toHaveBeenCalled();
        expect(loadingSet).not.toHaveBeenCalledWith(false);
        expect(latest.observed).toBe(false);
        pageRead.next({ ...revision('current'), ...page });
        expect(loadNewPage).toHaveBeenCalledExactlyOnceWith(expect.objectContaining(page));
      }
    );

    it('unsubscribes pending reads when the service is destroyed', () => {
      TestBed.resetTestingModule();
      expect(first.observed).toBe(false);
      expect(latest.observed).toBe(false);
      latest.next(revision('29'));
      expect(loadNewPage).not.toHaveBeenCalled();
    });
  });

  describe('revision reads with real draft selection', () => {
    let read: Subject<IPage>;
    let state: BuilderState;
    const response: IPage = {
      nid: '42', langcode: 'en', title: 'Historical content', body: [], status: true,
      vid: '31', changed: '1740226733',
    };

    beforeEach(() => {
      read = new Subject<IPage>();
      fetch.mockReturnValueOnce(read);
      const service = createService([{
        nid: '42', langcode: 'en', title: 'Current draft', body: [], current: true,
      }, {
        nid: '43', langcode: 'en', title: 'Other draft', body: [], current: false, dirty: true,
      }]);
      state = TestBed.inject(BuilderState);
      service.loadPageRevision({ nid: '42', langcode: 'en', vid: '29' });
    });

    afterEach(() => vi.useRealTimers());

    it.each([{ nid: '43', langcode: 'en' }, { nid: '42', langcode: 'zh-hans' }])(
      'keeps the selected local draft %j after a late revision response', page => {
        state.loadNewPage({ ...page, title: 'Selected draft', body: [], dirty: true });
        read.next(response);

        expect(state.currentPage).toMatchObject({ ...page, title: 'Selected draft', dirty: true });
        expect(state.currentPage.revisionVid).toBeUndefined();
        expect(state.loading()).toBe(false);
        expect(read.observed).toBe(false);
        expect(openSnackbar).not.toHaveBeenCalled();
        expect(patch).not.toHaveBeenCalled();
        expect(post).not.toHaveBeenCalled();
      }
    );

    it('cancels when history selection starts and leaves its loading timer in charge', () => {
      vi.useFakeTimers();
      state.showVersionPage(1);
      expect(read.observed).toBe(false);
      read.error(new HttpErrorResponse({ status: 503 }));
      expect(state.loading()).toBe(true);
      vi.advanceTimersByTime(600);

      expect(state.currentPage).toMatchObject({ nid: '43', dirty: true });
      expect(state.loading()).toBe(false);
      expect(openSnackbar).not.toHaveBeenCalled();
    });

    it('keeps a newly initialized draft after a late revision response', () => {
      vi.useFakeTimers();
      state.initPage([{ title: 'New draft', body: [], current: true }]);
      read.next(response);
      expect(state.loading()).toBe(true);
      vi.advanceTimersByTime(600);

      expect(state.currentPage.title).toBe('New draft');
      expect(state.loading()).toBe(false);
      expect(read.observed).toBe(false);
      expect(openSnackbar).not.toHaveBeenCalled();
    });

    it('does not reopen a removed current draft when its revision arrives', () => {
      state.deleteLocalPage(0);
      read.next(response);

      expect(state.version()).toHaveLength(1);
      expect(state.currentPage).toMatchObject({ nid: '43', dirty: true });
      expect(state.loading()).toBe(false);
      expect(read.observed).toBe(false);
      expect(openSnackbar).not.toHaveBeenCalled();
    });

    it('keeps the revision read when only a background draft is removed', () => {
      state.deleteLocalPage(1);
      expect(read.observed).toBe(true);
      expect(state.loading()).toBe(true);
      read.next(response);

      expect(state.currentPage).toMatchObject({
        nid: '42', revisionVid: '29', vid: '31', changed: '1740226733', dirty: true,
      });
      expect(openSnackbar).toHaveBeenCalledExactlyOnceWith('BUILDER.REVISION.LOADED', 'ok');
      expect(state.loading()).toBe(false);
    });

    it('cancels a pending revision after clearing local history is confirmed', async () => {
      state.clearAllHistory();
      await vi.dynamicImportSettled();
      await vi.waitFor(() => expect(dialogOpen).toHaveBeenCalledOnce());
      read.next(response);

      expect(state.version()).toHaveLength(1);
      expect(state.currentPage.nid).toBeUndefined();
      expect(state.currentPage.body).toEqual([]);
      expect(state.loading()).toBe(false);
      expect(read.observed).toBe(false);
      expect(openSnackbar).not.toHaveBeenCalled();
    });

    it('keeps the pending revision when clearing history is dismissed', async () => {
      dialogOpen.mockReturnValueOnce({ afterClosed: () => of(false) });
      state.clearAllHistory();
      await vi.dynamicImportSettled();
      await vi.waitFor(() => expect(dialogOpen).toHaveBeenCalledOnce());
      expect(read.observed).toBe(true);
      read.next(response);

      expect(state.currentPage).toMatchObject({ nid: '42', revisionVid: '29', dirty: true });
      expect(openSnackbar).toHaveBeenCalledExactlyOnceWith('BUILDER.REVISION.LOADED', 'ok');
    });
  });

  describe('page JSON drawer reads with real builder state', () => {
    let service: BuilderService;
    let state: BuilderState;
    const panel = vi.fn();
    const content = (nid = '1', langcode = 'en'): IPage => ({
      nid, langcode, status: true, title: `JSON ${nid}`, body: [],
    });
    const open = (nid = '1', langcode = 'en') => service.loadPageJSON({ nid, langcode });
    const openSettings = () => service.openPageSetting(
      { uuid: 'settings', langcode: 'en' }, '/api/v1/node/landing_page', { include: 'uid' }
    );
    const settings = { data: { attributes: { title: 'Settings' } } };

    beforeEach(() => {
      service = createService([{
        nid: '42', title: 'Unsaved canvas', body: [], current: true, dirty: true,
      }]);
      state = TestBed.inject(BuilderState);
      state.rightContent$.subscribe(panel);
    });

    afterEach(() => {
      TestBed.resetTestingModule();
      vi.useRealTimers();
    });

    it.each(['page', 'language'])(
      'uses the latest JSON %s and keeps its update target after reversed responses', kind => {
        const first = new Subject<IPage>();
        const latest = new Subject<IPage>();
        fetch.mockReturnValueOnce(first).mockReturnValueOnce(latest);
        open();
        const nid = kind === 'page' ? '2' : '1';
        const langcode = kind === 'language' ? 'zh-hans' : 'en';
        open(nid, langcode);
        latest.next(content(nid, langcode));
        first.next(content());
        expect(panel).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({
          title: 'JSON', mode: 'over', hasBackdrop: true, style: { width: '800px' },
          elements: [expect.objectContaining({
            type: 'jsoneditor', schemaType: 'page', fullWidth: true,
            data: expect.objectContaining({ nid, langcode, title: `JSON ${nid}` }),
            actions: [{ type: 'updatePage', label: '更新JSON', params: { nid, langcode } }],
          })],
        }));
        expect(first.observed).toBe(false);
        expect(latest.observed).toBe(false);
        expect(fetch).toHaveBeenLastCalledWith(
          `/api/v3/landingPage/json/${nid}`, { noCache: 1 }, langcode === 'en' ? 'en' : ''
        );
        expect(state.currentPage).toMatchObject({ title: 'Unsaved canvas', dirty: true });
        expect(post).not.toHaveBeenCalled();
        expect(patch).not.toHaveBeenCalled();
      }
    );

    it.each(['close', 'UI close', 'panel', 'local page', 'remote page', 'destroy'])(
      'cancels pending JSON on %s and ignores a late response', action => {
        const read = new Subject<IPage>();
        fetch.mockReturnValueOnce(read);
        open();
        if (action === 'close') state.closeRightDrawer$.next(true);
        if (action === 'UI close') state.rightDrawerClosed$.next();
        if (action === 'panel') state.rightContent$.next({ title: 'History', elements: [] });
        if (action === 'local page') state.loadNewPage({ title: 'Selected draft', body: [] });
        if (action === 'remote page') {
          fetch.mockReturnValueOnce(new Subject<IPage>());
          service.loadPage({ nid: '2' });
        }
        if (action === 'destroy') TestBed.resetTestingModule();
        panel.mockClear();
        read.next(content());
        expect(panel).not.toHaveBeenCalled();
        expect(read.observed).toBe(false);
        expect(openSnackbar).not.toHaveBeenCalled();
      }
    );

    it.each(['JSON first', 'settings first'])(
      'cancels the earlier drawer read as soon as the next starts: %s', order => {
        const first = new Subject<unknown>();
        const latest = new Subject<unknown>();
        fetch.mockReturnValueOnce(first).mockReturnValueOnce(latest);
        if (order === 'JSON first') { open(); openSettings(); }
        else { openSettings(); open(); }
        expect(first.observed).toBe(false);
        first.next(order === 'JSON first' ? content() : settings);
        expect(panel).not.toHaveBeenCalled();
        expect(latest.observed).toBe(true);
        expect(state.pageSettingsLoading()).toBe(order === 'JSON first');
        latest.next(order === 'JSON first' ? settings : content());
        expect(panel).toHaveBeenCalledOnce();
        expect(state.pageSettingsLoading()).toBe(false);
      }
    );

    it('keeps an earlier canvas read and its loading state while JSON opens', () => {
      const canvas = new Subject<IPage>();
      const json = new Subject<IPage>();
      fetch.mockReturnValueOnce(canvas).mockReturnValueOnce(json);
      service.loadPage({ nid: '2' });
      open();
      json.next(content());
      expect(state.loading()).toBe(true);
      expect(canvas.observed).toBe(true);
      expect(state.pageSettingsLoading()).toBe(false);
      canvas.next(content('2'));
      expect(state.currentPage).toMatchObject({ nid: '2', title: 'JSON 2' });
      expect(state.loading()).toBe(false);
    });

    it('ignores false close commands and permits a fresh read after closing', () => {
      const first = new Subject<IPage>();
      fetch.mockReturnValueOnce(first);
      open();
      state.closeRightDrawer$.next(false);
      expect(first.observed).toBe(true);
      state.closeRightDrawer$.next(true);
      first.next(content());
      expect(panel).not.toHaveBeenCalled();
      fetch.mockReturnValueOnce(of(content('2')));
      open('2');
      expect(panel).toHaveBeenCalledOnce();
    });

    it('reports a JSON failure, preserves the draft and permits retry', () => {
      const read = new Subject<IPage>();
      fetch.mockReturnValueOnce(read);
      open();
      read.error(new HttpErrorResponse({ status: 503 }));
      expect(openSnackbar).toHaveBeenCalledExactlyOnceWith('BUILDER.PAGE_LIST.LOAD_PAGE_FAIL', 'ok');
      expect(state.currentPage).toMatchObject({ title: 'Unsaved canvas', dirty: true });
      expect(panel).not.toHaveBeenCalled();
      fetch.mockReturnValueOnce(of(content()));
      open();
      expect(panel).toHaveBeenCalledOnce();
    });

    it('ignores a superseded JSON failure while settings remain pending', () => {
      const first = new Subject<IPage>();
      const latest = new Subject<unknown>();
      fetch.mockReturnValueOnce(first).mockReturnValueOnce(latest);
      open();
      openSettings();
      first.error(new HttpErrorResponse({ status: 503 }));
      expect(openSnackbar).not.toHaveBeenCalled();
      expect(state.pageSettingsLoading()).toBe(true);
      expect(latest.observed).toBe(true);
      latest.next(settings);
      expect(panel).toHaveBeenCalledOnce();
    });

    it('preserves the refusal message without opening JSON or changing the draft', () => {
      fetch.mockReturnValueOnce(of({ ...content(), status: false }));
      open();
      expect(openSnackbar).toHaveBeenCalledExactlyOnceWith('该页面非builder创建，请到后台编辑', 'ok');
      expect(panel).not.toHaveBeenCalled();
      expect(state.currentPage).toMatchObject({ title: 'Unsaved canvas', dirty: true });
    });

    it('allows retry after an empty JSON read', () => {
      const read = new Subject<IPage>();
      fetch.mockReturnValueOnce(read);
      open();
      read.complete();
      expect(panel).not.toHaveBeenCalled();
      expect(openSnackbar).not.toHaveBeenCalled();
      fetch.mockReturnValueOnce(of(content()));
      open();
      expect(panel).toHaveBeenCalledOnce();
    });
  });

  describe('page settings reads with real builder state', () => {
    let service: BuilderService;
    let state: BuilderState;
    const panel = vi.fn();
    const settings = (id: string, langcode = 'en') => ({ data: {
      id, type: 'node--landing_page', attributes: {
        title: `Page ${id}`, langcode, default_langcode: true,
      },
    } });
    const open = (uuid = 'a', langcode = 'en') => service.openPageSetting(
      { uuid, langcode }, '/api/v1/node/landing_page', { include: 'uid' }
    );

    beforeEach(() => {
      service = createService([{
        nid: '42', title: 'Unsaved canvas', body: [], current: true, dirty: true,
      }]);
      state = TestBed.inject(BuilderState);
      state.rightContent$.subscribe(panel);
    });

    afterEach(() => {
      TestBed.resetTestingModule();
      vi.useRealTimers();
    });

    it.each(['page', 'language'])('keeps the latest settings %s after reversed responses', kind => {
      const first = new Subject<unknown>();
      const latest = new Subject<unknown>();
      fetch.mockReturnValueOnce(first).mockReturnValueOnce(latest);
      open();
      const target = kind === 'page' ? 'b' : 'a';
      const langcode = kind === 'language' ? 'zh-hans' : 'en';
      open(target, langcode);
      expect(state.pageSettingsLoading()).toBe(true);
      latest.next(settings(target, langcode));
      first.next(settings('a'));

      expect(panel).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({
        title: 'BUILDER.PAGE_LIST.PAGE_PROPS',
        elements: [expect.objectContaining({ content: settings(target, langcode) })],
      }));
      expect(first.observed).toBe(false);
      expect(state.pageSettingsLoading()).toBe(false);
      expect(state.currentPage).toMatchObject({ title: 'Unsaved canvas', dirty: true });
      expect(fetch).toHaveBeenLastCalledWith(
        `/api/v1/node/landing_page/${target}`, { include: 'uid' },
        langcode === 'zh-hans' ? '' : 'en'
      );
    });

    it.each(['close', 'UI close', 'panel', 'local page', 'remote page', 'destroy'])(
      'cancels a settings read on %s and ignores its later failure', action => {
        const read = new Subject<unknown>();
        fetch.mockReturnValueOnce(read);
        open();
        if (action === 'close') state.closeRightDrawer$.next(true);
        if (action === 'UI close') state.rightDrawerClosed$.next();
        if (action === 'panel') state.rightContent$.next({ title: 'Other panel', elements: [] });
        if (action === 'local page') state.loadNewPage({ title: 'Selected draft', body: [] });
        if (action === 'remote page') {
          fetch.mockReturnValueOnce(new Subject<IPage>());
          service.loadPage({ nid: '43' });
        }
        if (action === 'destroy') TestBed.resetTestingModule();
        expect(read.observed).toBe(false);
        expect(state.pageSettingsLoading()).toBe(false);
        read.error(new HttpErrorResponse({ status: 503, statusText: 'Old failure' }));

        expect(openSnackbar).not.toHaveBeenCalled();
        expect(panel).toHaveBeenCalledTimes(action === 'panel' ? 1 : 0);
        if (action === 'remote page') expect(state.loading()).toBe(true);
        expect(post).not.toHaveBeenCalled();
        expect(patch).not.toHaveBeenCalled();
      }
    );

    it('does not finish an earlier canvas read when settings finish first', () => {
      const canvas = new Subject<IPage>();
      const read = new Subject<unknown>();
      fetch.mockReturnValueOnce(canvas).mockReturnValueOnce(read);
      service.loadPage({ nid: '43' });
      open();
      read.next(settings('a'));

      expect(panel).toHaveBeenCalledOnce();
      expect(canvas.observed).toBe(true);
      expect(state.pageSettingsLoading()).toBe(false);
      expect(state.loading()).toBe(true);
      canvas.next({ nid: '43', title: 'Selected canvas', body: [], status: true });
      expect(state.loading()).toBe(false);
      expect(state.currentPage.title).toBe('Selected canvas');
    });

    it('preserves a settings read when a close command is false', () => {
      const read = new Subject<unknown>();
      fetch.mockReturnValueOnce(read);
      open();
      state.closeRightDrawer$.next(false);
      expect(read.observed).toBe(true);
      read.next(settings('a'));
      expect(panel).toHaveBeenCalledOnce();
    });

    it('keeps the current draft after a settings failure and permits retry', () => {
      fetch.mockReturnValueOnce(throwError(() => new HttpErrorResponse({
        status: 503, statusText: 'Settings unavailable',
      })));
      open();
      expect(openSnackbar).toHaveBeenCalledExactlyOnceWith('Settings unavailable', 'ok');
      expect(state.pageSettingsLoading()).toBe(false);
      expect(panel).not.toHaveBeenCalled();
      expect(state.currentPage).toMatchObject({ title: 'Unsaved canvas', dirty: true });
      fetch.mockReturnValueOnce(of(settings('a')));
      open();
      expect(panel).toHaveBeenCalledOnce();
    });

    it('keeps the latest settings loading after a superseded request fails', () => {
      const first = new Subject<unknown>();
      const latest = new Subject<unknown>();
      fetch.mockReturnValueOnce(first).mockReturnValueOnce(latest);
      open('a');
      open('b');
      first.error(new HttpErrorResponse({ status: 503 }));
      expect(state.pageSettingsLoading()).toBe(true);
      expect(panel).not.toHaveBeenCalled();
      expect(openSnackbar).not.toHaveBeenCalled();
      latest.next(settings('b'));
      expect(state.pageSettingsLoading()).toBe(false);
    });

    it.each(['empty', 'refusal'])('releases settings loading on %s without changing the draft', result => {
      const read = new Subject<unknown>();
      fetch.mockReturnValueOnce(read);
      open();
      expect(state.pageSettingsLoading()).toBe(true);
      if (result === 'empty') read.complete();
      else read.next(false);
      expect(state.pageSettingsLoading()).toBe(false);
      expect(panel).not.toHaveBeenCalled();
      expect(state.currentPage).toMatchObject({ title: 'Unsaved canvas', dirty: true });
    });

    it.each(['settings first', 'initialization first'])(
      'keeps initialization and settings loading independent: %s', order => {
        vi.useFakeTimers();
        state.initPage([{ title: 'New draft', body: [], current: true }]);
        const read = new Subject<unknown>();
        fetch.mockReturnValueOnce(read);
        open();
        if (order === 'settings first') {
          read.next(settings('a'));
          expect(state.loading()).toBe(true);
          expect(state.pageSettingsLoading()).toBe(false);
          vi.advanceTimersByTime(600);
        } else {
          vi.advanceTimersByTime(600);
          expect(state.loading()).toBe(false);
          expect(state.pageSettingsLoading()).toBe(true);
          read.next(settings('a'));
        }
        expect(state.loading()).toBe(false);
        expect(state.pageSettingsLoading()).toBe(false);
        expect(TestBed.inject(LocalStorageService).store).toHaveBeenCalledWith(
          'version', state.version()
        );
      }
    );
  });

  describe('version checks with real canvas state', () => {
    let service: BuilderService;
    let state: BuilderState;
    let decision: Subject<boolean>;
    const closeDialog = vi.fn();
    const draft = (nid = '10'): IPage => ({
      nid, langcode: 'en', title: `Draft ${nid}`, body: [], current: true, dirty: true, changed: '1',
    });
    const serverPage = (nid = '10'): IPage => ({ ...draft(nid), changed: '2', status: true });
    const start = () => {
      service.checkIsLatestPage(state.currentPage);
      vi.advanceTimersByTime(0);
    };

    beforeEach(() => {
      vi.useFakeTimers();
      service = createService([draft(), { ...draft('11'), current: false }]);
      state = TestBed.inject(BuilderState);
      vi.spyOn(TestBed.inject(LocalStorageService), 'retrieve')
        .mockImplementation(() => state.version());
      decision = new Subject<boolean>();
      closeDialog.mockReset();
      const dialog = { afterClosed: () => decision, close: closeDialog };
      dialogOpen.mockReturnValue(dialog);
    });

    afterEach(() => {
      TestBed.resetTestingModule();
      vi.useRealTimers();
    });

    it.each(['local', 'remote'])('skips checks while a %s selection loads', selection => {
      fetch.mockReturnValue(of(serverPage('11')));
      if (selection === 'local') state.showVersionPage(1);
      else state.beginPageLoad();
      start();
      expect(fetch).not.toHaveBeenCalled();
      if (selection === 'local') vi.advanceTimersByTime(600);
      else state.loadNewPage(draft('11'));
      expect(fetch).not.toHaveBeenCalled();
      vi.advanceTimersByTime(selection === 'local' ? 29400 : 30000);
      expect(fetch).toHaveBeenCalledExactlyOnceWith(
        '/api/v3/landingPage/json/11', { noCache: 1 }, 'en'
      );
      expect(dialogOpen).toHaveBeenCalledOnce();
    });

    it.each(['local', 'remote'])('cancels an old check on a new %s selection', selection => {
      const read = new Subject<IPage>();
      fetch.mockReturnValueOnce(read).mockReturnValue(of(serverPage('11')));
      start();
      if (selection === 'local') state.showVersionPage(1);
      else state.beginPageLoad();
      expect(read.observed).toBe(false);
      read.next(serverPage());
      read.error(new Error('Superseded check'));
      expect(dialogOpen).not.toHaveBeenCalled();
      expect(state.loading()).toBe(true);
      expect(state.currentPage).toMatchObject({ nid: '10', dirty: true });
      if (selection === 'local') vi.advanceTimersByTime(600);
      else state.loadNewPage(draft('11'));
      vi.advanceTimersByTime(30000);
      expect(fetch.mock.calls.at(-1)).toEqual([
        '/api/v3/landingPage/json/11', { noCache: 1 }, 'en',
      ]);
      expect(dialogOpen).toHaveBeenCalledOnce();
      expect(post).not.toHaveBeenCalled();
      expect(patch).not.toHaveBeenCalled();
    });

    it.each(['local', 'remote'])('closes and invalidates an old confirmation on %s selection', kind => {
      fetch.mockReturnValue(of(serverPage()));
      start();
      expect(dialogOpen).toHaveBeenCalledOnce();
      if (kind === 'local') state.loadNewPage(draft('11'));
      else state.beginPageLoad();
      const expected = state.currentPage;
      expect(closeDialog).toHaveBeenCalledOnce();
      decision.next(true);
      expect(state.currentPage).toEqual(expected);
      expect(state.loading()).toBe(kind === 'remote');
      if (kind === 'remote') state.loadNewPage(draft('11'));
      fetch.mockReturnValue(of(serverPage('11')));
      vi.advanceTimersByTime(30000);
      expect(dialogOpen).toHaveBeenCalledTimes(2);
    });

    it.each(['read', 'confirmation'])('releases a pending %s on service destruction', stage => {
      const read = new Subject<IPage>();
      fetch.mockReturnValue(stage === 'read' ? read : of(serverPage()));
      start();
      const load = vi.spyOn(state, 'loadNewPage');
      TestBed.resetTestingModule();
      expect(stage === 'read' ? read.observed : decision.observed).toBe(false);
      if (stage === 'confirmation') expect(closeDialog).toHaveBeenCalledOnce();
      decision.next(true);
      read.next(serverPage());
      vi.advanceTimersByTime(30000);
      expect(fetch).toHaveBeenCalledOnce();
      expect(load).not.toHaveBeenCalled();
    });

    it('keeps a current check after background deletion and retries failed reads', () => {
      const read = new Subject<IPage>();
      fetch.mockReturnValueOnce(read).mockReturnValue(of(serverPage()));
      start();
      state.deleteLocalPage(1);
      expect(read.observed).toBe(true);
      read.error(new Error('Temporary failure'));
      expect(dialogOpen).not.toHaveBeenCalled();
      expect(openSnackbar).not.toHaveBeenCalled();
      vi.advanceTimersByTime(30000);
      expect(dialogOpen).toHaveBeenCalledOnce();
      expect(state.currentPage).toMatchObject({ nid: '10', dirty: true });
    });

    it.each([false, true])('preserves a valid update decision (%s) and resumes checking', accepted => {
      fetch.mockReturnValue(of(serverPage()));
      start();
      vi.advanceTimersByTime(30000);
      expect(fetch).toHaveBeenCalledOnce();
      decision.next(accepted);
      expect(state.currentPage.changed).toBe(accepted ? '2' : '1');
      expect(state.currentPage.nid).toBe('10');
      vi.advanceTimersByTime(30000);
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(post).not.toHaveBeenCalled();
      expect(patch).not.toHaveBeenCalled();
    });

    it.each([
      ['en', 'zh-hans', ''],
      ['zh-hans', 'en', 'en'],
    ])('checks the translation target %s → %s and ignores source fallback', (source, target, apiLang) => {
      state.loadNewPage({ ...draft(), langcode: source, translation: true, target });
      fetch.mockReturnValue(of({ ...serverPage(), langcode: source }));
      const before = state.version();
      start();
      expect(fetch).toHaveBeenCalledExactlyOnceWith(
        '/api/v3/landingPage/json/10', { noCache: 1 }, apiLang
      );
      expect(dialogOpen).not.toHaveBeenCalled();
      decision.next(true);
      expect(state.version()).toEqual(before);
      expect(post).not.toHaveBeenCalled();
      expect(patch).not.toHaveBeenCalled();
    });

    it.each([
      { nid: '11' }, { nid: undefined }, { langcode: 'zh-hans' },
      { langcode: undefined }, { langcode: '' }, { status: false }, { status: undefined },
    ])('ignores an unsuccessful or mismatched version response: %j', invalid => {
      fetch.mockReturnValue(of({ ...serverPage(), ...invalid }));
      start();
      expect(dialogOpen).not.toHaveBeenCalled();
      expect(state.currentPage).toEqual(draft());
      fetch.mockReturnValue(of(serverPage()));
      vi.advanceTimersByTime(30000);
      expect(dialogOpen).toHaveBeenCalledOnce();
    });

    it.each([false, true])('preserves the default language request when langcode is absent: %s', missing => {
      state.loadNewPage({ ...draft(), langcode: missing ? undefined : 'zh-hans' });
      fetch.mockReturnValue(of({ ...serverPage(), langcode: 'zh-hans' }));
      start();
      expect(fetch).toHaveBeenCalledExactlyOnceWith(
        '/api/v3/landingPage/json/10', { noCache: 1 }, ''
      );
      expect(dialogOpen).toHaveBeenCalledOnce();
    });

    describe.each([false, true])('target version updates for a new translation draft: %s', translating => {
      it.each([false, true])('preserves both language copies after the decision: %s', accepted => {
        const source = state.currentPage;
        state.loadNewPage({ ...draft(), title: 'Unsaved translation',
          langcode: translating ? 'en' : 'zh-hans',
          ...(translating ? { translation: true as const, target: 'zh-hans' } : {}),
        });
        const before = state.currentPage;
        fetch.mockReturnValueOnce(throwError(() => new HttpErrorResponse({ status: 403 })))
          .mockReturnValue(of({ ...serverPage(), langcode: 'zh-hans', title: 'Remote translation' }));
        start();
        expect(dialogOpen).not.toHaveBeenCalled();
        expect(state.currentPage).toEqual(before);
        vi.advanceTimersByTime(30000);
        expect(fetch.mock.calls.at(-1)).toEqual([
          '/api/v3/landingPage/json/10', { noCache: 1 }, '',
        ]);
        expect(dialogOpen).toHaveBeenCalledOnce();
        decision.next(accepted);
        if (accepted) {
          expect(state.currentPage).toMatchObject({
            nid: '10', langcode: 'zh-hans', title: 'Remote translation', changed: '2',
          });
          expect(state.currentPage.translation).toBeUndefined();
          expect(state.currentPage.target).toBeUndefined();
        } else expect(state.currentPage).toEqual(before);
        expect(state.version().find(page => !page.translation && page.langcode === 'en'))
          .toEqual({ ...source, current: false });
        expect(post).not.toHaveBeenCalled();
        expect(patch).not.toHaveBeenCalled();
      });
    });
  });

  describe('remote reads with real canvas state', () => {
    const drafts = (): IPage[] => [
      { nid: '10', langcode: 'en', title: 'Unsaved draft', body: [], current: true, dirty: true },
      { nid: '11', langcode: 'en', title: 'Other draft', body: [], current: false },
    ];
    const response: IPage = {
      nid: '42', langcode: 'en', title: 'Remote content', body: [], status: true,
    };

    afterEach(() => {
      TestBed.resetTestingModule();
      vi.useRealTimers();
    });

    it.each(['page', 'language', 'revision'])(
      'lets a later %s read supersede an ordinary page read', selection => {
        const first = new Subject<IPage>();
        const latest = new Subject<IPage>();
        fetch.mockReturnValueOnce(first).mockReturnValueOnce(latest);
        const service = createService(drafts());
        const state = TestBed.inject(BuilderState);
        service.loadPage({ nid: '42', langcode: 'en' });
        const target = { nid: selection === 'page' ? '43' : '42',
          langcode: selection === 'language' ? 'zh-hans' : 'en' };
        if (selection === 'revision') {
          service.loadPageRevision({ ...target, vid: '29' });
        } else {
          service.loadPage(target);
        }

        expect(first.observed).toBe(false);
        first.error(new HttpErrorResponse({ status: 503 }));
        expect(openSnackbar).not.toHaveBeenCalled();
        expect(state.currentPage.title).toBe('Unsaved draft');
        expect(state.loading()).toBe(true);
        latest.next({ ...response, ...target });
        expect(state.currentPage).toMatchObject({ ...target, title: 'Remote content' });
        expect(state.currentPage.revisionVid).toBe(selection === 'revision' ? '29' : undefined);
        expect(state.loading()).toBe(false);
        expect(post).not.toHaveBeenCalled();
        expect(patch).not.toHaveBeenCalled();
      }
    );

    it('ignores an ordinary page response that arrives after the latest selection', () => {
      const first = new Subject<IPage>();
      const latest = new Subject<IPage>();
      fetch.mockReturnValueOnce(first).mockReturnValueOnce(latest);
      const service = createService(drafts());
      const state = TestBed.inject(BuilderState);
      service.loadPage({ nid: '41' });
      service.loadPage({ nid: '42' });
      latest.next(response);
      first.next({ ...response, nid: '41', title: 'Stale content' });

      expect(state.currentPage).toMatchObject({ nid: '42', title: 'Remote content' });
      expect(state.version().some(page => page.nid === '41')).toBe(false);
    });

    it.each(['load', 'history', 'initialize', 'delete', 'clear'])(
      'keeps a local %s selection after an ordinary read arrives late', async selection => {
        vi.useFakeTimers();
        const read = new Subject<IPage>();
        fetch.mockReturnValueOnce(read);
        const service = createService(drafts());
        const state = TestBed.inject(BuilderState);
        service.loadPage({ nid: '42' });
        if (selection === 'load') state.loadNewPage({ title: 'Local selection', body: [] });
        if (selection === 'history') state.showVersionPage(1);
        if (selection === 'initialize') state.initPage([{ title: 'New draft', body: [] }]);
        if (selection === 'delete') state.deleteLocalPage(0);
        if (selection === 'clear') {
          state.clearAllHistory();
          await vi.dynamicImportSettled();
          await vi.waitFor(() => expect(dialogOpen).toHaveBeenCalledOnce());
        }
        expect(read.observed).toBe(false);
        read.next(response);
        if (selection === 'history' || selection === 'initialize') {
          expect(state.loading()).toBe(true);
        }
        vi.advanceTimersByTime(600);
        expect(state.currentPage.title).toBe({ load: 'Local selection', history: 'Other draft',
          initialize: 'New draft', delete: 'Other draft', clear: '未命名' }[selection]);
        expect(state.loading()).toBe(false);
        expect(openSnackbar).not.toHaveBeenCalled();
      }
    );

    it('preserves an ordinary read after background deletion and invalid local selections', () => {
      const read = new Subject<IPage>();
      fetch.mockReturnValueOnce(read);
      const service = createService(drafts());
      const state = TestBed.inject(BuilderState);
      service.loadPage({ nid: '42' });
      state.deleteLocalPage(1);
      state.showVersionPage(5);
      state.deleteLocalPage(-1);
      expect(read.observed).toBe(true);
      expect(state.loading()).toBe(true);
      read.next(response);
      expect(state.currentPage.title).toBe('Remote content');
      expect(state.loading()).toBe(false);
    });

    describe.each(['page', 'revision'])('%s loading ownership', kind => {
      const start = (service: BuilderService): void => {
        if (kind === 'page') service.loadPage({ nid: '42', langcode: 'en' });
        else service.loadPageRevision({ nid: '42', langcode: 'en', vid: '29' });
      };

      it.each(['initialize', 'update', 'history'])(
        'replaces the pending %s timer without losing the current draft', pending => {
          vi.useFakeTimers();
          const read = new Subject<IPage>();
          fetch.mockReturnValueOnce(read);
          const service = createService(pending === 'initialize' ? [] : drafts());
          const state = TestBed.inject(BuilderState);
          const storage = TestBed.inject(LocalStorageService);
          const screen = TestBed.inject(ScreenService);
          if (pending === 'update') state.updatePage(2);
          if (pending === 'history') state.showVersionPage(1);
          const before = state.currentPage;
          vi.advanceTimersByTime(200);
          start(service);
          const saves = vi.mocked(storage.store).mock.calls.length;
          vi.advanceTimersByTime(600);

          expect(state.loading()).toBe(true);
          expect(state.currentPage).toEqual(before);
          expect(storage.store).toHaveBeenCalledTimes(saves);
          expect(screen.scrollToAnchor).not.toHaveBeenCalled();
          read.error(new HttpErrorResponse({ status: 503 }));
          expect(state.loading()).toBe(false);
          expect(state.currentPage).toEqual(before);
          if (pending !== 'history') {
            expect(storage.store).toHaveBeenLastCalledWith('version', state.version());
          }
        }
      );

      it.each(['error', 'refusal', 'empty'])(
        'releases current loading after %s and permits retry without losing the draft', result => {
          const read = new Subject<IPage>();
          fetch.mockReturnValueOnce(read);
          const service = createService(drafts());
          const state = TestBed.inject(BuilderState);
          start(service);
          expect(state.loading()).toBe(true);
          if (result === 'error') read.error(new HttpErrorResponse({ status: 503 }));
          if (result === 'refusal') read.next({ ...response, status: false });
          if (result === 'empty') read.complete();
          expect(state.loading()).toBe(false);
          expect(state.currentPage).toMatchObject({ title: 'Unsaved draft', dirty: true });

          fetch.mockReturnValueOnce(of(response));
          start(service);
          expect(state.loading()).toBe(false);
          expect(state.currentPage.title).toBe('Remote content');
        }
      );

      it('cancels the pending read when its service is destroyed', () => {
        const read = new Subject<IPage>();
        fetch.mockReturnValueOnce(read);
        const service = createService(drafts());
        const state = TestBed.inject(BuilderState);
        start(service);
        TestBed.resetTestingModule();
        const setLoading = vi.spyOn(state.loading, 'set');
        read.next(response);
        expect(read.observed).toBe(false);
        expect(setLoading).not.toHaveBeenCalled();
        expect(state.currentPage.title).toBe('Unsaved draft');
        expect(openSnackbar).not.toHaveBeenCalled();
      });
    });
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

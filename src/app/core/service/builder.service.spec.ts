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
        pages ? BuilderState : {
          provide: BuilderState,
          useValue: {
            loading: { set: loadingSet },
            loadNewPage,
            getLocalPageByPage,
            deleteLocalPageByPage,
            updateSuccess$: { next: updateSuccessNext },
            pageSelection$: new Subject<void>(),
          },
        },
        { provide: UtilitiesService, useValue: { openSnackbar } },
        { provide: NodeService, useValue: { fetch } },
        { provide: ContentService, useValue: { loadBuilderConfig: () => of({}) } },
        { provide: Router, useValue: { url: '/builder' } },
        { provide: LocalStorageService, useValue: { retrieve: () => pages, store: vi.fn() } },
        { provide: ScreenService, useValue: {
          isPlatformBrowser: () => false, scrollToAnchor: vi.fn(),
        } },
        { provide: TranslateService, useValue: { instant: (key: string) => key } },
      ],
    });
    return TestBed.inject(BuilderService);
  };

  beforeEach(() => {
    vi.clearAllMocks();
    fetch.mockReset();
    get.mockReturnValue(of({ data: {} }));
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
      await vi.waitFor(() => expect(dialogOpen).toHaveBeenCalledOnce());
      expect(read.observed).toBe(true);
      read.next(response);

      expect(state.currentPage).toMatchObject({ nid: '42', revisionVid: '29', dirty: true });
      expect(openSnackbar).toHaveBeenCalledExactlyOnceWith('BUILDER.REVISION.LOADED', 'ok');
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

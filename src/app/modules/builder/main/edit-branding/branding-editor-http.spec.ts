import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Subject, of } from 'rxjs';
import { IBranding } from '@core/interface/branding/IBranding';
import { BuilderService } from '@core/service/builder.service';
import { ContentService } from '@core/service/content.service';
import { NodeService } from '@core/service/node.service';
import { TagsService } from '@core/service/tags.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { ScreenState } from '@core/state/screen/ScreenState';
import { API_URL, CORE_CONFIG } from '@core/token/token-providers';
import { EditHeaderComponent } from './edit-header/edit-header.component';
import { EditFooterComponent } from './edit-footer/edit-footer.component';

const branding: IBranding = {
  header: {
    params: { themeSwitch: false, userInfo: false, menuHoverOpen: false },
    mainMenu: [],
    search: { enable: false, placeholder: '', tooltip: '', link: '', type: '', key: '' },
    actions: [],
  },
};

describe.each([
  { Editor: EditHeaderComponent, section: 'header' },
  { Editor: EditFooterComponent, section: 'footer' },
])('$section editor HTTP reads', ({ Editor }) => {
  let http: HttpTestingController;
  let query: Subject<Params>;
  let openSnackbar: ReturnType<typeof vi.fn>;
  let updateAttributes: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    TestBed.resetTestingModule();
    query = new Subject();
    openSnackbar = vi.fn();
    updateAttributes = vi.fn(() => of({ data: { id: 'saved' } }));
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_URL, useValue: '' },
        { provide: CORE_CONFIG, useValue: {} },
        { provide: TagsService, useValue: {} },
        { provide: ScreenState, useValue: {} },
        { provide: ActivatedRoute, useValue: { queryParams: query } },
        { provide: Router, useValue: { navigate: vi.fn() } },
        { provide: BuilderService, useValue: { updateAttributes } },
        { provide: NodeService, useValue: { fetch: () => of({ data: [] }) } },
        { provide: UtilitiesService, useValue: { openSnackbar } },
        { provide: MatSnackBar, useValue: {} },
        { provide: MatDialog, useValue: {} },
        { provide: TranslateService, useValue: { instant: (key: string) => key } },
      ],
    }).overrideComponent(Editor, { set: { template: '', imports: [] } });
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    try {
      http.verify();
    } finally {
      TestBed.resetTestingModule();
      vi.useRealTimers();
      vi.restoreAllMocks();
    }
  });

  async function createEditor() {
    const fixture = TestBed.createComponent<EditHeaderComponent | EditFooterComponent>(Editor);
    fixture.componentInstance.showLangSwitch = false;
    await fixture.whenStable();
    return { fixture, editor: fixture.componentInstance };
  }

  function read(lang = '') {
    return http.expectOne(request => {
      const url = new URL(request.urlWithParams, 'http://localhost');
      return (
        url.pathname === `${lang}/api/v3/landingPage` &&
        url.searchParams.get('content') === '/core/branding'
      );
    });
  }

  async function failRead(lang = '', status = 503) {
    read(lang).flush('Synthetic failure', { status, statusText: 'Read failed' });
    await vi.advanceTimersByTimeAsync(500);
    read(lang).flush('Synthetic failure', { status, statusText: 'Read failed' });
  }

  it('refreshes from HTTP without replacing the public branding cache', async () => {
    const content = TestBed.inject(ContentService);
    content.loadBranding('/en/').subscribe();
    read('/en').flush(branding);
    const { editor } = await createEditor();
    query.next({ uuid: 'branding-en', langcode: 'en' });
    const first = read('/en');
    first.flush(branding);
    expect(
      new URL(first.request.urlWithParams, 'http://localhost').searchParams.get('nocache')
    ).toBe('true');
    editor.loadData();
    const refreshed = structuredClone(branding);
    refreshed.header.params.themeSwitch = true;
    read('/en').flush(refreshed);
    expect(editor.branding()).toEqual(refreshed);
    let publicBranding: IBranding | undefined;
    content.loadBranding('/en/').subscribe(value => (publicBranding = value));
    expect(publicBranding).toEqual(branding);
  });

  it('uses the default language when an explicit node has no language parameter', async () => {
    const { editor } = await createEditor();
    query.next({ uuid: 'default-node' });
    read().flush(branding);
    expect(editor.branding()).toEqual(branding);
    expect(editor.nodeLangcode()).toBe('');
  });

  it.each([undefined, null, {}])(
    'accepts an empty footer (%s) and preserves the header',
    async footer => {
      const { editor } = await createEditor();
      const payload = footer === undefined ? branding : { ...branding, footer };
      query.next({ uuid: 'branding-zh', langcode: 'zh-hans' });
      read().flush(payload);
      expect(editor.branding()).toEqual(payload);
      editor.dirty.set(true);
      expect(editor.canSave()).toBe(true);
      editor.onSave();
      expect(updateAttributes).toHaveBeenCalledOnce();
      if (editor instanceof EditFooterComponent) {
        const body = JSON.parse(updateAttributes.mock.calls[0][2].body);
        expect(body.header).toEqual(branding.header);
        expect(body.footer.params.mode).toBe('light');
      }
    }
  );

  it('recovers from an HTTP failure even when public rendering cached its empty fallback', async () => {
    const { editor } = await createEditor();
    vi.useFakeTimers();
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const content = TestBed.inject(ContentService);
    let publicValue: IBranding | undefined;
    content.loadBranding('/en/').subscribe(value => (publicValue = value));
    await failRead('/en');
    expect(publicValue).toEqual({});

    query.next({ uuid: 'branding-en', langcode: 'en' });
    await failRead('/en');
    expect(editor.branding()).toBeNull();
    expect(editor.loading()).toBe(false);
    editor.dirty.set(true);
    expect(editor.canSave()).toBe(false);
    editor.onSave();
    expect(updateAttributes).not.toHaveBeenCalled();
    expect(openSnackbar).toHaveBeenCalledExactlyOnceWith('BUILDER.EDIT_BRANDING.LOAD_FAIL');

    editor.loadData();
    read('/en').flush(branding);
    editor.dirty.set(true);
    expect(editor.canSave()).toBe(true);
    content.loadBranding('/en/').subscribe(value => (publicValue = value));
    expect(publicValue).toEqual({});
  });

  it('blocks stale form saves after a new language fails and saves only recovered content', async () => {
    const { editor } = await createEditor();
    query.next({ uuid: 'branding-zh', langcode: 'zh-hans' });
    read().flush({ ...branding, marker: 'old language' });
    editor.dirty.set(true);
    expect(editor.canSave()).toBe(true);
    vi.useFakeTimers();
    query.next({ uuid: 'branding-en', langcode: 'en' });
    editor.onSave();
    expect(updateAttributes).not.toHaveBeenCalled();
    await failRead('/en', 403);
    expect(editor.branding()).toEqual({ ...branding, marker: 'old language' });
    expect(editor.dirty()).toBe(true);
    expect(editor.canSave()).toBe(false);
    editor.onSave();
    expect(updateAttributes).not.toHaveBeenCalled();
    expect(openSnackbar).toHaveBeenCalledExactlyOnceWith('BUILDER.EDIT_BRANDING.LOAD_FAIL');

    editor.loadData();
    read('/en').flush({ ...branding, marker: 'new language' });
    expect(editor.dirty()).toBe(false);
    editor.dirty.set(true);
    editor.onSave();
    expect(updateAttributes).toHaveBeenCalledOnce();
    expect(updateAttributes.mock.calls[0][0]).toEqual({ uuid: 'branding-en', langcode: 'en' });
    expect(JSON.parse(updateAttributes.mock.calls[0][2].body).marker).toBe('new language');
  });

  it.each([
    null,
    {},
    [],
    { body: [{ type: 'text', content: 'Access denied' }] },
    { header: [] },
    { header: {} },
    { header: { ...branding.header, params: null } },
    { header: { ...branding.header, search: null } },
    { header: { ...branding.header, mainMenu: {} } },
    { ...branding, footer: [] },
    { ...branding, footer: { mobileMenu: 'invalid' } },
  ])('rejects a non-editable HTTP 200 response (%j) and permits refresh', async payload => {
    const { editor } = await createEditor();
    query.next({ uuid: 'branding-en', langcode: 'en' });
    read('/en').flush(payload);
    expect(editor.branding()).toBeNull();
    expect(editor.loading()).toBe(false);
    expect(openSnackbar).toHaveBeenCalledExactlyOnceWith('BUILDER.EDIT_BRANDING.LOAD_FAIL');
    editor.dirty.set(true);
    expect(editor.canSave()).toBe(false);
    editor.onSave();
    expect(updateAttributes).not.toHaveBeenCalled();
    editor.loadData();
    read('/en').flush(branding);
    editor.dirty.set(true);
    expect(editor.canSave()).toBe(true);
  });

  it('cancels HTTP reads on refresh, language change and destruction', async () => {
    const { editor, fixture } = await createEditor();
    query.next({ uuid: 'branding-en', langcode: 'en' });
    const first = read('/en');
    editor.loadData();
    expect(first.cancelled).toBe(true);
    const refreshed = read('/en');
    query.next({ uuid: 'branding-zh', langcode: 'zh-hans' });
    expect(refreshed.cancelled).toBe(true);
    const selected = read();
    fixture.destroy();
    expect(selected.cancelled).toBe(true);
    expect(openSnackbar).not.toHaveBeenCalled();
  });

  it('ends a timed-out read after one retry and allows a new refresh', async () => {
    const { editor } = await createEditor();
    vi.useFakeTimers();
    query.next({ uuid: 'branding-en', langcode: 'en' });
    const first = read('/en');
    await vi.advanceTimersByTimeAsync(5000);
    expect(first.cancelled).toBe(true);
    expect(editor.loading()).toBe(true);
    await vi.advanceTimersByTimeAsync(500);
    const second = read('/en');
    await vi.advanceTimersByTimeAsync(5000);
    expect(second.cancelled).toBe(true);
    expect(editor.loading()).toBe(false);
    expect(openSnackbar).toHaveBeenCalledExactlyOnceWith('BUILDER.EDIT_BRANDING.LOAD_FAIL');
    editor.loadData();
    read('/en').flush(branding);
    expect(editor.branding()).toEqual(branding);
  });
});

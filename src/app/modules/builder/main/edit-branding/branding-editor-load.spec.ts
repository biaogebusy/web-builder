import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Subject, defer } from 'rxjs';
import { vi } from 'vitest';
import { IBranding } from '@core/interface/branding/IBranding';
import { BuilderService } from '@core/service/builder.service';
import { ContentService } from '@core/service/content.service';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { EditHeaderComponent } from './edit-header/edit-header.component';
import { EditFooterComponent } from './edit-footer/edit-footer.component';

const branding = (marker: string): IBranding & { marker: string } => ({
  marker,
  header: {
    params: { themeSwitch: false, userInfo: false, menuHoverOpen: false },
    mainMenu: [],
    search: { enable: false, placeholder: '', tooltip: '', link: '', type: '', key: '' },
    actions: [],
  },
  footer: { params: { mode: 'light' }, mainMenu: [] },
});

const nodes = ['zh-hans', 'en'].map(langcode => ({
  id: `branding-${langcode}`,
  attributes: { langcode, path: { alias: '/core/branding' } },
}));

describe.each([
  { Editor: EditHeaderComponent, name: 'header' },
  { Editor: EditFooterComponent, name: 'footer' },
])('$name loading context', ({ Editor }) => {
  let query: Subject<Params>;
  let lists: Subject<unknown>[];
  let reads: { path: string; response: Subject<IBranding> }[];
  let getLang: ReturnType<typeof vi.fn>;
  let openSnackbar: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    query = new Subject();
    lists = [];
    reads = [];
    getLang = vi.fn(() => ({ langCode: 'zh-hans' }));
    openSnackbar = vi.fn();
    TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: { queryParams: query } },
        { provide: Router, useValue: { navigate: vi.fn() } },
        { provide: BuilderService, useValue: {} },
        {
          provide: ContentService,
          useValue: {
            getUrlPath: (path: string) => ({ lang: path === '/en/' ? '/en' : '' }),
            loadJSON: (path: string) => {
              const response = new Subject<IBranding>();
              reads.push({ path, response });
              return response;
            },
          },
        },
        {
          provide: NodeService,
          useValue: {
            pageUrl: '/zh-hans/',
            getLang,
            fetch: () =>
              defer(() => {
                const response = new Subject<unknown>();
                lists.push(response);
                return response;
              }),
          },
        },
        { provide: UtilitiesService, useValue: { openSnackbar } },
        { provide: MatSnackBar, useValue: {} },
        { provide: MatDialog, useValue: {} },
        { provide: TranslateService, useValue: { instant: (key: string) => key } },
      ],
    }).overrideComponent(Editor, { set: { template: '', imports: [] } });
  });

  async function createEditor(showLanguages = false) {
    const fixture = TestBed.createComponent<EditHeaderComponent | EditFooterComponent>(Editor);
    const editor = fixture.componentInstance;
    editor.showLangSwitch = showLanguages;
    await fixture.whenStable();
    return { editor, fixture };
  }

  function resolveList(index = 0, data = nodes) {
    lists[index].next({ data });
    lists[index].complete();
  }

  it.each([undefined, 'en'])(
    'loads an explicit node without a list (language: %s)',
    async langcode => {
      const { editor } = await createEditor();
      query.next({ uuid: 'explicit-node', langcode });
      expect(lists).toHaveLength(0);
      expect(getLang).not.toHaveBeenCalled();
      expect(editor.nodeUuid()).toBe('explicit-node');
      expect(editor.nodeLangcode()).toBe(langcode ?? '');
      expect(editor.queryParams).toEqual({ uuid: 'explicit-node', langcode: langcode ?? '' });
      expect(reads[0].path).toBe(langcode === 'en' ? '/en/core/branding' : '/core/branding');
      expect(editor.loading()).toBe(true);
      reads[0].response.next(branding('explicit'));
      expect(editor.branding()).toEqual(branding('explicit'));
      expect(editor.loading()).toBe(false);
      expect(editor.dirty()).toBe(false);
    }
  );

  it.each([undefined, 'en', 'missing'])(
    'resolves a list using language and fallback (%s)',
    async langcode => {
      const { editor } = await createEditor();
      query.next({ langcode });
      resolveList();
      const expected = langcode === 'en' ? 'en' : 'zh-hans';
      expect(editor.nodeUuid()).toBe(`branding-${expected}`);
      expect(reads[0].path).toBe(expected === 'en' ? '/en/core/branding' : '/core/branding');
      if (langcode) expect(getLang).not.toHaveBeenCalled();
      else expect(getLang).toHaveBeenCalledExactlyOnceWith('/zh-hans/');
    }
  );

  it('shares one list for language availability and route resolution', async () => {
    const { editor } = await createEditor(true);
    query.next({ langcode: 'en' });
    expect(lists).toHaveLength(1);
    resolveList();
    expect(editor.brandingNodes()).toHaveLength(2);
    expect(editor.isLangMissing('en')).toBe(false);
    expect(editor.isLangMissing('missing')).toBe(true);
    query.next({ langcode: 'zh-hans' });
    expect(lists).toHaveLength(1);
    expect(editor.nodeUuid()).toBe('branding-zh-hans');
    expect(reads.map(read => read.path)).toEqual(['/en/core/branding', '/core/branding']);
  });

  it('reports an empty list without loading content', async () => {
    const { editor } = await createEditor();
    query.next({});
    resolveList(0, []);
    expect(editor.nodeUuid()).toBe('');
    expect(editor.loading()).toBe(false);
    expect(reads).toHaveLength(0);
    expect(openSnackbar).toHaveBeenCalledExactlyOnceWith('BUILDER.EDIT_BRANDING.MISSING_NODE');
  });

  it('retries a failed content read through the existing refresh entry', async () => {
    const { editor } = await createEditor();
    vi.useFakeTimers();
    query.next({ uuid: 'branding-en', langcode: 'en' });
    reads[0].response.error(new Error('read failed'));
    await vi.advanceTimersByTimeAsync(500);
    vi.useRealTimers();
    expect(editor.loading()).toBe(false);
    expect(openSnackbar).toHaveBeenCalledExactlyOnceWith('BUILDER.EDIT_BRANDING.LOAD_FAIL');
    editor.loadData();
    expect(reads.map(read => read.path)).toEqual(['/en/core/branding', '/en/core/branding']);
    reads[1].response.next(branding('retry'));
    expect(editor.branding()).toEqual(branding('retry'));
    expect(editor.loading()).toBe(false);
  });

  it('keeps two editor instances and their node lists independent', async () => {
    const first = await createEditor(true);
    const second = await createEditor(true);
    query.next({ langcode: 'en' });
    expect(lists).toHaveLength(2);
    resolveList(0);
    reads[0].response.next(branding('first'));
    expect(first.editor.branding()).toEqual(branding('first'));
    expect(second.editor.branding()).toBeNull();
    expect(second.editor.nodeUuid()).toBe('');
    expect(second.editor.brandingNodes()).toEqual([]);
  });

  it('ignores content and route changes after component destruction', async () => {
    const { editor, fixture } = await createEditor();
    query.next({ uuid: 'branding-en', langcode: 'en' });
    fixture.destroy();
    expect(reads[0].response.observed).toBe(false);
    reads[0].response.next(branding('destroyed'));
    query.next({ uuid: 'branding-zh-hans', langcode: 'zh-hans' });
    expect(editor.branding()).toBeNull();
    expect(reads).toHaveLength(1);
  });

  it('retains a newer explicit node when an older list resolves', async () => {
    const { editor } = await createEditor();
    query.next({ langcode: 'zh-hans' });
    query.next({ uuid: 'explicit-en', langcode: 'en' });
    reads[0].response.next(branding('new route'));
    resolveList();
    expect(editor.nodeUuid()).toBe('explicit-en');
    expect(editor.queryParams).toEqual({ uuid: 'explicit-en', langcode: 'en' });
    expect(reads).toHaveLength(1);
  });

  it('reports one list error and refreshes route resolution and language availability', async () => {
    const { editor } = await createEditor(true);
    query.next({ langcode: 'en' });
    lists[0].error(new Error('list failed'));
    expect(openSnackbar).toHaveBeenCalledExactlyOnceWith('BUILDER.EDIT_BRANDING.LOAD_FAIL');
    expect(editor.loading()).toBe(false);
    expect(reads).toHaveLength(0);
    editor.loadData();
    expect(lists).toHaveLength(2);
    resolveList(1, [nodes[1]]);
    expect(editor.nodeUuid()).toBe('branding-en');
    expect(editor.isLangMissing('zh-hans')).toBe(true);
    expect(editor.isLangMissing('en')).toBe(false);
    reads[0].response.next(branding('list retry'));
    expect(editor.branding()).toEqual(branding('list retry'));
  });

  it('blocks saving the previous node while a new route is resolving its list', async () => {
    const { editor } = await createEditor();
    query.next({ uuid: 'explicit-en', langcode: 'en' });
    reads[0].response.next(branding('original'));
    editor.dirty.set(true);
    expect(editor.canSave()).toBe(true);
    query.next({ langcode: 'zh-hans' });
    expect(editor.loading()).toBe(true);
    expect(editor.canSave()).toBe(false);
    resolveList();
    expect(editor.nodeUuid()).toBe('branding-zh-hans');
    expect(editor.canSave()).toBe(false);
    reads[1].response.next(branding('selected'));
    expect(editor.loading()).toBe(false);
    expect(editor.dirty()).toBe(false);
  });

  it('retains current language content when an older language responds later', async () => {
    const { editor } = await createEditor();
    query.next({ uuid: 'branding-zh-hans', langcode: 'zh-hans' });
    query.next({ uuid: 'branding-en', langcode: 'en' });
    reads[1].response.next(branding('current language'));
    reads[0].response.next(branding('old language'));
    expect(editor.branding()).toEqual(branding('current language'));
    expect(editor.nodeUuid()).toBe('branding-en');
  });

  it('retains the latest refresh when an earlier read responds later', async () => {
    const { editor } = await createEditor();
    query.next({ uuid: 'branding-en', langcode: 'en' });
    editor.loadData();
    reads[1].response.next(branding('latest refresh'));
    reads[0].response.next(branding('old read'));
    expect(editor.branding()).toEqual(branding('latest refresh'));
  });

  it('releases a pending node list when its editor is destroyed', async () => {
    const { editor, fixture } = await createEditor(true);
    query.next({ langcode: 'en' });
    fixture.destroy();
    expect(lists[0].observed).toBe(false);
    resolveList();
    expect(editor.nodeUuid()).toBe('');
    expect(reads).toHaveLength(0);
  });
});

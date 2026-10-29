import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Subject, of } from 'rxjs';
import { vi } from 'vitest';
import { IBranding, IFooter, IHeader } from '@core/interface/branding/IBranding';
import { BuilderService } from '@core/service/builder.service';
import { ContentService } from '@core/service/content.service';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BrandingEditorContextService } from './branding-editor-context.service';
import { BrandingSaveService } from './branding-save.service';
import { EditHeaderComponent } from './edit-header/edit-header.component';
import { EditFooterComponent } from './edit-footer/edit-footer.component';

const header: IHeader = {
  params: { themeSwitch: false, userInfo: true, menuHoverOpen: false },
  mainMenu: [],
  search: { enable: false, placeholder: '', tooltip: '', link: '', type: '', key: '' },
  actions: [],
};
const footer = { params: { mode: 'light' } } as IFooter;

describe.each([
  { Editor: EditHeaderComponent, section: 'header' as const },
  { Editor: EditFooterComponent, section: 'footer' as const },
])('$section editor save contract', ({ Editor, section }) => {
  let updateAttributes: ReturnType<typeof vi.fn>;
  let openSnackbar: ReturnType<typeof vi.fn>;
  let requests: Subject<unknown>[];

  beforeEach(() => {
    requests = [];
    updateAttributes = vi.fn(() => {
      const request = new Subject<unknown>();
      requests.push(request);
      return request;
    });
    openSnackbar = vi.fn();
    TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: { queryParams: EMPTY } },
        { provide: Router, useValue: { navigate: vi.fn() } },
        { provide: BuilderService, useValue: { updateAttributes } },
        { provide: ContentService, useValue: {} },
        { provide: NodeService, useValue: { fetch: () => of({ data: [] }) } },
        { provide: UtilitiesService, useValue: { openSnackbar } },
        { provide: MatSnackBar, useValue: {} },
        { provide: MatDialog, useValue: {} },
        { provide: TranslateService, useValue: { instant: (key: string) => key } },
      ],
    }).overrideComponent(Editor, {
      set: {
        template: '',
        imports: [],
        providers: [
          BrandingSaveService,
          {
            provide: BrandingEditorContextService,
            useValue: {
              loading: signal(false),
              ready: signal(true),
              nodes: signal([]),
              connect: vi.fn(),
            },
          },
        ],
      },
    });
  });

  function createEditor() {
    const fixture = TestBed.createComponent<EditHeaderComponent | EditFooterComponent>(Editor);
    const editor = fixture.componentInstance;
    const branding: IBranding = structuredClone({ header, footer });
    editor.branding.set(branding);
    editor.nodeUuid.set(`${section}-node`);
    editor.nodeLangcode.set('en');
    editor.dirty.set(true);
    editor.jsonError.set('previous JSON error');
    const value = structuredClone(section === 'header' ? header : footer);
    const build =
      editor instanceof EditHeaderComponent
        ? vi.spyOn(editor, 'buildHeader').mockReturnValue(value as IHeader)
        : vi.spyOn(editor, 'buildFooter').mockReturnValue(value as IFooter);
    return { editor, fixture, branding, value, build };
  }

  it('rejects a missing node before building or changing save state', () => {
    const { editor, build } = createEditor();
    editor.nodeUuid.set('');
    editor.onSave();
    expect(build).not.toHaveBeenCalled();
    expect(updateAttributes).not.toHaveBeenCalled();
    expect(editor.saving()).toBe(false);
    expect(editor.dirty()).toBe(true);
    expect(openSnackbar).toHaveBeenCalledExactlyOnceWith('BUILDER.EDIT_BRANDING.NOT_FOUND_NODE');
  });

  it('saves the selected language and section without changing the source branding', () => {
    const { editor, branding, value } = createEditor();
    const original = structuredClone(branding);
    editor.onSave();
    expect(editor.saving()).toBe(true);
    expect(editor.dirty()).toBe(true);
    expect(updateAttributes).toHaveBeenCalledExactlyOnceWith(
      { uuid: `${section}-node`, langcode: 'en' },
      '/api/v1/node/json',
      { body: JSON.stringify({ ...branding, [section]: value }) },
      {}
    );
    expect(branding).toEqual(original);
    expect(editor.jsonError()).toBe('previous JSON error');
    requests[0].next({ data: { id: `${section}-node` } });
    expect(editor.saving()).toBe(false);
    expect(editor.dirty()).toBe(false);
    expect(openSnackbar).toHaveBeenCalledExactlyOnceWith(
      `BUILDER.EDIT_BRANDING.${section.toUpperCase()}_UPDATE_SUCCESS`,
      'ok'
    );
  });

  it('merges custom JSON before sending and clears only an accepted JSON error', () => {
    const { editor, branding } = createEditor();
    editor.jsonEditMode.set(true);
    editor.customJson = '{"params":{"customFlag":true}}';
    editor.onSave();
    const sent = JSON.parse(updateAttributes.mock.calls[0][2].body);
    expect(sent[section].params.customFlag).toBe(true);
    expect(sent[section].params).toMatchObject(branding[section]!.params);
    expect(branding[section]!.params).not.toHaveProperty('customFlag');
    expect(editor.jsonError()).toBe('');
    expect(editor.dirty()).toBe(true);
    expect(editor.saving()).toBe(true);
  });

  it.each([false, true])('ignores inactive or empty custom JSON (enabled: %s)', enabled => {
    const { editor } = createEditor();
    editor.jsonEditMode.set(enabled);
    editor.customJson = enabled ? '' : 'invalid JSON';
    editor.onSave();
    expect(updateAttributes).toHaveBeenCalledTimes(1);
    expect(editor.jsonError()).toBe('previous JSON error');
  });

  it('keeps an invalid JSON draft and allows correction before a single write', () => {
    const { editor } = createEditor();
    editor.jsonEditMode.set(true);
    editor.customJson = '{';
    editor.onSave();
    expect(updateAttributes).not.toHaveBeenCalled();
    expect(editor.saving()).toBe(false);
    expect(editor.dirty()).toBe(true);
    expect(editor.customJson).toBe('{');
    expect(editor.jsonError()).toBe('previous JSON error');
    expect(openSnackbar).toHaveBeenCalledExactlyOnceWith(
      'BUILDER.EDIT_BRANDING.JSON_FORMAT_ERROR',
      'ok'
    );
    editor.customJson = '{}';
    editor.onSave();
    expect(updateAttributes).toHaveBeenCalledTimes(1);
    expect(editor.saving()).toBe(true);
  });

  it.each([false, null, undefined])('keeps a draft without duplicate feedback for %s', response => {
    const { editor } = createEditor();
    editor.onSave();
    requests[0].next(response);
    expect(editor.saving()).toBe(false);
    expect(editor.dirty()).toBe(true);
    expect(openSnackbar).not.toHaveBeenCalled();
  });

  it('keeps a failed draft and sends a new request only after an explicit retry', () => {
    const { editor } = createEditor();
    editor.onSave();
    requests[0].error(new Error('request failed'));
    expect(editor.saving()).toBe(false);
    expect(editor.dirty()).toBe(true);
    expect(updateAttributes).toHaveBeenCalledTimes(1);
    expect(openSnackbar).toHaveBeenCalledExactlyOnceWith('BUILDER.EDIT_BRANDING.UPDATE_FAIL');
    editor.onSave();
    expect(updateAttributes).toHaveBeenCalledTimes(2);
    requests[1].next({ data: {} });
    expect(editor.dirty()).toBe(false);
  });

  it('keeps save state independent for two instances of the editor', () => {
    const first = createEditor();
    const second = createEditor();
    first.editor.onSave();
    expect(first.editor.saving()).toBe(true);
    expect(second.editor.saving()).toBe(false);
    second.editor.onSave();
    requests[0].next({ data: {} });
    expect(first.editor.saving()).toBe(false);
    expect(first.editor.dirty()).toBe(false);
    expect(second.editor.saving()).toBe(true);
    expect(second.editor.dirty()).toBe(true);
  });

  it('releases the pending request and ignores results after component destruction', () => {
    const { editor, fixture } = createEditor();
    editor.onSave();
    expect(requests[0].observed).toBe(true);
    fixture.destroy();
    expect(requests[0].observed).toBe(false);
    requests[0].next({ data: {} });
    expect(editor.dirty()).toBe(true);
    expect(openSnackbar).not.toHaveBeenCalled();
  });
});

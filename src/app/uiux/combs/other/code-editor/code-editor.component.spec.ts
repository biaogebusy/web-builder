import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of, Subject } from 'rxjs';
import { CORE_CONFIG, USER } from '@core/token/token-providers';
import { BuilderState } from '@core/state/BuilderState';
import { ContentService } from '@core/service/content.service';
import { NodeService } from '@core/service/node.service';
import { ScreenService } from '@core/service/screen.service';
import { TagsService } from '@core/service/tags.service';
import { UserService } from '@core/service/user.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { TranslateService } from '@ngx-translate/core';
import { vi } from 'vitest';

import { CodeEditorComponent } from './code-editor.component';

describe('CodeEditorComponent', () => {
  let component: CodeEditorComponent;
  let fixture: ComponentFixture<CodeEditorComponent>;

  const builder = {
    revealCode$: new Subject<string>(),
    fullScreen$: new Subject<boolean>(),
    currentPage: {
      body: [{ type: 'text', html: 'old', js: 'console.log(1)', relationships: { r: 1 } }],
    },
    updatePageContentByPath: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [CodeEditorComponent],
      providers: [
        { provide: CORE_CONFIG, useValue: {} },
        { provide: USER, useValue: signal(false) },
        {
          provide: BuilderState,
          useValue: builder,
        },
        { provide: ContentService, useValue: { loadBuilderConfig: () => of({}) } },
        { provide: NodeService, useValue: { fetch: () => of({}) } },
        { provide: ScreenService, useValue: { isPlatformBrowser: () => true } },
        { provide: TagsService, useValue: { highlightCode: vi.fn() } },
        { provide: UserService, useValue: { checkShow: () => false } },
        { provide: UtilitiesService, useValue: { openSnackbar: vi.fn() } },
        { provide: TranslateService, useValue: { instant: (key: string) => key } },
        { provide: MatDialog, useValue: { getDialogById: () => undefined } },
      ],
    }).compileComponents();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeEditorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('provides builder config outside a Builder route injector', () => {
    expect(component.builderConfig$).toBeTruthy();
  });

  it('writes the edited html back to the path without ai relationships', () => {
    fixture.componentRef.setInput('content', { path: '0' });

    component.updateHtml('<b>new</b>');

    expect(builder.updatePageContentByPath).toHaveBeenCalledWith('0', {
      type: 'text',
      html: '<b>new</b>',
      js: 'console.log(1)',
    });
    expect(component.html()).toBe('<b>new</b>');
  });

  it('keeps the page untouched when the editor has no path', () => {
    fixture.componentRef.setInput('content', {});

    component.updateHtml('<b>new</b>');

    expect(builder.updatePageContentByPath).not.toHaveBeenCalled();
  });

  it('lets only admins persist custom js and drops the key when emptied', () => {
    fixture.componentRef.setInput('content', { path: '0' });

    component.updateJs('alert(1)');
    expect(builder.updatePageContentByPath).not.toHaveBeenCalled();

    component.isAdmin.set(true);
    component.updateJs('alert(1)');
    expect(builder.updatePageContentByPath).toHaveBeenCalledWith('0', {
      type: 'text',
      html: 'old',
      js: 'alert(1)',
    });

    component.updateJs('   ');
    expect(builder.updatePageContentByPath).toHaveBeenLastCalledWith('0', {
      type: 'text',
      html: 'old',
    });
  });

  it('debounces html edits before saving them to the page', () => {
    vi.useFakeTimers();
    fixture.componentRef.setInput('content', { path: '0' });
    component.onHTMLChange();

    component.htmlForm.setValue('<i>draft</i>');
    expect(component.editing()).toBe(true);
    expect(builder.updatePageContentByPath).not.toHaveBeenCalled();

    vi.advanceTimersByTime(2000);

    expect(builder.updatePageContentByPath).toHaveBeenCalledWith(
      '0',
      expect.objectContaining({ html: '<i>draft</i>' })
    );
    expect(component.editing()).toBe(false);
  });
});

import {
  Component,
  DestroyRef,
  OnInit,
  effect,
  inject,
  signal,
  Injector,
  ChangeDetectionStrategy,
  input,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import type { IBuilderConfig, ICodeEditor } from '@core/interface/IBuilder';
import { ScreenService } from '@core/service/screen.service';
import { ContentService } from '@core/service/content.service';
import { BuilderState } from '@core/state/BuilderState';
import { get } from 'lodash-es';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NodeService } from '@core/service/node.service';
import { catchError, debounceTime, distinctUntilChanged, skip, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UtilitiesService } from '@core/service/utilities.service';
import { MatDialog } from '@angular/material/dialog';
import { BUILDER_CONFIG, USER } from '@core/token/token-providers';
import type { IUser } from '@core/interface/IUser';
import { UserService } from '@core/service/user.service';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { IDialog } from '@core/interface/IDialog';
import { TagsService } from '@core/service/tags.service';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';
import { LoadingComponent } from '@uiux/widgets/loading/loading.component';
import { FormlyComponent } from '@uiux/combs/form/formly/formly.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MONACO_EDITOR_CONFIG_PROVIDER } from '@core/config/monaco-editor.config';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss'],
  providers: [
    MONACO_EDITOR_CONFIG_PROVIDER,
    {
      provide: BUILDER_CONFIG,
      useFactory: () =>
        inject(BUILDER_CONFIG, { optional: true, skipSelf: true }) ??
        inject(ContentService).loadBuilderConfig(),
    },
  ],
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    MatTooltipModule,
    MonacoEditorModule,
    BtnComponent,
    LoadingComponent,
    FormlyComponent,
    TranslateModule,
  ],
})
export class CodeEditorComponent implements OnInit {
  readonly content = input.required<ICodeEditor>();
  public html = signal<string>('');
  public json = signal<any>(null);
  public isMore = signal<boolean>(true);
  public isCollapse = signal<boolean>(false);
  public isAPI = signal<boolean>(false);
  private api: string;
  public form = new UntypedFormGroup({});
  public htmlForm = new UntypedFormControl({});
  public jsForm = new UntypedFormControl('');
  public js = signal<string>('');
  public activeTab = signal<'html' | 'js'>('html');
  // 自定义 JS 仅管理员可见可编辑（前台会对所有访客执行，作者即信任边界）
  public isAdmin = signal<boolean>(false);
  public model: any = {};
  public fields: FormlyFieldConfig[];
  public MonacoOptions = {
    theme: 'vs-dark',
    language: 'html',
    automaticLayout: true, // 自动布局
    wordWrap: 'on', // 自动换行
    minimap: { enabled: false }, // 代码缩略图
    scrollBeyondLastLine: false,
    suggest: {
      showIcons: true,
      snippetsPreventQuickSuggestions: false,
    },
    quickSuggestions: true, // 快速建议
    codeLens: true, // 代码透镜
    folding: true, // 代码折叠
    formatOnPaste: true, // 自动格式化粘贴内容
    formatOnType: true, // 实时格式化
    lightbulb: { enabled: true }, // 显示快速修复灯泡
    fontSize: 14,
  };
  public jsMonacoOptions = { ...this.MonacoOptions, language: 'javascript' };

  private dialog = inject(MatDialog);
  private builder = inject(BuilderState);
  private destroyRef = inject(DestroyRef);
  private util = inject(UtilitiesService);
  private nodeService = inject(NodeService);
  public screenService = inject(ScreenService);
  private tagsService = inject(TagsService);
  private translate = inject(TranslateService);
  private currentUser = inject(USER);
  private userService = inject(UserService);
  private injector = inject(Injector);
  public editing = signal<boolean>(false);
  public highlightedCode = signal<string>('');
  public builderConfig$ = inject(BUILDER_CONFIG);
  private editor: any;

  ngOnInit(): void {
    const {
      html,
      json: jsonValue = null,
      isAPI = false,
      api = '',
      js = '',
    } = this.content().content;
    this.html.set(html);
    this.json.set(jsonValue);
    this.isAPI.set(isAPI);
    this.api = (api ?? '').trim();
    this.js.set(js ?? '');
    this.jsForm.setValue(this.js(), { emitEvent: false });
    effect(
      () => {
        const user = this.currentUser();
        this.isAdmin.set(
          this.userService.checkShow({ params: { reqRoles: ['administrator'] } }, user as IUser)
        );
      },
      { injector: this.injector }
    );
    if (this.isAPI() && this.api) {
      this.fields = [
        {
          fieldGroupClassName: 'flex flex-wrap',
          fieldGroup: [
            {
              type: 'input',
              key: 'api',
              defaultValue: this.api,
              className: 'flex-12/12',
              props: {
                label: 'API',
              },
              modelOptions: {
                updateOn: 'blur',
              },
            },
          ],
        },
      ];

      this.nodeService
        .fetch(this.api, '')
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(res => {
          this.json.set(JSON.stringify(res));
          this.highlightCode();
        });
    }
    this.onFormChange();
    this.onHTMLChange();
    this.onJsChange();

    this.builder.revealCode$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(text => this.revealInEditor(text));

    this.dialog
      .getDialogById('code-editor-dialog')
      ?.afterClosed()
      .subscribe(state => {
        if (state) {
          this.builder.fullScreen$.next(false);
        }
      });
  }

  async highlightCode(): Promise<void> {
    const {
      default: { registerLanguage, highlight },
    } = await import('highlight.js/lib/core');
    const json = await import('highlight.js/lib/languages/json');
    registerLanguage('json', json.default);
    this.highlightedCode.set(highlight(this.json(), { language: 'json' }).value);
    this.tagsService.highlightCode();
  }

  onHTMLChange(): void {
    this.htmlForm.valueChanges
      .pipe(
        tap(() => {
          this.editing.set(true);
        }),
        debounceTime(2000),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(html => {
        this.updateHtml(html);
        this.editing.set(false);
      });
  }

  onJsChange(): void {
    this.jsForm.valueChanges
      .pipe(
        tap(() => {
          this.editing.set(true);
        }),
        debounceTime(2000),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(js => {
        this.updateJs(js);
        this.editing.set(false);
      });
  }

  switchTab(tab: 'html' | 'js'): void {
    this.activeTab.set(tab);
  }

  updateJs(js: string): void {
    const { path } = this.content();
    if (!path) {
      return;
    }
    const content = { ...get(this.builder.currentPage.body, path) };
    if (js?.trim()) {
      content.js = js;
    } else {
      delete content.js;
    }
    delete content.relationships;
    this.builder.updatePageContentByPath(`${path}`, content);
  }

  updateHtml(html: any): void {
    const { path } = this.content();
    if (path) {
      const content = { ...get(this.builder.currentPage.body, path), html };
      if (this.isAPI()) {
        content.json = null;
      }
      // remove ai generator relationships
      delete content.relationships;
      this.builder.updatePageContentByPath(`${path}`, content);
      // 同步快照，避免切换 HTML/JS 标签重建编辑器时回退到打开时的旧内容
      this.html.set(html);
    }
  }

  onShowMore(): void {
    this.isMore.set(!this.isMore());
  }

  onEditorInit(editor: any): void {
    this.editor = editor;
    this.revealInEditor(this.content().reveal);
  }

  private revealInEditor(text?: string): void {
    if (!text || !this.editor) {
      return;
    }
    const matches =
      this.editor.getModel()?.findMatches(text, false, false, false, null, false) ?? [];
    if (matches.length) {
      this.editor.setSelection(matches[0].range);
      this.editor.revealRangeInCenter(matches[0].range);
      this.editor.focus();
    }
  }

  toggleCollapse(): void {
    this.isCollapse.set(!this.isCollapse());
  }

  onFormChange(): void {
    this.form.valueChanges
      .pipe(
        skip(1),
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(value => {
        const { api } = value;
        if (!api) {
          this.util.openSnackbar(this.translate.instant('BUILDER.CODE_EDITOR.API_REQUIRED'), 'ok');
          return;
        }
        const { path } = this.content();
        this.api = (api ?? '').trim();
        if (this.isAPI && api) {
          this.nodeService
            .fetch(api, { noCache: 1 })
            .pipe(
              catchError(err => {
                return of({
                  message: err.message ?? '404',
                });
              }),
              takeUntilDestroyed(this.destroyRef)
            )
            .subscribe(res => {
              this.json.set(res);
              const content = {
                ...get(this.builder.currentPage.body, path),
                isAPI: this.isAPI,
                api,
                json: null,
              };
              this.highlightCode();
              this.builder.updatePageContentByPath(`${path}`, content);
            });
        }
      });
  }

  showHelp(help?: string): void {
    const config: IDialog = {
      title: this.translate.instant('BUILDER.CODE_EDITOR.SYNTAX_GUIDE'),
      disableActions: true,
      inputData: {
        content: {
          type: 'text',
          fullWidth: true,
          body: help,
        },
      },
    };
    this.dialog.open(DialogComponent, {
      width: '1000px',
      panelClass: ['close-outside', 'close-icon-white'],
      data: config,
    });
  }
}

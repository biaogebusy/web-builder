import { Component, DestroyRef, Input, OnInit, inject, signal } from '@angular/core';
import type { IBuilderConfig, ICodeEditor } from '@core/interface/IBuilder';
import { ScreenService } from '@core/service/screen.service';
import { BuilderState } from '@core/state/BuilderState';
import { get } from 'lodash-es';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NodeService } from '@core/service/node.service';
import { catchError, debounceTime, distinctUntilChanged, skip, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UtilitiesService } from '@core/service/utilities.service';
import { MatDialog } from '@angular/material/dialog';
import { BUILDER_CONFIG } from '@core/token/token-providers';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { IDialog } from '@core/interface/IDialog';
import { TagsService } from '@core/service/tags.service';
@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss'],
  standalone: false,
})
export class CodeEditorComponent implements OnInit {
  @Input() content: ICodeEditor;
  public html = signal<string>('');
  public json = signal<any>(null);
  public isMore = signal<boolean>(true);
  public isCollapse = signal<boolean>(false);
  public isAPI = signal<boolean>(false);
  private api: string;
  public form = new UntypedFormGroup({});
  public htmlForm = new UntypedFormControl({});
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

  private dialog = inject(MatDialog);
  private builder = inject(BuilderState);
  private destroyRef = inject(DestroyRef);
  private util = inject(UtilitiesService);
  private nodeService = inject(NodeService);
  public screenService = inject(ScreenService);
  private tagsService = inject(TagsService);
  public editing = signal<boolean>(false);
  public highlightedCode = signal<string>('');
  public builderConfig$ = inject<Observable<IBuilderConfig>>(BUILDER_CONFIG);

  ngOnInit(): void {
    const { html, json: jsonValue = null, isAPI = false, api = '' } = this.content.content;
    this.html.set(html);
    this.json.set(jsonValue);
    this.isAPI.set(isAPI);
    this.api = api;
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

  updateHtml(html: any): void {
    const { path } = this.content;
    if (path) {
      const content = { ...get(this.builder.currentPage.body, path), html };
      if (this.isAPI()) {
        content.json = null;
      }
      this.builder.updatePageContentByPath(`${path}`, content);
    }
  }

  onShowMore(): void {
    this.isMore.set(!this.isMore());
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
          this.util.openSnackbar('数据来源API，请填写API地址', 'ok');
          return;
        }
        const { path } = this.content;
        this.api = api.trim();
        if (this.isAPI && api) {
          this.nodeService
            .fetch(api, 'noCache=1')
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
      title: '语法指南',
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

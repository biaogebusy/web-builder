import { Component, DestroyRef, Input, OnInit, inject, signal } from '@angular/core';
import type { ICodeEditor } from '@core/interface/IBuilder';
import { ScreenService } from '@core/service/screen.service';
import { BuilderState } from '@core/state/BuilderState';
import { JsonEditorOptions } from 'ang-jsoneditor';
import { get } from 'lodash-es';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NodeService } from '@core/service/node.service';
import { catchError, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UtilitiesService } from '@core/service/utilities.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss'],
  standalone: false,
})
export class CodeEditorComponent implements OnInit {
  @Input() content: ICodeEditor;
  public editorOptions: JsonEditorOptions;
  public html = signal<string>('');
  public json = signal<any>(null);
  public isMore = signal<boolean>(true);
  public isCollapse = signal<boolean>(false);
  public isAPI: boolean;
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
  public editing = signal<boolean>(false);

  constructor() {
    if (this.screenService.isPlatformBrowser()) {
      this.editorOptions = new JsonEditorOptions();
      this.editorOptions.mode = 'code'; // set only one mode
      this.editorOptions.enableTransform = false;
      this.editorOptions.enableSort = false;
      this.editorOptions.navigationBar = false;
      this.editorOptions.statusBar = false;
    }
  }

  ngOnInit(): void {
    const { html, json = null, isAPI = false, api = '' } = this.content.content;
    this.html.set(html);
    this.json.set(json);
    this.isAPI = isAPI;
    this.api = api;

    if (this.isAPI && this.api) {
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
          this.json.set(res);
        });
    }
    this.onFormChange();
    this.onHTMLChange();

    this.dialog
      .getDialogById('code-editor-dialog')
      ?.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(state => {
        if (state) {
          this.builder.fullScreen$.next(false);
        }
      });
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
      if (this.isAPI) {
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
      .pipe(debounceTime(1000), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
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
              this.builder.updatePageContentByPath(`${path}`, content);
            });
        }
      });
  }
}

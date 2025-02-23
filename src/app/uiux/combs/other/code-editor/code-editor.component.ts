import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import type { ICodeEditor } from '@core/interface/IBuilder';
import { ScreenService } from '@core/service/screen.service';
import { BuilderState } from '@core/state/BuilderState';
import { JsonEditorOptions } from 'ang-jsoneditor';
import { get } from 'lodash-es';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NodeService } from '@core/service/node.service';
import { catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeEditorComponent implements OnInit {
  @Input() content: ICodeEditor;
  public editorOptions: JsonEditorOptions;
  public html: string;
  public json: any;
  public isAPI: boolean;
  private api: string;
  public form = new UntypedFormGroup({});
  public htmlForm = new UntypedFormControl({});
  public model: any = {};
  public fields: FormlyFieldConfig[];
  public MonacoOptions = { theme: 'vs-dark', language: 'html' };

  private builder = inject(BuilderState);
  private cd = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  private nodeService = inject(NodeService);
  public screenService = inject(ScreenService);

  constructor() {
    if (this.screenService.isPlatformBrowser()) {
      this.editorOptions = new JsonEditorOptions();
      this.editorOptions.mode = 'code'; // set only one mode
      this.editorOptions.enableTransform = false;
      this.editorOptions.enableSort = false;
      this.editorOptions.navigationBar = false;
      this.editorOptions.statusBar = false;
      this.editorOptions.statusBar = false;
    }
  }

  ngOnInit(): void {
    this.html = this.content.content.html;
    this.json = this.content.content.json;
    this.isAPI = this.content.content.isAPI ?? false;
    this.api = this.content.content.api ?? '';
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

    if (this.isAPI && this.api) {
      this.nodeService
        .fetch(this.api, '')
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(res => {
          this.json = res;
          this.cd.detectChanges();
        });
    }
    this.onFormChange();
    this.onHTMLChange();
  }

  onHTMLChange(): void {
    this.htmlForm.valueChanges
      .pipe(debounceTime(3000), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe(html => {
        const { path } = this.content;
        if (path) {
          const content = { ...get(this.builder.currentPage.body, path), html };
          if (this.isAPI) {
            content.json = null;
          }
          this.builder.updatePageContentByPath(`${path}`, content);
        }
      });
  }

  onFormChange(): void {
    this.form.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe(value => {
        const { api } = value;
        if (!api) {
          return;
        }
        const { path } = this.content;
        this.api = api.trim();
        if (this.isAPI && api) {
          this.nodeService
            .fetch(api, '')
            .pipe(
              catchError(err => {
                return of({
                  message: err.message ?? '404',
                });
              }),
              takeUntilDestroyed(this.destroyRef)
            )
            .subscribe(res => {
              this.json = Object.assign({}, res);
              const content = {
                ...get(this.builder.currentPage.body, path),
                isAPI: this.isAPI,
                api,
                json: null,
              };
              this.builder.updatePageContentByPath(`${path}`, content);
              this.cd.detectChanges();
            });
        } else {
          const content = {
            ...get(this.builder.currentPage.body, path),
            isAPI: this.isAPI,
            api,
            json: this.json,
          };
          this.builder.updatePageContentByPath(`${path}`, content);
        }
      });
  }

  onJsonChange(value: any): void {
    if (value.timeStamp || this.isAPI) {
      return;
    }
    const { path } = this.content;
    if (path) {
      const content = {
        ...get(this.builder.currentPage.body, path),
        json: value,
      };
      this.builder.updatePageContentByPath(`${path}`, content);
    }
  }

  onToggle(event: any): void {
    const { checked } = event;
    this.isAPI = checked;
  }
}

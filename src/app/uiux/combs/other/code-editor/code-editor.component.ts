import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { ICodeEditor } from '@core/interface/IBuilder';
import { ScreenService } from '@core/service/screen.service';
import { BuilderState } from '@core/state/BuilderState';
import { JsonEditorOptions } from 'ang-jsoneditor';
import { get } from 'lodash-es';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NodeService } from '@core/service/node.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeEditorComponent implements OnInit {
  @Input() content: ICodeEditor;
  public editorOptions: JsonEditorOptions;
  html: string;
  json: any;
  isAPI: boolean;
  api: string;
  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[];
  MonacoOptions = { theme: 'vs-black', language: 'html' };
  constructor(
    public screenService: ScreenService,
    private builder: BuilderState,
    private nodeService: NodeService,
    private cd: ChangeDetectorRef
  ) {
    if (this.screenService.isPlatformBrowser()) {
      this.editorOptions = new JsonEditorOptions();
      this.editorOptions.mode = 'code'; // set only one mode
      this.editorOptions.enableTransform = false;
      this.editorOptions.enableSort = false;
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
            type: 'toggle',
            key: 'isAPI',
            defaultValue: this.isAPI,
            className: 'flex-4/12',
            templateOptions: {
              label: 'API',
            },
          },
          {
            type: 'input',
            key: 'api',
            defaultValue: this.api,
            className: 'flex-12/12',
            templateOptions: {
              label: 'API',
            },
            hideExpression: '!model.isAPI',
          },
        ],
      },
    ];

    if (this.isAPI && this.api) {
      this.nodeService.fetch(this.api, '').subscribe((res) => {
        this.json = res;
        this.cd.detectChanges();
      });
    }
  }

  onHTMLChange(html: string): void {
    const { path } = this.content;
    if (path) {
      const content = { ...get(this.builder.currentPage.body, path), html };
      if (this.isAPI) {
        content.json = null;
      }
      this.builder.updatePageContentByPath(`${path}`, content);
    }
  }

  onModelChange(value: any): void {
    const { isAPI, isRealTime, api } = value;
    const { path } = this.content;
    this.isAPI = isAPI;
    this.api = api;
    if (isAPI && api) {
      this.nodeService
        .fetch(api, '')
        .pipe(debounceTime(1000), distinctUntilChanged())
        .subscribe((res) => {
          this.json = res;
          const content = {
            ...get(this.builder.currentPage.body, path),
            isAPI,
            api,
            json: null,
          };
          this.builder.updatePageContentByPath(`${path}`, content);
          this.cd.detectChanges();
        });
    } else {
      const content = {
        ...get(this.builder.currentPage.body, path),
        isAPI,
        api,
        json: this.json,
      };
      this.builder.updatePageContentByPath(`${path}`, content);
    }
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
}

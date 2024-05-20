import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { ICodeEditor } from '@core/interface/IBuilder';
import { ScreenService } from '@core/service/screen.service';
import { BuilderState } from '@core/state/BuilderState';
import { JsonEditorOptions } from 'ang-jsoneditor';
import { get } from 'lodash-es';
import 'codemirror/mode/htmlmixed/htmlmixed';
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

  constructor(
    public screenService: ScreenService,
    private builder: BuilderState,
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
  }

  onHTMLChange(html: string): void {
    const { path } = this.content;
    if (path) {
      const content = { ...get(this.builder.currentPage.body, path), html };
      this.builder.updatePageContentByPath(`${path}`, content);
    }
  }

  onJsonChange(json: any): void {
    if (json.timeStamp) {
      return;
    }
    const { path } = this.content;
    if (path) {
      const content = { ...get(this.builder.currentPage.body, path), json };
      this.builder.updatePageContentByPath(`${path}`, content);
    }
  }
}

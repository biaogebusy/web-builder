import { Component, inject } from '@angular/core';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-rich-editor',
  standalone: false,
  templateUrl: './rich-editor.component.html',
  styleUrl: './rich-editor.component.scss',
})
export class RichEditorComponent extends FieldType<FieldTypeConfig> {
  private value: any;
  private util = inject(UtilitiesService);
  private nodeService = inject(NodeService);
  private contentChunks: string[] = []; // 分段内容
  public modules: QuillModule = {
    toolbar: [
      [
        {
          header: [1, 2, 3, 4, 5, 6, false],
        },
      ],
      ['bold', 'italic', 'underline', 'strike'],
      [
        {
          align: [],
        },
      ],
      [
        {
          list: 'ordered',
        },
        {
          list: 'bullet',
        },
        {
          list: 'check',
        },
      ],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ color: [] }, { background: [] }],
      ['link', 'image', 'video'],
      ['blockquote', 'code-block'],
      ['clean'],
    ],
  };
  async ngAfterViewInit(): Promise<void> {
    await this.util.loadStyle('/assets/injects/quill/quill.core.css');
    await this.util.loadStyle('/assets/injects/quill/quill.snow.css');
    this.contentChunks = this.util.chunkHTMLByBlocks(this.formControl.value);
  }

  editorCreated(quill: any): void {
    const toolbar = quill.getModule('toolbar');
    toolbar.addHandler('image', this.nodeService.imageHandler.bind(this.nodeService, quill));
    this.util.lazyLoadContent(quill, this.contentChunks);
  }

  onContentChanged(event: any): void {
    const { html } = event;
    this.value = html;
    this.formControl.setValue(this.value);
  }
}

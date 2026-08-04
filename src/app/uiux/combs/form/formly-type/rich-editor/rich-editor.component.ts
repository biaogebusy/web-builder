import { Component, inject, ChangeDetectionStrategy, AfterViewInit, OnInit } from '@angular/core';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { chunkHTMLByBlocks, lazyLoadContent } from '@core/util/html-chunk.util';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import { QuillModule } from 'ngx-quill';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-rich-editor',
  templateUrl: './rich-editor.component.html',
  styleUrl: './rich-editor.component.scss',
  imports: [QuillModule, FormlyModule],
})
export class RichEditorComponent extends FieldType implements OnInit, AfterViewInit {
  private value: any;
  private util = inject(UtilitiesService);
  private nodeService = inject(NodeService);
  private translate = inject(TranslateService);
  private contentChunks: string[] = []; // 分段内容
  /** 空内容占位文案:props.placeholder(翻译扩展已处理)优先,否则用通用 i18n 文案 */
  public placeholder = '';
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

  ngOnInit(): void {
    this.placeholder =
      this.props?.['placeholder'] || this.translate.instant('BUILDER.FORM_EDITOR.PLACEHOLDER');
    // props.toolbarContainer 指向页面上已有的工具栏容器选择器(如 '#node-editor-toolbar'),
    // 用于把工具栏从编辑器盒子里抽离为独立通栏(Frase 式布局);容器内按钮由调用方提供
    const container = this.props?.['toolbarContainer'];
    if (container) {
      this.modules = { toolbar: container };
    }
  }

  async ngAfterViewInit(): Promise<void> {
    await this.util.loadStyle('/assets/injects/quill/quill.core.css');
    await this.util.loadStyle('/assets/injects/quill/quill.snow.css');
    this.contentChunks = chunkHTMLByBlocks(this.formControl.value);
  }

  editorCreated(quill: any): void {
    const toolbar = quill.getModule('toolbar');
    toolbar.addHandler('image', this.nodeService.imageHandler.bind(this.nodeService, quill));
    lazyLoadContent(quill, this.contentChunks);
  }

  onContentChanged(event: any): void {
    const { html } = event;
    this.value = html;
    this.formControl.setValue(this.value);
  }
}

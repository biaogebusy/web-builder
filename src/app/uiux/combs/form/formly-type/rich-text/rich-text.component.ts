import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { MAT_INPUT_VALUE_ACCESSOR, MatInput } from '@angular/material/input';
import { NodeService } from '@core/service/node.service';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { FormlyFieldTextArea } from '@ngx-formly/material/textarea';
import { createPopper } from '@popperjs/core';
import { QuillModule } from 'ngx-quill';

@Component({
    selector: 'app-rich-text',
    templateUrl: './rich-text.component.html',
    styleUrls: ['./rich-text.component.scss'],
    providers: [{ provide: MAT_INPUT_VALUE_ACCESSOR, useExisting: FormlyFieldTextArea }],
    standalone: false
})
export class RichTextComponent extends FieldType<FieldTypeConfig> implements OnInit, AfterViewInit {
  @ViewChild(MatInput, { static: true }) formFieldControl!: MatInput;
  @ViewChild('popup', { static: false }) popup: ElementRef;
  value: any;
  contentChunks: string[] = []; // 分段内容
  popper: any;
  modules: QuillModule = {
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
  nodeService = inject(NodeService);
  ele = inject(ElementRef);

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.contentChunks = this.chunkHTMLByBlocks(this.formControl.value);
  }

  openRichText(): void {
    this.value = this.formControl.value;
    this.popper = createPopper(this.ele.nativeElement, this.popup.nativeElement, {
      placement: 'left',
      strategy: 'fixed',
    });
  }

  editorCreated(quill: any): void {
    const toolbar = quill.getModule('toolbar');
    toolbar.addHandler('image', this.nodeService.imageHandler.bind(this.nodeService, quill));
    this.lazyLoadContent(quill);
  }

  chunkHTMLByBlocks(content: string): string[] {
    const chunks: string[] = [];
    const stack: { tag: string; startIndex: number }[] = [];

    // 匹配所有 HTML 标签，包括起始和结束标签
    const tagRegex = /<\/?([a-zA-Z0-9-]+)[^>]*>/g;

    let match: RegExpExecArray | null;
    let lastIndex = 0;

    while ((match = tagRegex.exec(content)) !== null) {
      const fullMatch = match[0]; // 完整的标签
      const tagName = match[1]; // 标签名
      const isClosingTag = fullMatch.startsWith('</'); // 是否是结束标签
      const currentIndex = match.index;

      if (!isClosingTag) {
        // 起始标签，压入堆栈
        stack.push({ tag: tagName, startIndex: currentIndex });
      } else {
        // 闭合标签，匹配堆栈中的起始标签
        const lastTag = stack.pop();
        if (lastTag && lastTag.tag === tagName) {
          // 提取完整块内容
          const chunk = content.slice(lastTag.startIndex, currentIndex + fullMatch.length);
          if (stack.length === 0) {
            // 只有在栈为空时，才视为一个完整块
            chunks.push(chunk);
            lastIndex = currentIndex + fullMatch.length;
          }
        }
      }
    }

    // 如果解析后有剩余内容，直接作为一个块添加
    if (lastIndex < content.length) {
      const remainingContent = content.slice(lastIndex).trim();
      if (remainingContent) {
        chunks.push(remainingContent);
      }
    }

    return chunks;
  }

  // 安全插入分块内容
  insertChunkSafely(editor: any, chunk: string): void {
    const currentLength = editor.getLength();
    editor.clipboard.dangerouslyPasteHTML(currentLength - 1, chunk);
  }
  // 延迟加载内容
  lazyLoadContent(quillInstance: any): void {
    if (!quillInstance) return;

    let chunkIndex = 0;
    const interval = setInterval(() => {
      if (chunkIndex >= this.contentChunks.length) {
        clearInterval(interval);
        return;
      }

      const chunk = this.contentChunks[chunkIndex];
      this.insertChunkSafely(quillInstance, chunk);

      chunkIndex++;
    }, 100); // 每 100ms 加载一块内容
  }

  onContentChanged(event: any): void {
    const { html } = event;
    this.value = html;
  }

  onSave(): void {
    this.formControl.setValue(this.value);
    this.popper.destroy();
  }

  onCancel(): void {
    this.popper.destroy();
  }
}

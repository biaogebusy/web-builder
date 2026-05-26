import { AfterViewInit, Component, ElementRef, inject, ChangeDetectionStrategy, viewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_INPUT_VALUE_ACCESSOR, MatInput, MatInputModule } from '@angular/material/input';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { chunkHTMLByBlocks, lazyLoadContent } from '@core/util/html-chunk.util';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyFieldTextArea } from '@ngx-formly/material/textarea';
import { createPopper } from '@popperjs/core';
import { QuillModule } from 'ngx-quill';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-rich-text',
  templateUrl: './rich-text.component.html',
  styleUrls: ['./rich-text.component.scss'],
  providers: [{ provide: MAT_INPUT_VALUE_ACCESSOR, useExisting: FormlyFieldTextArea }],
  imports: [ReactiveFormsModule, MatButtonModule, MatInputModule, QuillModule, FormlyModule, BtnComponent],
})
export class RichTextComponent extends FieldType<FieldTypeConfig> implements AfterViewInit {
  readonly formFieldControl = viewChild.required(MatInput);
  readonly popup = viewChild<ElementRef>('popup');
  private value: any;
  private contentChunks: string[] = []; // 分段内容
  private popper: any;
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
  private ele = inject(ElementRef);
  private util = inject(UtilitiesService);
  private nodeService = inject(NodeService);


  async ngAfterViewInit(): Promise<void> {
    await this.util.loadStyle('/assets/injects/quill/quill.core.css');
    await this.util.loadStyle('/assets/injects/quill/quill.snow.css');
    this.contentChunks = chunkHTMLByBlocks(this.formControl.value);
  }

  openRichText(): void {
    this.value = this.formControl.value;
    this.popper = createPopper(this.ele.nativeElement, this.popup().nativeElement, {
      placement: 'left',
      strategy: 'fixed',
    });
  }

  editorCreated(quill: any): void {
    const toolbar = quill.getModule('toolbar');
    toolbar.addHandler('image', this.nodeService.imageHandler.bind(this.nodeService, quill));
    lazyLoadContent(quill, this.contentChunks);
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

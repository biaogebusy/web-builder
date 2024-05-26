import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  providers: [
    { provide: MAT_INPUT_VALUE_ACCESSOR, useExisting: FormlyFieldTextArea },
  ],
})
export class RichTextComponent
  extends FieldType<FieldTypeConfig>
  implements OnInit
{
  @ViewChild(MatInput, { static: true }) formFieldControl!: MatInput;
  @ViewChild('popup', { static: false }) popup: ElementRef;
  value: any;
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
  constructor(private nodeService: NodeService, private ele: ElementRef) {
    super();
  }
  ngOnInit(): void {}

  openRichText(): void {
    this.value = this.formControl.value;
    this.popper = createPopper(
      this.ele.nativeElement,
      this.popup.nativeElement,
      {
        placement: 'auto',
        strategy: 'fixed',
        modifiers: [
          {
            name: 'offset',
            options: {
              offfset: [80, 80],
            },
          },
        ],
      }
    );
  }

  editorCreated(quill: any): void {
    const toolbar = quill.getModule('toolbar');
    toolbar.addHandler(
      'image',
      this.nodeService.imageHandler.bind(this.nodeService, quill)
    );
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

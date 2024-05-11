import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_INPUT_VALUE_ACCESSOR, MatInput } from '@angular/material/input';
import { NodeService } from '@core/service/node.service';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { FormlyFieldTextArea } from '@ngx-formly/material/textarea';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
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
  modules: QuillModule = {
    toolbar: [
      [
        {
          header: [1, 2, 3, 4, 5, 6, false],
        },
      ],
      ['bold', 'italic'],
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
      ],
      ['link', 'image'],
      ['blockquote'],
      ['clean'],
    ],
  };
  constructor(private dialog: MatDialog, private nodeService: NodeService) {
    super();
  }
  ngOnInit(): void {}

  openRichText(): void {
    console.log(this.formControl);
    this.dialog.open(DialogComponent, {
      width: '700px',
      data: {
        inputData: {
          type: '',
        },
      },
    });
  }

  editorCreated(quill: any) {
    const toolbar = quill.getModule('toolbar');
    toolbar.addHandler(
      'image',
      this.nodeService.imageHandler.bind(this.nodeService, quill)
    );
  }
}

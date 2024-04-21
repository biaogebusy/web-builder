import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NodeService } from '@core/service/node.service';
import { BuilderState } from '@core/state/BuilderState';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { QuillModule } from 'ngx-quill';
import type { IMetaEdit } from '@core/interface/IBuilder';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-inline-editor',
  templateUrl: './inline-editor.component.html',
  styleUrls: ['./inline-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineEditComponent implements OnInit, AfterViewInit {
  form = new FormGroup({});
  model: any = {};
  @Input() content: IMetaEdit;
  @ViewChild('guiStyle', { static: false }) guiStyle: ElementRef;
  @ViewChild('guiSize', { static: false }) guiSize: ElementRef;
  sizeGuiUI: any;
  styleFolder: any;
  sizeFolder: any;
  viewHTML: any;
  guiHTML: any;
  editor: any;
  // TODO: will remove
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
  constructor(
    private dialog: MatDialog,
    private builder: BuilderState,
    private nodeService: NodeService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initTextView();
  }

  initTextView(): void {
    if (this.content.mode === 'text') {
      const currentValue = this.content.data.innerHTML;
      const isHtmlWrapper = this.isHTMLWrapper(currentValue);
      const div = document.createElement('div');
      const p = document.createElement('p');
      div.appendChild(p);

      if (isHtmlWrapper) {
        p.outerHTML = currentValue;
      } else {
        p.innerHTML = currentValue;
      }

      this.guiHTML = div.querySelector('p');
      if (this.content.ele.querySelector('p')) {
        this.viewHTML = this.content.ele.querySelector('p');
      } else {
        const text = this.content.ele.innerHTML;
        const pEle = document.createElement('p');
        pEle.innerHTML = text;
        pEle.style.display = 'inline-block';
        pEle.style.marginBottom = '0px';
        this.content.ele.innerHTML = pEle.outerHTML;
        this.viewHTML = this.content.ele.querySelector('p');
      }
      if (!this.guiHTML) {
        return;
      }
      this.guiHTML.style.display = 'inline-block';
      p.style.marginBottom = '0px';
    }
  }

  onClear(): void {
    if (this.content.mode === 'text') {
      this.viewHTML.removeAttribute('style');
      this.builder.updatePageContentByPath(
        this.content.path,
        this.viewHTML.outerHTML
      );
    }

    if (this.content.mode === 'img') {
      const src = this.content.path;
      const imgPath = src.substring(0, src.lastIndexOf('.'));
      this.content.ele.removeAttribute('style');
      this.builder.updatePageContentByPath(`${imgPath}.style`, {});
    }
  }

  isHTMLWrapper(str: string): boolean {
    const pattern = /^<([a-zA-Z][\w:-]*)(?:\s[^<>]*?)?>[\s\S]*?<\/\1>$/;
    return pattern.test(str);
  }

  openMedias(): void {
    this.dialog.open(DialogComponent, {
      width: '100%',
      data: {
        title: '媒体库',
        disableCloseButton: true,
        inputData: {
          content: {
            type: 'manage-media',
          },
        },
      },
    });
  }

  editorCreated(quill: any): void {
    const toolbar = quill.getModule('toolbar');
    toolbar.addHandler(
      'image',
      this.nodeService.imageHandler.bind(this.nodeService, quill)
    );
  }

  contentChanged(event: any): void {
    this.builder.updatePageContentByPath(this.content.path, event.html);
    this.content.ele.innerHTML = event.html;
    this.cd.detectChanges();
  }

  onModelChange(value: any): void {
    const path = this.content.path;
    const { style, src } = value;
    for (const key of Object.keys(style)) {
      switch (key) {
        case 'maxWidth':
          const maxWidth =
            style.maxWidth === 0 ? '100%' : style.maxWidth + 'px';
          style[key] = maxWidth;
          this.setStyle('maxWidth', maxWidth, value);
          break;
        case 'maxHeight':
          const maxHeight =
            style.maxHeight === 0 ? '100%' : style.maxHeight + 'px';
          style[key] = maxHeight;
          this.setStyle('maxHeight', maxHeight, value);
          break;
        default:
          this.setStyle(key, style[key], value);
          break;
      }
    }
    if (this.content.mode === 'img') {
      const imgPath = path.substring(0, path.lastIndexOf('.'));
      this.builder.updatePageContentByPath(`${imgPath}.style`, style);
      this.builder.updatePageContentByPath(`${imgPath}.src`, src);
    }

    if (this.content.mode === 'text') {
      this.builder.updatePageContentByPath(path, this.guiHTML.outerHTML);
    }

    this.builder.saveLocalVersions();
    setTimeout(() => {
      this.cd.detectChanges();
    }, 600);
  }

  setStyle(key: string, value: any, formValue: any): void {
    const { style, src } = formValue;
    if (this.content.mode === 'img') {
      style[key] = value;
      this.content.ele.style[key] = value;
      this.content.ele.src = src;
    } else {
      this.viewHTML.style[key] = value;
      this.guiHTML.style[key] = value;
    }
  }
}

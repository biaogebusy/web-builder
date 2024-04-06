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
import { get, set } from 'lodash-es';
import { QuillModule } from 'ngx-quill';
import type { IMetaEdit } from '@core/interface/IBuilder';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-meta-edit',
  templateUrl: './meta-edit.component.html',
  styleUrls: ['./meta-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetaEditComponent implements OnInit, AfterViewInit {
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
  //TODO: will remove
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
      const currentValue = get(
        this.builder.currentPage.body,
        this.content.path
      );
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
        const p = document.createElement('p');
        p.innerHTML = text;
        p.style.display = 'inline-block';
        p.style.marginBottom = '0px';
        this.content.ele.innerHTML = p.outerHTML;
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
      set(
        this.builder.currentPage.body,
        this.content.path,
        this.viewHTML.outerHTML
      );
    }

    if (this.content.mode === 'img') {
      const src = this.content.path;
      const imgPath = src.substring(0, src.lastIndexOf('.'));
      this.content.ele.removeAttribute('style');
      set(this.builder.currentPage.body, `${imgPath}.style`, {});
    }
    this.builder.saveLocalVersions();
    this.cd.detectChanges();
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

  editorCreated(quill: any) {
    const toolbar = quill.getModule('toolbar');
    toolbar.addHandler(
      'image',
      this.nodeService.imageHandler.bind(this.nodeService, quill)
    );
  }

  contentChanged(event: any): void {
    set(this.builder.currentPage.body, this.content.path, event.html);
    this.content.ele.innerHTML = event.html;
    setTimeout(() => {
      this.builder.saveLocalVersions();
    }, 600);
    this.cd.detectChanges();
  }

  onModelChange(value: any) {
    const path = this.content.path;
    const { style, src } = value;
    for (let key of Object.keys(style)) {
      switch (key) {
        case 'fontSize':
          const fontSize =
            style.fontSize === 0 ? 'inherit' : style.fontSize + 'px';
          style[key] = fontSize;
          this.setStyle('fontSize', fontSize, value);
          break;
        case 'lineHeight':
          const lineHeight =
            style.lineHeight === 0 ? 'normal' : style.lineHeight;
          style[key] = lineHeight;
          this.setStyle('lineHeight', lineHeight, value);
          break;
        case 'width':
          const width = style.width === 0 ? 'auto' : style.width + 'px';
          style[key] = width;
          this.setStyle('width', width, value);
          break;
        case 'height':
          const height = style.height === 0 ? 'auto' : style.height + 'px';
          style[key] = height;
          this.setStyle('height', height, value);
          break;
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
        case 'borderRadius':
          const borderRadius =
            style.borderRadius === 0 ? 0 : style.borderRadius + 'px';
          style[key] = borderRadius;
          this.setStyle('borderRadius', borderRadius, value);
          break;

        default:
          this.setStyle(key, style[key], value);
          break;
      }
    }
    if (this.content.mode === 'img') {
      const imgPath = path.substring(0, path.lastIndexOf('.'));
      set(this.builder.currentPage.body, `${imgPath}.style`, style);
      set(this.builder.currentPage.body, `${imgPath}.src`, src);
    }

    if (this.content.mode === 'text') {
      set(
        this.builder.currentPage.body,
        this.content.path,
        this.guiHTML.outerHTML
      );
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

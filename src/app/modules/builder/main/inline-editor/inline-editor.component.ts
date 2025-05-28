import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { BuilderState } from '@core/state/BuilderState';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import type { IMetaEdit } from '@core/interface/IBuilder';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ManageService } from '@core/service/manage.service';
import { IDialog } from '@core/interface/IDialog';

@Component({
  selector: 'app-inline-editor',
  templateUrl: './inline-editor.component.html',
  styleUrls: ['./inline-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class InlineEditComponent implements OnInit, AfterViewInit {
  form = new UntypedFormGroup({});
  model: any = {};
  @Input() content: IMetaEdit;
  private viewHTML: any;
  private guiHTML: any;

  private dialog = inject(MatDialog);
  private builder = inject(BuilderState);
  private cd = inject(ChangeDetectorRef);
  private manageService = inject(ManageService);
  constructor() {}

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
      this.builder.updatePageContentByPath(this.content.path, this.viewHTML.outerHTML);
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
    const config: IDialog = {
      disableActions: true,
      inputData: {
        content: {
          type: 'manage-media',
          fullWidth: true,
        },
      },
    };
    this.dialog.open(DialogComponent, {
      width: '100%',
      panelClass: this.manageService.mediaDialogClass,
      data: config,
    });
  }
  onModelChange(value: any): void {
    const path = this.content.path;
    const { style, src } = value;
    for (const key of Object.keys(style)) {
      switch (key) {
        case 'maxWidth':
          const maxWidth = style.maxWidth === 0 ? '100%' : style.maxWidth + 'px';
          style[key] = maxWidth;
          this.setStyle('maxWidth', maxWidth, value);
          break;
        case 'maxHeight':
          const maxHeight = style.maxHeight === 0 ? '100%' : style.maxHeight + 'px';
          style[key] = maxHeight;
          this.setStyle('maxHeight', maxHeight, value);
          break;
        case 'width':
          this.content.ele.setAttribute('width', parseInt(style[key]));
          break;
        case 'height':
          this.content.ele.setAttribute('height', parseInt(style[key]));
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
      this.builder.updatePageContentByPath(`${imgPath}.width`, parseInt(style.width));
      delete style.width;
      this.builder.updatePageContentByPath(`${imgPath}.height`, parseInt(style.height));
      delete style.height;
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

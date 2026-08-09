import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input } from '@angular/core';
import { SHARE_IMPORTS } from '@share/share-imports';
import { WIDGETS_IMPORTS } from '@uiux/widgets/widgets-imports';
import { FORM_IMPORTS } from '@uiux/combs/form/form-imports';
import { BuilderState } from '@core/state/BuilderState';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import type { IMetaEdit } from '@core/interface/IBuilder';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ManageService } from '@core/service/manage.service';
import { IDialog } from '@core/interface/IDialog';

/**
 * 画布内联编辑的右侧属性面板。现仅承担图片(mode: 'img')的编辑;
 * 文本模式已退役——文本的格式化与文字样式由 tiptap 气泡工具栏
 * (InlineEditorService)承担,元素级样式走组件设置
 */
@Component({
  selector: 'app-inline-editor',
  templateUrl: './inline-editor.component.html',
  styleUrls: ['./inline-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SHARE_IMPORTS, WIDGETS_IMPORTS, FORM_IMPORTS],
})
export class InlineEditComponent {
  readonly content = input.required<IMetaEdit>();
  form = new UntypedFormGroup({});
  model: any = {};

  private dialog = inject(MatDialog);
  private builder = inject(BuilderState);
  private cd = inject(ChangeDetectorRef);
  private manageService = inject(ManageService);

  onClear(): void {
    const content = this.content();
    if (content.mode === 'img') {
      const src = content.path;
      const imgPath = src.substring(0, src.lastIndexOf('.'));
      content.ele.removeAttribute('style');
      this.builder.updatePageContentByPath(`${imgPath}.style`, {});
    }
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
    const content = this.content();
    if (content.mode !== 'img') {
      return;
    }
    const path = content.path;
    const { style } = value;
    for (const key of Object.keys(style)) {
      switch (key) {
        case 'maxWidth': {
          const maxWidth = style.maxWidth === 0 ? '100%' : style.maxWidth + 'px';
          style[key] = maxWidth;
          this.setStyle('maxWidth', maxWidth, value);
          break;
        }
        case 'maxHeight': {
          const maxHeight = style.maxHeight === 0 ? '100%' : style.maxHeight + 'px';
          style[key] = maxHeight;
          this.setStyle('maxHeight', maxHeight, value);
          break;
        }
        case 'width':
          content.ele.setAttribute('width', String(parseInt(style[key])));
          break;
        case 'height':
          content.ele.setAttribute('height', String(parseInt(style[key])));
          break;
        default:
          this.setStyle(key, style[key], value);
          break;
      }
    }
    const imgPath = path.substring(0, path.lastIndexOf('.'));
    this.builder.updatePageContentByPath(`${imgPath}.style`, style);
    this.builder.updatePageContentByPath(`${imgPath}.src`, value.src);
    this.builder.updatePageContentByPath(`${imgPath}.width`, parseInt(style.width));
    delete style.width;
    this.builder.updatePageContentByPath(`${imgPath}.height`, parseInt(style.height));
    delete style.height;

    this.builder.saveLocalVersions();
    setTimeout(() => {
      this.cd.detectChanges();
    }, 600);
  }

  setStyle(key: string, value: any, formValue: any): void {
    const { style, src } = formValue;
    const content = this.content();
    style[key] = value;
    (content.ele.style as unknown as Record<string, string>)[key] = value;
    // 面板现仅服务 img 模式(onModelChange/onClear 已作 mode 守卫)
    (content.ele as HTMLImageElement).src = src;
  }
}

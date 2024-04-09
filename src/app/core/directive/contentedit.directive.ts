import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  NgZone,
} from '@angular/core';
import { IMetaEdit } from '@core/interface/IBuilder';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { getInlineImg } from '@modules/builder/factory/getInlinImg';
import { getInlineText } from '@modules/builder/factory/getInlineText';
@Directive({
  selector: '[contentedit]',
})
export class ContenteditDirective implements AfterViewInit {
  constructor(
    private el: ElementRef,
    private builder: BuilderState,
    private util: UtilitiesService,
    private zone: NgZone
  ) {}

  @HostListener('blur') onBlur(event: Event) {
    const ele = this.el.nativeElement;
    if (ele.closest('.component-item')) {
      ele.contentEditable = 'false';

      const path = this.generatePath(ele);
      this.builder.updatePageContentByPath(path, ele.innerHTML);
      this.openMetaPanel(ele);
    }
  }

  /**
   *
   * @param event
   * 清除剪切板格式
   */
  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent): void {
    this.zone.runOutsideAngular(() => {
      event.preventDefault();
      const clipboardData = event.clipboardData;
      if (clipboardData) {
        const plainText = clipboardData.getData('text/plain');

        const targetElement = event.target;

        // 保存当前选区（光标位置）
        const selection = window.getSelection();
        if (!selection) {
          console.warn('No selection found');
          return;
        }
        const range = selection.getRangeAt(0);

        // 清除选区，准备插入纯文本
        range.deleteContents();

        // 创建新的文本节点并插入到Range中
        const textNode = document.createTextNode(plainText);
        range.insertNode(textNode);

        // 恢复选区，确保光标位置正确
        range.selectNodeContents(textNode);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    });
  }

  @HostListener('click', ['$event']) onClick(event: Event): void {
    this.zone.runOutsideAngular(() => {
      const ele = this.el.nativeElement;
      if (ele.closest('.component-item')) {
        if (ele.tagName === 'IMG') {
          const meta: IMetaEdit = {
            type: 'meta-edit',
            mode: 'img',
            path: this.generatePath(ele),
            ele: event.target,
            fields: getInlineImg(ele),
            data: {
              src: ele.getAttribute('src'),
              fileName: ele.getAttribute('src').split('/').pop(),
              alt: ele.getAttribute('alt'),
              tag: ele.tagName,
            },
          };
          this.builder.builderRightContent$.next({
            mode: 'push',
            hasBackdrop: false,
            style: {
              width: '260px',
              'max-width': 'calc(100vw - 50px)',
            },
            elements: [meta],
          });
        } else {
          ele.contentEditable = 'true';
          this.openMetaPanel(ele);
        }
        event.preventDefault();
        event.stopPropagation();
      }
    });
  }

  openMetaPanel(ele: any): void {
    const meta: IMetaEdit = {
      type: 'meta-edit',
      mode: 'text',
      path: this.generatePath(ele),
      ele,
      fields: getInlineText(ele),
      data: {
        innerHTML: ele.innerHTML,
        tag: ele.tagName,
      },
    };
    this.builder.builderRightContent$.next({
      mode: 'push',
      hasBackdrop: false,
      style: {
        width: '300px',
        'max-width': 'calc(100vw - 50px)',
      },
      elements: [meta],
    });
  }

  @Input() set contentedit(key: string) {
    const ele = this.el.nativeElement;
    ele.setAttribute('data-path', key);
  }

  ngAfterViewInit(): void {
    const ele = this.el.nativeElement;
    if (ele.closest('.component-item')) {
      ele.contentEditable = 'false';
    }
  }

  generatePath(contenteditableElement: any): string {
    return this.util.generatePath(contenteditableElement);
  }
}

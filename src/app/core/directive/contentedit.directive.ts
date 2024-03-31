import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';
import { IMetaEdit } from '@core/interface/IBuilder';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { getInlineImg } from '@modules/builder/factory/getInlinImg';
import { getInlineText } from '@modules/builder/factory/getInlineText';
import { set } from 'lodash-es';
@Directive({
  selector: '[contentedit]',
})
export class ContenteditDirective implements AfterViewInit {
  constructor(
    private el: ElementRef,
    private builder: BuilderState,
    private util: UtilitiesService
  ) {}

  @HostListener('blur') onBlur(event: Event) {
    const ele = this.el.nativeElement;
    if (ele.closest('.component-item')) {
      ele.contentEditable = 'false';

      const path = this.generatePath(ele);
      set(this.builder.currentPage.body, path, ele.innerHTML);
      this.builder.saveLocalVersions();
    }
  }

  @HostListener('click', ['$event']) onClick(event: Event): void {
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
      event.preventDefault();
      event.stopPropagation();
    }
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

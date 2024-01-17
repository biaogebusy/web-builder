import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';
import { IMetaEdit } from '@core/interface/IBuilder';
import { BuilderState } from '@core/state/BuilderState';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { set } from 'lodash-es';
@Directive({
  selector: '[contentedit]',
})
export class ContenteditDirective implements AfterViewInit {
  constructor(private el: ElementRef, private builder: BuilderState) {}

  @HostListener('blur') onBlur(event: Event) {
    const ele = this.el.nativeElement;
    if (ele.closest('.component-item')) {
      ele.contentEditable = 'false';

      const path = this.generatePath(ele);
      console.log(`path:${path}`);
      set(this.builder.currentPage.body, path, ele.innerHTML);
      this.builder.saveLocalVersions();
    }
  }

  @HostListener('click', ['$event']) onClick(event: Event): void {
    const ele = this.el.nativeElement;
    if (ele.closest('.component-item')) {
      if (ele.tagName === 'IMG') {
        const fields: FormlyFieldConfig[] = [
          {
            key: 'style',
            fieldGroup: [
              {
                type: 'input',
                key: 'width',
                defaultValue: 'auto',
                className: 'width-100',
                templateOptions: {
                  label: '宽度',
                  placeholder: 'auto或者有效的值px,vw等等',
                },
              },
              {
                type: 'input',
                key: 'height',
                className: 'width-100',
                defaultValue: 'auto',
                templateOptions: {
                  label: '高度',
                  placeholder: 'auto或者有效的值px,vw等等',
                },
              },
              {
                type: 'slider',
                key: 'maxWidth',
                className: 'width-100',
                defaultValue: 'none',
                templateOptions: {
                  label: '最大宽度',
                  min: 10,
                  max: 2000,
                  thumbLabel: true,
                },
              },
              {
                type: 'slider',
                key: 'maxHeight',
                className: 'width-100',
                defaultValue: 'none',
                templateOptions: {
                  label: '最大高度',
                  min: 10,
                  max: 2000,
                  thumbLabel: true,
                },
              },
              {
                type: 'slider',
                key: 'opacity',
                className: 'width-100',
                defaultValue: 'none',
                templateOptions: {
                  label: '不透明度',
                  min: 0,
                  max: 1,
                  thumbLabel: true,
                  step: 0.1,
                },
              },
            ],
          },
        ];
        const meta: IMetaEdit = {
          type: 'meta-edit',
          mode: 'img',
          path: this.generatePath(ele),
          ele: event.target,
          fields,
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
    let path = contenteditableElement.getAttribute('data-path');
    let element = contenteditableElement;
    while (
      element &&
      element.parentNode &&
      !element.parentNode.classList.contains('component-item')
    ) {
      const dataPath = element.parentNode.getAttribute('data-path');
      if (dataPath) {
        path = `${dataPath}.${path}`;
      }
      element = element.parentNode;
    }
    return path;
  }
}

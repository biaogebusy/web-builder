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
                type: 'slider',
                key: 'width',
                defaultValue: parseFloat(ele.style.width.replace('px')) || 0,
                className: 'width-100',
                templateOptions: {
                  min: 0,
                  max: 2000,
                  step: 2,
                  thumbLabel: true,
                },
                expressionProperties: {
                  'templateOptions.label': '"宽度: " + model.width + "px"',
                },
              },
              {
                type: 'slider',
                key: 'height',
                className: 'width-100',
                defaultValue:
                  parseFloat(ele.style.height.replace('px', '')) || 0,
                templateOptions: {
                  min: 0,
                  max: 2000,
                  step: 2,
                  thumbLabel: true,
                },
                expressionProperties: {
                  'templateOptions.label': '"高度: " + model.height + "px"',
                },
              },
              {
                type: 'slider',
                key: 'maxWidth',
                className: 'width-100',
                defaultValue:
                  parseFloat(ele.style.maxWidth.replace('px', '')) || 0,
                templateOptions: {
                  min: 0,
                  max: 2000,
                  step: 2,
                  thumbLabel: true,
                },
                expressionProperties: {
                  'templateOptions.label':
                    '"最大宽度: " + model.maxWidth + "px"',
                },
              },
              {
                type: 'slider',
                key: 'maxHeight',
                className: 'width-100',
                defaultValue:
                  parseFloat(ele.style.maxHeight.replace('px', '')) || 0,
                templateOptions: {
                  label: '最大高度',
                  min: 0,
                  max: 2000,
                  step: 2,
                  thumbLabel: true,
                },
                expressionProperties: {
                  'templateOptions.label':
                    '"最大高度: " + model.maxHeight + "px"',
                },
              },
              {
                type: 'slider',
                key: 'opacity',
                className: 'width-100',
                defaultValue: ele.style.opacity || 1,
                templateOptions: {
                  min: 0,
                  max: 1,
                  thumbLabel: true,
                  step: 0.1,
                },
                expressionProperties: {
                  'templateOptions.label':
                    '"不透明度: " + model.opacity + "px"',
                },
              },
              {
                type: 'slider',
                key: 'borderRadius',
                className: 'width-100',
                defaultValue:
                  parseFloat(ele.style.borderRadius.replace('px', '')) || 0,
                templateOptions: {
                  min: 0,
                  max: 500,
                  step: 2,
                  thumbLabel: true,
                },
                expressionProperties: {
                  'templateOptions.label':
                    '"圆角: " + model.borderRadius + "px"',
                },
              },
              {
                type: 'select',
                key: 'objectFit',
                className: 'width-100',
                defaultValue: ele.style.objectFit || 'initial',
                templateOptions: {
                  label: '填充方式',
                  options: [
                    {
                      label: 'contain',
                      value: 'contain',
                    },
                    {
                      label: 'cover',
                      value: 'cover',
                    },
                    {
                      label: 'fill',
                      value: 'fill',
                    },
                    {
                      label: 'none',
                      value: 'none',
                    },
                    {
                      label: 'scale-down',
                      value: 'scale-down',
                    },
                    {
                      label: 'inherit',
                      value: 'inherit',
                    },
                    {
                      label: 'initial',
                      value: 'initial',
                    },
                    {
                      label: 'revert',
                      value: 'revert',
                    },
                    {
                      label: 'revert-layer',
                      value: 'revert-layer',
                    },
                    {
                      label: 'unset',
                      value: 'unset',
                    },
                  ],
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

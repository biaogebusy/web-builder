import { FormlyFieldConfig } from '@ngx-formly/core';
import { getAspectRatio, getObjectFix } from './getCommon';

export function getImg(widget: any, options?: any[]): FormlyFieldConfig[] {
  const fields = [
    {
      key: 'img',
      type: 'tabs',
      fieldGroup: [
        {
          props: {
            label: '图片',
          },
          fieldGroupClassName: 'grid grid-cols-12 gap-3',
          fieldGroup: [
            {
              key: 'src',
              type: 'img-picker',
              className: 'col-span-12',
              defaultValue: widget.src ?? '',
              props: {
                updateLabel: '更新图片',
                addLabel: '设置图片',
                deleteLabel: '删除',
                fileName: widget.src.split('/').pop(),
                alt: widget.alt ?? '',
              },
            },
            {
              key: 'alt',
              type: 'input',
              className: 'col-span-12',
              defaultValue: widget.alt,
              props: {
                label: 'Alt 描述',
              },
            },
            {
              key: 'classes',
              type: 'input',
              className: 'col-span-6',
              defaultValue: widget.classes,
              props: {
                label: 'class',
              },
            },
            {
              key: 'hostClasses',
              type: 'input',
              className: 'col-span-6',
              defaultValue: widget.hostClasses,
              props: {
                label: 'Wrapper Class',
              },
            },
            {
              type: 'input',
              key: 'width',
              className: 'col-span-6',
              defaultValue: widget.width,
              props: {
                label: 'W',
                type: 'number',
              },
            },
            {
              type: 'input',
              key: 'height',
              className: 'col-span-6',
              defaultValue: widget.height,
              props: {
                label: 'H',
                type: 'number',
              },
            },
            {
              key: 'style',
              className: 'col-span-12',
              fieldGroupClassName: 'grid grid-cols-12 gap-3',
              fieldGroup: [
                {
                  type: 'select',
                  key: 'aspectRatio',
                  className: 'col-span-6',
                  defaultValue: widget?.style?.aspectRatio ?? 'auto',
                  props: {
                    label: '宽高比',
                    options: getAspectRatio,
                  },
                },
                {
                  type: 'select',
                  key: 'objectFit',
                  className: 'col-span-6',
                  defaultValue: widget?.style?.objectFit ?? 'initial',
                  props: {
                    label: '填充方式',
                    options: getObjectFix,
                  },
                },
              ],
            },
            {
              key: 'isLink',
              type: 'toggle',
              className: 'col-span-12',
              props: {
                label: '是否链接',
              },
            },
            {
              key: 'href',
              className: 'col-span-12',
              defaultValue: widget.href,
              type: 'input',
              props: {
                label: '链接',
              },
              hideExpression: '!model.isLink',
            },
            {
              key: 'target',
              className: 'col-span-12',
              defaultValue: widget.target,
              type: 'select',
              props: {
                label: 'target',
                options: [
                  {
                    label: '新页面',
                    value: '_blank',
                  },
                  {
                    label: '当前页面',
                    value: '_self',
                  },
                ],
              },
              hideExpression: '!model.isLink',
            },
          ],
        },
      ],
    },
  ];

  if (options) {
    fields[0].fieldGroup.push(...options);
  }

  return fields;
}

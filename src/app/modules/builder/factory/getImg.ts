import { FormlyFieldConfig } from '@ngx-formly/core';
import { getAspectRatio, getObjectFix } from './getCommon';
import { includes } from 'lodash';

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
          fieldGroup: [
            {
              key: 'src',
              type: 'img-picker',
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
              key: 'classes',
              type: 'input',
              defaultValue: widget.classes,
              props: {
                label: 'class',
              },
            },
            {
              key: 'hostClasses',
              type: 'input',
              defaultValue: widget.hostClasses,
              props: {
                label: 'Wrapper Class',
              },
            },
            {
              key: 'alt',
              type: 'input',
              defaultValue: widget.alt,
              props: {
                label: 'Alt 描述',
              },
            },
            {
              key: 'style',
              fieldGroup: [
                {
                  type: 'select',
                  key: 'aspectRatio',
                  className: 'w-full',
                  defaultValue: widget?.style?.aspectRatio ?? 'auto',
                  props: {
                    label: '宽高比',
                    options: getAspectRatio,
                  },
                },
                {
                  type: 'select',
                  key: 'objectFit',
                  className: 'w-full',
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
              props: {
                label: '是否链接',
              },
            },
            {
              key: 'href',
              defaultValue: widget.href,
              type: 'input',
              props: {
                label: '链接',
              },
              hideExpression: '!model.isLink',
            },
            {
              key: 'target',
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

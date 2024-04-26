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
          templateOptions: {
            label: '图片',
          },
          fieldGroup: [
            {
              key: 'src',
              type: 'img-picker',
              defaultValue: widget.src || '',
              templateOptions: {
                updateLabel: '更新图片',
                addLabel: '设置图片',
                deleteLabel: '删除',
                fileName: widget.src.split('/').pop(),
                alt: widget.alt || '',
              },
            },
            {
              key: 'classes',
              type: 'input',
              defaultValue: widget.classes,
              templateOptions: {
                label: 'class',
              },
            },
            {
              key: 'hostClasses',
              type: 'input',
              defaultValue: widget.hostClasses,
              templateOptions: {
                label: 'Wrapper Class',
              },
            },
            {
              key: 'alt',
              type: 'input',
              defaultValue: widget.alt,
              templateOptions: {
                label: 'Alt 描述',
              },
            },
            {
              key: 'style',
              fieldGroup: [
                {
                  type: 'select',
                  key: 'aspectRatio',
                  className: 'width-100',
                  defaultValue: widget?.style?.aspectRatio || 'auto',
                  templateOptions: {
                    label: '宽高比',
                    options: getAspectRatio,
                  },
                },
                {
                  type: 'select',
                  key: 'objectFit',
                  className: 'width-100',
                  defaultValue: widget?.style?.objectFit || 'initial',
                  templateOptions: {
                    label: '填充方式',
                    options: getObjectFix,
                  },
                },
              ],
            },
            {
              key: 'isLink',
              type: 'toggle',
              templateOptions: {
                label: '是否链接',
              },
            },
            {
              key: 'href',
              defaultValue: widget.href,
              type: 'input',
              templateOptions: {
                label: '链接',
              },
              hideExpression: '!model.isLink',
            },
            {
              key: 'target',
              defaultValue: widget.target,
              type: 'select',
              templateOptions: {
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
        // {
        //   templateOptions: {
        //     label: '移动端',
        //   },
        //   fieldGroup: [
        //     {
        //       key: 'mobile',
        //       type: 'img-picker',
        //       defaultValue: widget.mobile || '',
        //       templateOptions: {
        //         updateLabel: '更新移动端图片',
        //         addLabel: '设置移动端图片',
        //         deleteLabel: '删除',
        //         fileName: widget.mobile ? widget.mobile.split('/').pop() : '',
        //         alt: widget.alt || '',
        //       },
        //     },
        //   ],
        // },
      ],
    },
  ];

  if (options) {
    fields[0].fieldGroup.push(...options);
  }

  return fields;
}

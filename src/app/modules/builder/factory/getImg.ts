import { FormlyFieldConfig } from '@ngx-formly/core';

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
                label: '更新图片',
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
              key: 'alt',
              type: 'input',
              defaultValue: widget.alt,
              templateOptions: {
                label: 'Alt 描述',
              },
            },
            {
              key: 'hostClasses',
              type: 'input',
              defaultValue: widget.hostClasses,
              templateOptions: {
                label: '宿主Class',
              },
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

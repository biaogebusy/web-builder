import { FormlyFieldConfig } from '@ngx-formly/core';

export function getImg(widget: any): FormlyFieldConfig[] {
  return [
    {
      key: 'img',
      fieldGroupClassName: 'width-100',
      fieldGroup: [
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
  ];
}

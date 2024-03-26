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
              key: 'style',
              fieldGroup: [
                {
                  type: 'select',
                  key: 'aspectRatio',
                  className: 'width-100',
                  defaultValue: widget?.style?.aspectRatio || 'auto',
                  templateOptions: {
                    label: '宽高比',
                    options: [
                      {
                        label: 'auto',
                        value: 'auto',
                      },
                      {
                        label: '1:1',
                        value: '1 / 1',
                      },
                      {
                        label: '1:2',
                        value: '1 / 2',
                      },
                      {
                        label: '2:1',
                        value: '2 / 1',
                      },
                      {
                        label: '2:3',
                        value: '2 / 3',
                      },
                      {
                        label: '3:2',
                        value: '3 / 2',
                      },
                      {
                        label: '4:3',
                        value: '4 / 3',
                      },
                      {
                        label: '9:16',
                        value: '9 / 16',
                      },
                      {
                        label: '16:9',
                        value: '16 / 9',
                      },
                    ],
                  },
                },
                {
                  type: 'select',
                  key: 'objectFit',
                  className: 'width-100',
                  defaultValue: widget?.style?.objectFit || 'initial',
                  templateOptions: {
                    label: '填充方式',
                    options: [
                      {
                        label: 'initial',
                        value: 'initial',
                      },
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

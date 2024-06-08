import { FormlyFieldConfig } from '@ngx-formly/core';

export function getBtnVideo(widget: any, options?: any[]): FormlyFieldConfig[] {
  const fields = [
    {
      key: 'btnVideo',
      type: 'tabs',
      fieldGroup: [
        {
          props: {
            label: '播放按钮',
          },
          fieldGroup: [
            {
              type: 'select',
              key: 'color',
              className: 'w-full',
              defaultValue: widget.color,
              props: {
                label: '颜色',
                options: [
                  {
                    label: '无',
                    value: undefined,
                  },
                  {
                    label: 'Primary',
                    value: 'primary',
                  },
                  {
                    label: 'Accent',
                    value: 'accent',
                  },
                  {
                    label: 'Warn',
                    value: 'warn',
                  },
                ],
              },
            },
            {
              key: 'video',
              fieldGroup: [
                {
                  key: 'options',
                  fieldGroup: [
                    {
                      type: 'select',
                      key: 'aspectRatio',
                      className: 'w-full',
                      defaultValue: widget.video.options.aspectRatio,
                      props: {
                        label: '播放比例',
                        options: [
                          {
                            label: '16:9',
                            value: '16:9',
                          },
                          {
                            label: '6:19',
                            value: '6:19',
                          },
                          {
                            label: '4:3',
                            value: '4:3',
                          },
                          {
                            label: '1:1',
                            value: '1:1',
                          },
                        ],
                      },
                    },
                    {
                      template: `<img class="m-bottom-sm" src="${widget.video.options.poster}" height="50" width="auto" >`,
                    },
                    {
                      key: 'poster',
                      type: 'input',
                      className: 'w-full',
                      defaultValue: widget.video.options.poster,
                      props: {
                        label: '视频封面',
                      },
                    },
                    {
                      key: 'sources',
                      type: 'repeat',
                      defaultValue: widget.video.options.sources,
                      className: 'w-full',
                      props: {
                        addText: '新增',
                      },
                      fieldArray: {
                        fieldGroup: [
                          {
                            key: 'src',
                            type: 'input',
                            className: 'w-full',
                            defaultValue: widget.video.options.sources[0].src,
                            props: {
                              label: '视频地址',
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              ],
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

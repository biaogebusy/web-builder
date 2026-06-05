import { FormlyFieldConfig } from '@ngx-formly/core';

export function getBtnVideo(widget: any): FormlyFieldConfig {
  const fields = {
    key: 'btnVideo',
    type: 'tabs',
    fieldGroup: [
      {
        props: {
          label: 'BUILDER.FACTORY.PLAY_BTN',
        },
        fieldGroup: [
          {
            type: 'select',
            key: 'color',
            className: 'w-full',
            defaultValue: widget.color,
            props: {
              label: 'BUILDER.FACTORY.COLOR',
              options: [
                {
                  label: 'BUILDER.FACTORY.NONE',
                  value: undefined,
                },
                {
                  label: 'BUILDER.FACTORY.PRIMARY',
                  value: 'primary',
                },
                {
                  label: 'BUILDER.FACTORY.ACCENT',
                  value: 'accent',
                },
                {
                  label: 'BUILDER.FACTORY.WARN',
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
                    defaultValue: widget.video?.options?.aspectRatio,
                    props: {
                      label: 'BUILDER.FACTORY.PLAY_RATIO',
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
                    template: `<img class="m-bottom-sm" src="${widget.video?.options?.poster}" height="50" width="auto" >`,
                  },
                  {
                    key: 'poster',
                    type: 'input',
                    className: 'w-full',
                    defaultValue: widget.video?.options?.poster,
                    props: {
                      label: 'BUILDER.FACTORY.VIDEO_POSTER',
                    },
                  },
                  {
                    key: 'sources',
                    type: 'repeat',
                    defaultValue: widget.video?.options?.sources,
                    className: 'w-full',
                    props: {
                      addText: 'BUILDER.FACTORY.ADD_NEW',
                    },
                    fieldArray: {
                      fieldGroup: [
                        {
                          key: 'src',
                          type: 'input',
                          className: 'w-full',
                          defaultValue: widget.video?.options?.sources[0].src,
                          props: {
                            label: 'BUILDER.FACTORY.VIDEO_URL',
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
  };

  return fields;
}

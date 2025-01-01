import { FormlyFieldConfig } from '@ngx-formly/core';

export function getCard1v1(widget: any): FormlyFieldConfig {
  const fieldsConfig = {
    key: 'card1v1',
    type: 'tabs',
    fieldGroup: [
      {
        props: {
          label: '卡片 1v1',
        },
        fieldGroup: [
          {
            key: 'link',
            fieldGroup: [
              {
                key: 'label',
                type: 'input',
                defaultValue: widget?.link.label,
                props: {
                  label: '标题',
                  placeholder: '请输入标题',
                },
              },
              {
                key: 'href',
                type: 'input',
                defaultValue: widget?.link.href,
                props: {
                  label: '链接',
                  placeholder: '请输入链接',
                },
              },
            ],
          },
          {
            key: 'user',
            type: 'input',
            defaultValue: widget?.user,
            props: {
              label: '用户',
              placeholder: '请输入用户名',
            },
          },
          {
            key: 'time',
            type: 'input',
            defaultValue: widget?.time,
            props: {
              label: '时间',
              placeholder: '时间',
              type: 'date',
            },
          },

          {
            key: 'moreLabel',
            type: 'input',
            defaultValue: widget?.moreLabel,
            props: {
              label: '更多',
            },
          },
          {
            key: 'feature',
            fieldGroup: [
              {
                key: 'link',
                type: 'input',
                defaultValue: widget?.feature?.link,
                props: {
                  label: '链接',
                  placeholder: '请输入链接',
                },
              },
              {
                key: 'img',
                fieldGroup: [
                  {
                    type: 'img-picker',
                    key: 'src',
                    defaultValue: widget?.feature?.img?.src,
                    props: {
                      updateLabel: '更新图片',
                      addLabel: '设置图片',
                      deleteLabel: '删除',
                      fileName: widget.feature.img.src.split('/').pop(),
                      alt: widget.alt ?? '',
                    },
                  },
                ],
              },
              {
                key: 'ratios',
                type: 'select',
                defaultValue: widget?.feature?.ratios,
                props: {
                  label: '图片比例',
                  options: [
                    {
                      label: '1:1',
                      value: 'media-1-1',
                    },
                    {
                      label: '2:1',
                      value: 'media-1-2',
                    },
                    {
                      label: '4:3',
                      value: 'media-4-3',
                    },
                    {
                      label: '16:9',
                      value: 'media-16-9',
                    },
                    {
                      label: '2:1',
                      value: 'media-2-1',
                    },
                  ],
                },
              },
            ],
          },
          {
            key: 'containerClasses',
            type: 'input',
            className: '!hidden',
            defaultValue: '!overflow-visible',
            props: {
              label: '容器Class',
            },
          },
        ],
      },
    ],
  };

  return fieldsConfig;
}

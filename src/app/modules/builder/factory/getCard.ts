import { FormlyFieldConfig } from '@ngx-formly/core';

export function getCard(widget: any): FormlyFieldConfig {
  const fieldsConfig = {
    key: 'card',
    type: 'tabs',
    fieldGroup: [
      {
        props: {
          label: '卡片',
        },
        fieldGroup: [
          {
            key: 'title',
            type: 'input',
            defaultValue: widget?.title,
            props: {
              label: '标题',
              placeholder: '请输入标题',
            },
          },
          {
            key: 'subTitle',
            type: 'input',
            defaultValue: widget?.subTitle,
            props: {
              label: '副标题',
              placeholder: '请输入副标题',
            },
          },
          {
            key: 'classes',
            type: 'select',
            defaultValue: widget?.classes,
            props: {
              label: 'Class',
              options: [
                {
                  label: '默认',
                  value: '',
                },
                {
                  label: '无阴影',
                  value: 'card-no-shadow',
                },
              ],
            },
          },
          {
            key: 'body',
            type: 'textarea',
            defaultValue: widget?.body,
            props: {
              label: '内容',
              placeholder: '请输入内容',
              rows: 3,
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
                      fileName: widget?.feature?.img?.src.split('/').pop(),
                      alt: widget?.feature?.img?.alt ?? '',
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
      },
    ],
  };

  return fieldsConfig;
}

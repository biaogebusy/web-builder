import { FormlyFieldConfig } from '@ngx-formly/core';

export function getBox(widget: any): FormlyFieldConfig {
  const fieldsConfig = {
    key: 'box',
    type: 'tabs',
    fieldGroup: [
      {
        props: {
          label: 'Box',
        },
        fieldGroup: [
          {
            key: 'title',
            fieldGroup: [
              {
                key: 'label',
                type: 'input',
                defaultValue: widget?.title?.label,
                props: {
                  label: '标题',
                  placeholder: '请输入标题',
                },
              },
              {
                key: 'href',
                type: 'input',
                defaultValue: widget?.title?.href,
                props: {
                  label: '标题链接',
                },
              },
            ],
          },
          {
            key: 'content',
            type: 'textarea',
            defaultValue: widget?.content,
            props: {
              label: '内容',
              placeholder: '请输入内容',
              rows: 3,
            },
          },
          {
            key: 'icon',
            fieldGroup: [
              {
                type: 'input',
                key: 'svg',
                defaultValue: widget?.icon?.svg,
                props: {
                  label: '图标',
                },
              },
            ],
          },
          {
            key: 'img',
            fieldGroup: [
              {
                type: 'img-picker',
                key: 'src',
                defaultValue: widget?.img?.src,
                props: {
                  updateLabel: '更新图片',
                  addLabel: '设置图片',
                  deleteLabel: '删除',
                  fileName: widget?.img?.src.split('/').pop(),
                  alt: widget?.img?.alt ?? '',
                },
              },
            ],
          },
          {
            key: 'more',
            fieldGroup: [
              {
                type: 'input',
                key: 'label',
                defaultValue: widget?.more?.label,
                props: {
                  label: '更多',
                },
              },
              {
                type: 'input',
                key: 'href',
                defaultValue: widget?.more?.href,
                props: {
                  label: '更多链接',
                },
              },
            ],
          },
          {
            key: 'style',
            type: 'select',
            defaultValue: widget?.style,
            props: {
              label: '风格',
              options: [
                {
                  label: 'V1',
                  value: 'style-v1',
                },
                {
                  label: 'V2',
                  value: 'style-v2',
                },
                {
                  label: 'V3',
                  value: 'style-v3',
                },
                {
                  label: 'V4',
                  value: 'style-v4',
                },
                {
                  label: 'V5',
                  value: 'style-v5',
                },
                {
                  label: 'V6',
                  value: 'style-v6',
                },
                {
                  label: 'V7',
                  value: 'style-v7',
                },
                {
                  label: 'V8',
                  value: 'style-v8',
                },
                {
                  label: 'V9',
                  value: 'style-v9',
                },
                {
                  label: 'V10',
                  value: 'style-v10',
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
  };

  return fieldsConfig;
}

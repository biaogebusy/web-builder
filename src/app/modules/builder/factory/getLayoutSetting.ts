import { FormlyFieldConfig } from '@ngx-formly/core';

export function getLayoutSetting(content: any): FormlyFieldConfig[] {
  console.log(content);
  const fields: FormlyFieldConfig[] = [
    {
      type: 'tabs',
      fieldGroup: [
        {
          templateOptions: {
            label: '通用配置',
          },
          fieldGroup: [
            {
              type: 'select',
              key: 'fullWidth',
              className: 'width-100',
              defaultValue: content.fullWidth,
              templateOptions: {
                label: '组件全屏宽',
                options: [
                  {
                    label: '全屏',
                    value: true,
                  },
                  {
                    label: '非全屏',
                    value: false,
                  },
                ],
              },
            },
            {
              type: 'select',
              key: 'spacer',
              defaultValue: content.spacer || 'md',
              className: 'width-100',
              templateOptions: {
                label: '上下留白',
                options: [
                  {
                    label: '超小',
                    value: 'xs',
                  },
                  {
                    label: '小',
                    value: 'sm',
                  },
                  {
                    label: '正常',
                    value: 'md',
                  },
                  {
                    label: '大',
                    value: 'lg',
                  },
                  {
                    label: '超大',
                    value: 'xl',
                  },
                ],
              },
            },
            {
              type: 'select',
              key: 'bgClasses',
              className: 'width-100',
              defaultValue: content?.bg?.classes || 'bg- bg-fill-width',
              templateOptions: {
                label: '预设背景色',
                options: [
                  {
                    label: '无',
                    value: 'bg- bg-fill-width',
                  },
                  {
                    label: '品牌色',
                    value: 'bg-primary bg-fill-width',
                  },
                  {
                    label: '灰色',
                    value: 'bg-shadow bg-fill-width',
                  },
                  {
                    label: '蓝色',
                    value: 'bg-blue bg-fill-width',
                  },
                  {
                    label: '绿色',
                    value: 'bg-green bg-fill-width',
                  },
                  {
                    label: '黄色',
                    value: 'bg-yellow bg-fill-width',
                  },
                  {
                    label: '红色',
                    value: 'bg-red bg-fill-width',
                  },
                  {
                    label: '警告色',
                    value: 'bg-warn bg-fill-width',
                  },
                  {
                    label: '粉色',
                    value: 'bg-pink bg-fill-width',
                  },
                  {
                    label: '橙色',
                    value: 'bg-orange bg-fill-width',
                  },
                  {
                    label: '紫色',
                    value: 'bg-purple bg-fill-width',
                  },
                ],
              },
            },
            {
              type: 'select',
              key: 'overlay',
              className: 'width-100',
              defaultValue: content?.bg?.overlay || '',
              templateOptions: {
                label: '蒙版不透明度',
                options: [
                  {
                    label: '无',
                    value: ' ',
                  },
                  {
                    label: '0.8',
                    value: 'overlay overlay-80',
                  },
                  {
                    label: '0.6',
                    value: 'overlay overlay-60',
                  },
                  {
                    label: '0.4',
                    value: 'overlay overlay-40',
                  },
                  {
                    label: '0.2',
                    value: 'overlay overlay-20',
                  },
                ],
              },
            },
            {
              type: 'input',
              key: 'id',
              className: 'width-100',
              templateOptions: {
                label: 'ID',
                description: '一般用于页面锚点定位',
              },
            },
          ],
        },
      ],
    },
  ];

  if (content.type === 'layout-builder') {
    const flexConfig: FormlyFieldConfig[] = [
      {
        templateOptions: {
          label: '布局配置',
        },
        fieldGroup: [
          {
            type: 'select',
            key: 'direction',
            className: 'width-100',
            defaultValue: content.direction || 'row',
            templateOptions: {
              label: '组件布局方向',
              options: [
                {
                  label: 'Column',
                  value: 'column',
                },
                {
                  label: 'Row',
                  value: 'row',
                },
                {
                  label: 'Row Wrap',
                  value: 'row wrap',
                },
              ],
            },
          },
          {
            key: 'gap',
            fieldGroup: [
              {
                key: 'xs',
                type: 'slider',
                defaultValue: content.gap?.xs || 0,
                templateOptions: {
                  min: 0,
                  max: 80,
                  step: 2,
                  thumbLabel: true,
                },
                expressionProperties: {
                  'templateOptions.label': '"xs gap: " + model.xs + " px"',
                },
              },
              {
                key: 'sm',
                type: 'slider',
                defaultValue: content.gap?.sm || 0,
                templateOptions: {
                  min: 0,
                  max: 80,
                  step: 2,
                  thumbLabel: true,
                },
                expressionProperties: {
                  'templateOptions.label': '"sm gap: " + model.sm + " px"',
                },
              },
              {
                key: 'md',
                type: 'slider',
                defaultValue: content.gap?.md || 0,
                templateOptions: {
                  min: 0,
                  max: 80,
                  step: 2,
                  thumbLabel: true,
                },
                expressionProperties: {
                  'templateOptions.label': '"md gap: " + model.md + " px"',
                },
              },
              {
                key: 'lg',
                type: 'slider',
                defaultValue: content.gap?.lg || 0,
                templateOptions: {
                  min: 0,
                  max: 80,
                  step: 2,
                  thumbLabel: true,
                },
                expressionProperties: {
                  'templateOptions.label': '"lg gap: " + model.lg + " px"',
                },
              },
            ],
          },
        ],
      },
    ];
    fields[0].fieldGroup?.push(...flexConfig);
  }
  return fields;
}

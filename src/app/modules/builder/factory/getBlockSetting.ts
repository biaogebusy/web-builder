import { FormlyFieldConfig } from '@ngx-formly/core';

export function getBlockSetting(layout: any): FormlyFieldConfig[] {
  let responsive: FormlyFieldConfig[] = [
    {
      fieldGroup: [
        {
          key: 'row',
          fieldGroup: [
            {
              type: 'slider',
              key: 'xs',
              className: 'width-100',
              defaultValue: layout.row.xs,
              templateOptions: {
                min: 1,
                max: 12,
                label: '移动端',
                unit: '栏',
              },
            },
            {
              type: 'slider',
              key: 'sm',
              className: 'width-100',
              defaultValue: layout.row.sm,
              templateOptions: {
                min: 1,
                max: 12,
                label: '平板电脑',
                unit: '栏',
              },
            },
            {
              type: 'slider',
              key: 'md',
              className: 'width-100',
              defaultValue: layout.row.md,
              templateOptions: {
                min: 1,
                max: 12,
                label: '桌面电脑',
                unit: '栏',
              },
            },
            {
              type: 'slider',
              key: 'lg',
              className: 'width-100',
              defaultValue: layout.row.lg,
              templateOptions: {
                min: 1,
                max: 12,
                label: '超大桌面',
                unit: '栏',
              },
            },
          ],
        },
      ],
    },
  ];
  let flexLayout: FormlyFieldConfig[] = [
    {
      className: 'layout-setting width-100',
      fieldGroupClassName: 'display-flex flex-wrap width-100',
      fieldGroup: [
        {
          className: 'width-100 m-bottom-md',
          template: `<div class="layout-preview"><div class="wrapper ${
            layout.direction
          } horizontal-${getLayoutAlign(
            0,
            layout.layoutAlign
          )} vertical-${getLayoutAlign(
            1,
            layout.layoutAlign
          )}" layoutpreview><div class="block bg-primary">1</div><div class="block bg-orange">2</div><div class="block bg-green">3</div></div></div>`,
        },
        {
          type: 'select',
          key: 'direction',
          className: 'width-100',
          defaultValue: layout.direction,
          templateOptions: {
            label: '当前列布局方向',
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
          type: 'select',
          key: 'horizontal',
          className: 'width-100',
          defaultValue: getLayoutAlign(0, layout.layoutAlign),
          templateOptions: {
            label: '水平对齐',
            options: [
              {
                label: 'None',
                value: 'flex-start',
              },
              {
                label: 'start',
                value: 'flex-start',
              },
              {
                label: 'center',
                value: 'center',
              },
              {
                label: 'end',
                value: 'flex-end',
              },
              {
                label: 'space-around',
                value: 'space-around',
              },
              {
                label: 'space-between',
                value: 'space-between',
              },
              {
                label: 'space-evenly',
                value: 'space-evenly',
              },
            ],
          },
        },
        {
          type: 'select',
          key: 'vertical',
          className: 'width-100',
          defaultValue: getLayoutAlign(1, layout.layoutAlign),
          templateOptions: {
            label: '垂直对齐',
            options: [
              {
                label: 'None',
                value: 'stretch',
              },
              {
                label: 'start',
                value: 'flex-start',
              },
              {
                label: 'center',
                value: 'center',
              },
              {
                label: 'end',
                value: 'flex-end',
              },
              {
                label: 'stretch',
                value: 'stretch',
              },
            ],
          },
        },
        {
          type: 'input',
          key: 'layoutAlign',
          className: 'width-100 display-none',
          defaultValue: layout.layoutAlign || 'center center',
          templateOptions: {
            label: '布局对齐',
          },
          hooks: {
            onInit: (formGroup: any) => {
              const { form, model } = formGroup;
              form.valueChanges.subscribe((value: any) => {
                model.layoutAlign = `${value.horizontal.replace(
                  'flex-',
                  ''
                )} ${value.vertical.replace('flex-', '')}`;
              });
            },
          },
        },
      ],
    },
  ];
  let bgImg: FormlyFieldConfig = {
    key: 'bg',
    className: 'm-top-sm',
    fieldGroup: [
      {
        key: 'img',
        fieldGroup: [
          {
            key: 'src',
            type: 'img-picker',
            defaultValue: layout?.bg?.img?.src || '',
            templateOptions: {
              label: '更新背景图',
            },
            hooks: {
              onInit: (formGroup: any) => {
                const { form } = formGroup;
                form.valueChanges.subscribe((value: any) => {
                  const srcArr = value.src.split(/\/|(?=\.\w+$)/);
                  form.get('alt').patchValue(srcArr[srcArr.length - 2], {
                    onlySelf: true,
                    emitEvent: true,
                  });
                });
              },
            },
          },
          {
            key: 'classes',
            type: 'input',
            defaultValue: layout?.bg?.img?.classes || 'object-fit',
            templateOptions: {
              label: 'Class',
            },
            hideExpression: '!model.src',
          },
          {
            key: 'alt',
            type: 'input',
            defaultValue: layout?.bg?.img?.alt || '',
            templateOptions: {
              label: 'alt',
            },
          },
        ],
      },
      {
        key: 'classes',
        type: 'input',
        defaultValue: layout?.bg?.classes || 'bg-fill-width',
        templateOptions: {
          label: 'Bg Class',
        },
        hideExpression: '!model.src',
      },
    ],
  };
  let styles: FormlyFieldConfig[] = [
    {
      className: 'width-100',
      fieldGroup: [
        {
          key: 'style',
          className: 'width-100',
          fieldGroupClassName: 'display-flex flex-wrap width-100',
          fieldGroup: [
            {
              key: 'backgroundColor',
              className: 'width-100',
              type: 'input',
              defaultValue: layout?.style?.backgroundColor || 'initial',
              templateOptions: {
                type: 'color',
                label: '背景色',
              },
              modelOptions: {
                debounce: {
                  default: 500,
                },
              },
            },
            {
              template: `<div class="p-y-xs bg-shadow m-bottom-sm"></div>`,
              className: 'width-100',
            },
            {
              type: 'slider',
              key: 'paddingTop',
              className: 'width-100',
              defaultValue: layout?.style?.paddingTop?.replace('px', '') || 0,
              templateOptions: {
                min: 0,
                max: 100,
                step: 5,
                label: 'Padding Top',
                unit: 'px',
              },
            },
            {
              type: 'slider',
              key: 'paddingRight',
              className: 'width-100',
              defaultValue: layout?.style?.paddingRight?.replace('px', '') || 0,
              templateOptions: {
                min: 0,
                max: 100,
                step: 5,
                label: 'Padding Right',
                unit: 'px',
              },
            },
            {
              type: 'slider',
              key: 'paddingBottom',
              className: 'width-100',
              defaultValue:
                layout?.style?.paddingBottom?.replace('px', '') || 0,
              templateOptions: {
                min: 0,
                max: 100,
                step: 5,
                label: 'Padding Bottom',
                unit: 'px',
              },
            },
            {
              type: 'slider',
              key: 'paddingLeft',
              className: 'width-100',
              defaultValue: layout?.style?.paddingLeft?.replace('px', '') || 0,
              templateOptions: {
                min: 0,
                max: 100,
                step: 5,
                label: 'Padding Left',
                unit: 'px',
              },
            },
            {
              template: `<div class="p-y-xs bg-shadow m-bottom-sm"></div>`,
              className: 'width-100',
            },
            {
              type: 'slider',
              key: 'marginTop',
              className: 'width-100',
              defaultValue: layout?.style?.marginTop?.replace('px', '') || 0,
              templateOptions: {
                min: -200,
                max: 100,
                step: 5,
                label: 'Margin Top',
                unit: 'px',
              },
            },
            {
              type: 'slider',
              key: 'marginRight',
              className: 'width-100',
              defaultValue: layout?.style?.marginRight?.replace('px', '') || 0,
              templateOptions: {
                min: -200,
                max: 100,
                step: 5,
                label: 'Margin Right',
                unit: 'px',
              },
            },
            {
              type: 'slider',
              key: 'marginBottom',
              className: 'width-100',
              defaultValue: layout?.style?.marginBottom?.replace('px', '') || 0,
              templateOptions: {
                min: -200,
                max: 100,
                step: 5,
                label: 'Margin Bottom',
                unit: 'px',
              },
            },
            {
              type: 'slider',
              key: 'marginLeft',
              className: 'width-100',
              defaultValue: layout?.style?.marginLeft?.replace('px', '') || 0,
              templateOptions: {
                min: -200,
                max: 100,
                step: 5,
                label: 'Margin Left',
                unit: 'px',
              },
            },
          ],
        },
      ],
      hooks: {
        onInit: (formGroup: any) => {
          const { form, model } = formGroup;
          form.valueChanges.subscribe((value: any) => {
            const { style } = value;
            model.style = {
              ...model.style,
              paddingTop: style['paddingTop'] + 'px',
              paddingRight: style['paddingRight'] + 'px',
              paddingBottom: style['paddingBottom'] + 'px',
              paddingLeft: style['paddingLeft'] + 'px',
              marginTop: style['marginTop'] + 'px',
              marginRight: style['marginRight'] + 'px',
              marginBottom: style['marginBottom'] + 'px',
              marginLeft: style['marginLeft'] + 'px',
            };
          });
        },
      },
    },
  ];
  let fields: FormlyFieldConfig[] = [
    {
      type: 'tabs',
      key: 'block',
      fieldGroup: [
        {
          templateOptions: {
            label: '基础配置',
          },
          fieldGroup: [...responsive, ...flexLayout, bgImg],
        },
        {
          templateOptions: {
            label: '样式',
          },
          fieldGroup: [...styles],
        },
      ],
    },
  ];
  return fields;
}

export function getLayoutAlign(index: number, layoutAlign: string): string {
  if (!layoutAlign) {
    return 'flex-start';
  }
  const align = layoutAlign.split(' ')[index];
  switch (align) {
    case 'start':
      return 'flex-start';
    case 'end':
      return 'flex-end';
    default:
      return align;
  }
}

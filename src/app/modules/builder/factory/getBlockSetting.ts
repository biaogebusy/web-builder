import { FormlyFieldConfig } from '@ngx-formly/core';

export function getBlockSetting(layout: any): FormlyFieldConfig[] {
  let responsive: FormlyFieldConfig[] = [
    {
      key: 'responsive',
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
                thumbLabel: true,
              },
              expressionProperties: {
                'templateOptions.label': '"移动端: " + model.xs + " 栏"',
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
                thumbLabel: true,
              },
              expressionProperties: {
                'templateOptions.label': '"平板电脑: " + model.sm + " 栏"',
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
                thumbLabel: true,
              },
              expressionProperties: {
                'templateOptions.label': '"桌面电脑: " + model.md + " 栏"',
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
                thumbLabel: true,
              },
              expressionProperties: {
                'templateOptions.label': '"超大桌面: " + model.lg + " 栏"',
              },
            },
          ],
        },
      ],
    },
  ];
  let flexLayout: FormlyFieldConfig[] = [
    {
      key: 'flex',
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
  let styles: FormlyFieldConfig[] = [
    {
      key: 'styles',
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
                min: 5,
                max: 100,
                step: 5,
                thumbLabel: true,
              },
              expressionProperties: {
                'templateOptions.label': '"Padding top: " + model.paddingTop',
              },
            },
            {
              type: 'slider',
              key: 'paddingRight',
              className: 'width-100',
              defaultValue: layout?.style?.paddingRight?.replace('px', '') || 0,
              templateOptions: {
                min: 5,
                max: 100,
                step: 5,
                thumbLabel: true,
              },
              expressionProperties: {
                'templateOptions.label':
                  '"Padding right: " + model.paddingRight',
              },
            },
            {
              type: 'slider',
              key: 'paddingBottom',
              className: 'width-100',
              defaultValue:
                layout?.style?.paddingBottom?.replace('px', '') || 0,
              templateOptions: {
                min: 5,
                max: 100,
                step: 5,
                thumbLabel: true,
              },
              expressionProperties: {
                'templateOptions.label':
                  '"Padding bottom: " + model.paddingBottom',
              },
            },
            {
              type: 'slider',
              key: 'paddingLeft',
              className: 'width-100',
              defaultValue: layout?.style?.paddingLeft?.replace('px', '') || 0,
              templateOptions: {
                min: 5,
                max: 100,
                step: 5,
                thumbLabel: true,
              },
              expressionProperties: {
                'templateOptions.label': '"Padding left: " + model.paddingLeft',
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
                thumbLabel: true,
              },
              expressionProperties: {
                'templateOptions.label': '"Margin top: " + model.marginTop',
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
                thumbLabel: true,
              },
              expressionProperties: {
                'templateOptions.label': '"Margin right: " + model.marginRight',
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
                thumbLabel: true,
              },
              expressionProperties: {
                'templateOptions.label':
                  '"Margin bottom: " + model.marginBottom',
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
                thumbLabel: true,
              },
              expressionProperties: {
                'templateOptions.label': '"Margin left: " + model.marginLeft',
              },
            },
          ],
        },
      ],
      hooks: {
        onInit: (formGroup: any) => {
          const { form, model } = formGroup;
          form.valueChanges.subscribe((value: any) => {
            const { styles } = value;
            model.style = {
              ...model.style,
              paddingTop: styles.style['paddingTop'] + 'px',
              paddingRight: styles.style['paddingRight'] + 'px',
              paddingBottom: styles.style['paddingBottom'] + 'px',
              paddingLeft: styles.style['paddingLeft'] + 'px',
              marginTop: styles.style['marginTop'] + 'px',
              marginRight: styles.style['marginRight'] + 'px',
              marginBottom: styles.style['marginBottom'] + 'px',
              marginLeft: styles.style['marginLeft'] + 'px',
            };
          });
        },
      },
    },
  ];
  let fields: FormlyFieldConfig[] = [
    {
      type: 'tabs',
      fieldGroup: [
        {
          templateOptions: {
            label: '基础配置',
          },
          fieldGroup: [...responsive, ...flexLayout],
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

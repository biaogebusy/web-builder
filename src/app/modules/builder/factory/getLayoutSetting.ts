import { FormlyFieldConfig } from '@ngx-formly/core';
import { getAnimate } from './getAnimate';
import {
  getBgClasses,
  getDirectionOption,
  getGapsGroup,
  getHorizontalOption,
  getOverlay,
  getVerticalOption,
} from './getCommon';

export function getLayoutSetting(layout: any): FormlyFieldConfig[] {
  let responsive: FormlyFieldConfig[] = [
    {
      fieldGroup: [
        {
          template: `<div class="small p-y-xs m-bottom-xs">栏数</div>`,
          className: 'width-100',
        },
        {
          key: 'row',
          fieldGroupClassName: 'section-group',
          fieldGroup: [
            {
              type: 'input',
              key: 'xs',
              className: 'width-40',
              defaultValue: layout?.row?.xs || 12,
              templateOptions: {
                min: 1,
                max: 12,
                label: 'xs',
                type: 'number',
              },
            },
            {
              type: 'input',
              key: 'sm',
              className: 'width-40',
              defaultValue: layout?.row?.sm || 12,
              templateOptions: {
                min: 1,
                max: 12,
                label: 'sm',
                type: 'number',
              },
            },
            {
              type: 'input',
              key: 'md',
              className: 'width-40',
              defaultValue: layout?.row?.md || 12,
              templateOptions: {
                min: 1,
                max: 12,
                label: 'md',
                type: 'number',
              },
            },
            {
              type: 'input',
              key: 'lg',
              className: 'width-40',
              defaultValue: layout?.row?.lg || 12,
              templateOptions: {
                min: 1,
                max: 12,
                label: 'lg',
                type: 'number',
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
            options: getDirectionOption,
          },
        },
        {
          type: 'select',
          key: 'horizontal',
          className: 'width-100',
          defaultValue: getLayoutAlign(0, layout.layoutAlign),
          templateOptions: {
            label: '水平对齐',
            options: getHorizontalOption,
          },
        },
        {
          type: 'select',
          key: 'vertical',
          className: 'width-100',
          defaultValue: getLayoutAlign(1, layout.layoutAlign),
          templateOptions: {
            label: '垂直对齐',
            options: getVerticalOption,
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
        {
          key: 'gap',
          fieldGroup: getGapsGroup(layout),
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
              updateLabel: '更新背景图',
              addLabel: '设置背景图',
              deleteLabel: '删除',
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
            key: 'alt',
            type: 'input',
            defaultValue: layout?.bg?.img?.alt || '',
            templateOptions: {
              label: 'alt',
            },
            hideExpression: '!model.src',
          },
          {
            key: 'classes',
            type: 'select',
            defaultValue: layout?.bg?.img?.classes || 'object-fit',
            templateOptions: {
              label: '背景填充方式',
              options: [
                {
                  label: '按比例铺满 cover',
                  value: 'object-cover',
                },
                {
                  label: '按比例完整显示 contain',
                  value: 'object-contain',
                },
                {
                  label: '拉伸铺满 fill',
                  value: 'object-fill',
                },
              ],
            },
            hideExpression: '!model.src',
          },
        ],
      },
      {
        type: 'select',
        key: 'overlay',
        className: 'width-100',
        defaultValue: layout?.bg?.overlay || '',
        templateOptions: {
          label: '蒙版不透明度',
          options: getOverlay,
        },
      },
      {
        key: 'classes',
        type: 'select',
        defaultValue: layout?.bg?.classes || 'bg-fill-width',
        templateOptions: {
          label: '预设背景色',
          options: getBgClasses,
        },
      },
    ],
  };
  let styles: FormlyFieldConfig[] = [
    {
      className: 'width-100',
      fieldGroup: [
        bgImg,
        {
          type: 'input',
          key: 'classes',
          className: 'width-100',
          defaultValue: layout?.classes || '',
          templateOptions: {
            label: '自定义Classes',
          },
        },
        {
          key: 'style',
          className: 'width-100',
          fieldGroupClassName: 'display-flex flex-wrap width-100',
          fieldGroup: [
            {
              type: 'input',
              key: 'borderRadius',
              className: 'width-100',
              defaultValue: layout?.style?.borderRadius || 'none',
              templateOptions: {
                label: '圆角',
              },
            },
            {
              template: `<div class="small p-y-xs m-bottom-xs">Padding</div>`,
              className: 'width-100',
            },
            {
              fieldGroupClassName: 'section-group',
              fieldGroup: [
                {
                  type: 'input',
                  key: 'paddingTop',
                  className: 'width-40 m-right-sm',
                  defaultValue: layout?.style?.paddingTop,
                  templateOptions: {
                    label: 'Top',
                  },
                },
                {
                  type: 'input',
                  key: 'paddingRight',
                  className: 'width-40',
                  defaultValue: layout?.style?.paddingRight,
                  templateOptions: {
                    label: 'Right',
                  },
                },
                {
                  type: 'input',
                  key: 'paddingBottom',
                  className: 'width-40 m-right-sm',
                  defaultValue: layout?.style?.paddingBottom,
                  templateOptions: {
                    label: 'Bottom',
                  },
                },
                {
                  type: 'input',
                  key: 'paddingLeft',
                  className: 'width-40',
                  defaultValue: layout?.style?.paddingLeft,
                  templateOptions: {
                    label: 'Left',
                  },
                },
              ],
            },
            {
              template: `<div class="small p-y-xs m-bottom-xs">Margin</div>`,
              className: 'width-100',
            },
            {
              fieldGroupClassName: 'section-group',
              fieldGroup: [
                {
                  type: 'input',
                  key: 'marginTop',
                  className: 'width-40 m-right-sm',
                  defaultValue: layout?.style?.marginTop,
                  templateOptions: {
                    label: 'Top',
                  },
                },
                {
                  type: 'input',
                  key: 'marginRight',
                  className: 'width-40',
                  defaultValue: layout?.style?.marginRight,
                  templateOptions: {
                    label: 'Right',
                  },
                },
                {
                  type: 'input',
                  key: 'marginBottom',
                  className: 'width-40 m-right-sm',
                  defaultValue: layout?.style?.marginBottom,
                  templateOptions: {
                    label: 'Bottom',
                  },
                },
                {
                  type: 'input',
                  key: 'marginLeft',
                  className: 'width-40',
                  defaultValue: layout?.style?.marginLeft,
                  templateOptions: {
                    label: 'Left',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  let fields: FormlyFieldConfig[] = [
    {
      type: 'tabs',
      key: 'block',
      fieldGroup: [
        {
          templateOptions: {
            label: '基础',
          },
          fieldGroup: [...responsive, ...flexLayout],
        },
        {
          templateOptions: {
            label: '样式',
          },
          fieldGroup: [...styles],
        },
        getAnimate(layout),
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

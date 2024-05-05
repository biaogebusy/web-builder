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
  const responsive: FormlyFieldConfig[] = [
    {
      fieldGroup: [
        {
          template: `<div class="small p-y-xs m-bottom-xs">栏数</div>`,
          className: 'w-full',
        },
        {
          key: 'row',
          fieldGroupClassName: 'section-group',
          fieldGroup: [
            {
              type: 'input',
              key: 'xs',
              className: 'w-2/5',
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
              className: 'w-2/5',
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
              className: 'w-2/5',
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
              className: 'w-2/5',
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
  const flexLayout: FormlyFieldConfig[] = [
    {
      className: 'layout-setting w-full',
      fieldGroupClassName: 'flex flex-wrap w-full',
      fieldGroup: [
        {
          className: 'w-full m-bottom-md',
          template: `<div class="layout-preview">
          <div class="wrapper flex flex-${layout.direction} gap-6 justify-${layout.horizontal} items-${layout.vertical}"><div class="block bg-primary">1</div><div class="block bg-orange">2</div><div class="block bg-green">3</div></div>
          </div>`,
        },
        {
          type: 'select',
          key: 'direction',
          className: 'w-full',
          defaultValue: layout.direction,
          templateOptions: {
            label: '当前列布局方向',
            options: getDirectionOption,
            required: true,
          },
        },
        {
          type: 'select',
          key: 'horizontal',
          className: 'w-full',
          defaultValue: layout.horizontal,
          templateOptions: {
            label: '水平对齐',
            options: getHorizontalOption,
          },
        },
        {
          type: 'select',
          key: 'vertical',
          className: 'w-full',
          defaultValue: layout.vertical,
          templateOptions: {
            label: '垂直对齐',
            options: getVerticalOption,
          },
        },
        {
          key: 'gap',
          fieldGroup: getGapsGroup(layout),
        },
      ],
    },
  ];
  const bgImg: FormlyFieldConfig = {
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
        className: 'w-full',
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
  const styles: FormlyFieldConfig[] = [
    {
      className: 'w-full',
      fieldGroup: [
        bgImg,
        {
          type: 'input',
          key: 'classes',
          className: 'w-full',
          defaultValue: layout?.classes || '',
          templateOptions: {
            label: '自定义Classes',
          },
        },
        {
          key: 'style',
          className: 'w-full',
          fieldGroupClassName: 'flex flex-wrap w-full',
          fieldGroup: [
            {
              type: 'input',
              key: 'borderRadius',
              className: 'w-full',
              defaultValue: layout?.style?.borderRadius || 'none',
              templateOptions: {
                label: '圆角',
              },
            },
            {
              template: `<div class="small p-y-xs m-bottom-xs">Spacing</div>`,
              className: 'w-full',
            },
            {
              fieldGroupClassName: 'section-group',
              fieldGroup: [
                {
                  type: 'input',
                  key: 'padding',
                  className: 'w-2/5 mr-5',
                  defaultValue: layout?.style?.padding,
                  templateOptions: {
                    label: 'Padding',
                  },
                },
                {
                  type: 'input',
                  key: 'margin',
                  className: 'w-2/5',
                  defaultValue: layout?.style?.margin,
                  templateOptions: {
                    label: 'Margin',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  const fields: FormlyFieldConfig[] = [
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

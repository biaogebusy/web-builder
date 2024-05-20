import { FormlyFieldConfig } from '@ngx-formly/core';
import { getAnimate } from './getAnimate';
import { getBgClasses, getFlexLayoutConfig, getOverlay } from './getCommon';

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
              defaultValue: layout?.row?.xs ?? 12,
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
              defaultValue: layout?.row?.sm ?? 12,
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
              defaultValue: layout?.row?.md ?? 12,
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
              defaultValue: layout?.row?.lg ?? 12,
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
      fieldGroup: [...getFlexLayoutConfig(layout)],
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
            defaultValue: layout?.bg?.img?.src ?? '',
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
            defaultValue: layout?.bg?.img?.alt ?? '',
            templateOptions: {
              label: 'alt',
            },
            hideExpression: '!model.src',
          },
          {
            key: 'classes',
            type: 'select',
            defaultValue: layout?.bg?.img?.classes ?? 'object-fit',
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
        defaultValue: layout?.bg?.overlay ?? '',
        templateOptions: {
          label: '蒙版不透明度',
          options: getOverlay,
        },
      },
      {
        key: 'classes',
        type: 'select',
        defaultValue: layout?.bg?.classes ?? 'bg-fill-width',
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
          defaultValue: layout?.classes ?? '',
          templateOptions: {
            label: 'Layout Class',
          },
        },
        {
          type: 'input',
          key: 'blockClasses',
          className: 'w-full',
          defaultValue: layout?.blockClasses ?? '',
          templateOptions: {
            label: 'Block Class',
          },
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

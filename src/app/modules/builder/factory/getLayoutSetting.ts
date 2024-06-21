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
          fieldGroupClassName: 'grid grid-cols-12 gap-3',
          fieldGroup: [
            {
              type: 'input',
              key: 'xs',
              className: 'col-span-6',
              defaultValue: layout?.row?.xs ?? 12,
              props: {
                min: 1,
                max: 12,
                label: 'xs',
                type: 'number',
              },
            },
            {
              type: 'input',
              key: 'sm',
              className: 'col-span-6',
              defaultValue: layout?.row?.sm ?? 12,
              props: {
                min: 1,
                max: 12,
                label: 'sm',
                type: 'number',
              },
            },
            {
              type: 'input',
              key: 'md',
              className: 'col-span-6',
              defaultValue: layout?.row?.md ?? 12,
              props: {
                min: 1,
                max: 12,
                label: 'md',
                type: 'number',
              },
            },
            {
              type: 'input',
              key: 'lg',
              className: 'col-span-6',
              defaultValue: layout?.row?.lg ?? 12,
              props: {
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
            props: {
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
            props: {
              label: 'alt',
            },
            hideExpression: '!model.src',
          },
          {
            key: 'classes',
            type: 'select',
            defaultValue: layout?.bg?.img?.classes ?? 'bg-cover',
            props: {
              label: '背景填充方式',
              options: [
                {
                  label: '按比例铺满 cover',
                  value: 'bg-cover',
                },
                {
                  label: '按比例完整显示 contain',
                  value: 'bg-contain',
                },
                {
                  label: '拉伸铺满 fill',
                  value: 'bg-fill',
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
        props: {
          label: '蒙版不透明度',
          options: getOverlay,
        },
      },
      {
        key: 'classes',
        type: 'select',
        defaultValue: layout?.bg?.classes ?? 'bg-fill-width',
        props: {
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
          props: {
            label: 'Layout Class',
          },
        },
        {
          type: 'input',
          key: 'blockClasses',
          className: 'w-full',
          defaultValue: layout?.blockClasses ?? '',
          props: {
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
          props: {
            label: '基础',
          },
          fieldGroup: [...responsive, ...flexLayout],
        },
        {
          props: {
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

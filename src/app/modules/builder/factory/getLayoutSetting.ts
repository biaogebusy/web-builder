import { FormlyFieldConfig } from '@ngx-formly/core';
import { getAnimate } from './getAnimate';
import { getBgClasses, getGridLayoutConfig, getOverlay } from './getCommon';

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
      fieldGroupClassName: 'w-full',
      fieldGroup: [...getGridLayoutConfig(layout)],
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
              updateLabel: 'BUILDER.FACTORY.BG_IMG_UPDATE',
              addLabel: 'BUILDER.FACTORY.BG_IMG_ADD',
              deleteLabel: 'BUILDER.FACTORY.BG_IMG_DELETE',
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
              label: 'BUILDER.FACTORY.BG_FILL_TYPE',
              options: [
                {
                  label: 'BUILDER.FACTORY.BG_FIT_COVER',
                  value: 'bg-cover',
                },
                {
                  label: 'BUILDER.FACTORY.BG_FIT_CONTAIN',
                  value: 'bg-contain',
                },
                {
                  label: 'BUILDER.FACTORY.BG_FIT_FILL',
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
          label: 'BUILDER.FACTORY.OVERLAY_OPACITY',
          options: getOverlay,
        },
      },
      {
        key: 'classes',
        type: 'select',
        defaultValue: layout?.bg?.classes ?? 'bg-fill-width',
        props: {
          label: 'BUILDER.FACTORY.PRESET_BG',
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
            label: 'BUILDER.FACTORY.BASIC_TAB',
          },
          fieldGroup: [...responsive, ...flexLayout],
        },
        {
          props: {
            label: 'BUILDER.FACTORY.STYLE_TAB',
          },
          fieldGroup: [...styles],
        },
        getAnimate(layout),
      ],
    },
  ];
  return fields;
}

import { FormlyFieldConfig } from '@ngx-formly/core';
import { getSwiper } from './getSwiper';
import { getTitle } from './getTitle';
import { getText } from './getText';
import { getAnimate } from './getAnimate';
import { getBgClasses, getGridLayoutConfig, getOverlay, getSpacerOptions } from './getCommon';
import { getVideo } from './getVideo';

export function getComponentSetting(content: any): FormlyFieldConfig[] {
  const fields: FormlyFieldConfig[] = [
    {
      type: 'tabs',
      key: 'component',
      fieldGroup: [
        {
          props: {
            label: '通用',
          },
          fieldGroupClassName: 'grid grid-cols-12 gap-3',
          fieldGroup: [
            {
              type: 'select',
              key: 'fullWidth',
              className: 'col-span-6',
              defaultValue: content.fullWidth ?? false,
              props: {
                label: '全屏宽',
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
              defaultValue: content.spacer ?? 'none',
              className: 'col-span-6',
              props: {
                label: '上下间距',
                options: getSpacerOptions,
              },
            },
            {
              type: 'select',
              key: 'bgClasses',
              className: 'col-span-6',
              defaultValue: content?.bg?.classes ?? 'bg- bg-fill-width',
              props: {
                label: '背景色',
                options: getBgClasses,
              },
            },
            {
              type: 'select',
              key: 'overlay',
              className: 'col-span-6',
              defaultValue: content?.bg?.overlay ?? '',
              props: {
                label: '蒙版',
                options: getOverlay,
              },
            },
            {
              type: 'input',
              key: 'containerClasses',
              className: 'col-span-6',
              defaultValue: content.containerClasses ?? '',
              props: {
                label: 'Classes',
                description: '组件 class',
              },
            },
            {
              type: 'input',
              key: 'id',
              className: 'col-span-6',
              defaultValue: content.id ?? '',
              props: {
                label: 'ID',
                description: 'HTML ID',
              },
            },
            {
              key: 'bg',
              className: 'col-span-12 mt-3',
              fieldGroup: [
                {
                  key: 'img',
                  fieldGroup: [
                    {
                      key: 'src',
                      type: 'img-picker',
                      defaultValue: content?.bg?.img?.src ?? '',
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
                      key: 'classes',
                      type: 'select',
                      defaultValue: content?.bg?.img?.classes ?? 'bg-cover',
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
                    {
                      key: 'alt',
                      type: 'input',
                      defaultValue: content?.bg?.img?.alt ?? '',
                      props: {
                        label: 'alt',
                      },
                    },
                  ],
                },
                {
                  key: 'classes',
                  type: 'input',
                  defaultValue: content?.bg?.classes ?? 'bg-fill-width',
                  props: {
                    label: 'Bg Class',
                  },
                  hideExpression: '!model.src',
                },
              ],
            },
          ],
        },
      ],
      hooks: {
        onInit: (formGroup: any) => {
          const { form, model } = formGroup;
          form.valueChanges.subscribe((value: any) => {
            const { component } = value;
            model.bg = {
              ...model.bg,
              ...{
                classes: component.bgClasses,
                overlay: component.overlay,
              },
            };
          });
        },
      },
    },
  ];

  if (content.type === 'layout-builder') {
    const flexConfig: FormlyFieldConfig[] = [
      {
        props: {
          label: '布局',
        },
        fieldGroup: [
          ...getGridLayoutConfig(content),
          {
            type: 'input',
            key: 'wrapperClass',
            className: 'w-full',
            defaultValue: content.wrapperClass ?? '',
            props: {
              label: 'Wrapper Classes',
            },
          },
        ],
      },
    ];
    fields[0].fieldGroup?.push(...flexConfig);
  }

  if (content.type === 'swiper') {
    fields[0].fieldGroup?.push({
      props: {
        label: '幻灯片',
      },
      fieldGroup: [
        {
          type: 'tabs',
          fieldGroup: getSwiper(content)[0].fieldGroup,
        },
      ],
    });
  }

  if (content.type === 'video') {
    fields[0].fieldGroup?.push({
      props: {
        label: '视频',
      },
      fieldGroup: getVideo(content)[0].fieldGroup,
    });
  }

  if (content.type === 'text') {
    fields[0].fieldGroup?.push({
      props: {
        label: '文本',
      },
      fieldGroup: [
        ...getTitle(content.title),
        {
          key: 'body',
          type: 'rich-text',
          className: 'w-full',
          defaultValue: content.body,
          props: {
            label: '内容',
            rows: 10,
          },
        },
        {
          key: 'actionsAlign',
          type: 'select',
          className: 'w-full',
          defaultValue: content.actionsAlign ?? 'center',
          props: {
            label: '按钮对齐',
            options: [
              {
                label: '左对齐',
                value: 'start',
              },
              {
                label: '居中对齐',
                value: 'center',
              },
              {
                label: '右对齐',
                value: 'end',
              },
            ],
          },
        },
      ],
    });
  }

  if (
    content.type === 'carousel-1v1' ||
    content.type === 'carousel-1v2' ||
    content.type === 'carousel-2v2' ||
    content.type === 'hero-1v1'
  ) {
    if (content.title) {
      const titleConfig: FormlyFieldConfig = {
        props: {
          label: '标题',
        },
        fieldGroup: [...getTitle(content.title)],
      };
      fields[0].fieldGroup?.push(titleConfig);
    }

    const swiperConfig: FormlyFieldConfig = {
      props: {
        label: '幻灯片',
      },
      fieldGroup: [
        {
          ...getSwiper(content.sliders)[0],
          key: 'sliders',
        },
      ],
    };

    fields[0].fieldGroup?.push(swiperConfig);
  }

  if (content.type === 'carousel-1v3') {
    if (content.text) {
      const textConfig: FormlyFieldConfig = {
        props: {
          label: '标题',
        },
        fieldGroup: [...getText(content.text)],
      };
      fields[0].fieldGroup?.push(textConfig);
    }
    const swiperConfig: FormlyFieldConfig = {
      props: {
        label: '幻灯片',
      },
      fieldGroup: [
        {
          ...getSwiper(content.sliders)[0],
          key: 'sliders',
        },
      ],
    };

    fields[0].fieldGroup?.push(swiperConfig);
  }

  if (content.type === 'carousel-2v1') {
    if (content.title) {
      const titleConfig: FormlyFieldConfig = {
        props: {
          label: '标题',
        },
        fieldGroup: [...getTitle(content.title)],
      };
      fields[0].fieldGroup?.push(titleConfig);
    }

    const swiperConfig: FormlyFieldConfig = {
      props: {
        label: '幻灯片',
      },
      fieldGroup: [
        {
          ...getSwiper(content.sliders)[0],
          key: 'sliders',
        },
      ],
    };

    fields[0].fieldGroup?.push(swiperConfig);
  }

  fields[0].fieldGroup?.push(getAnimate(content));
  return fields;
}

import { FormlyFieldConfig } from '@ngx-formly/core';
import { getSwiper } from './getSwiper';
import { getTitle } from './getTitle';
import { getText } from './getText';
import { getAnimate } from './getAnimate';
import { getBgClasses, getGridLayoutConfig, getOverlay, getSpacerOptions } from './getCommon';
import { getVideo } from './getVideo';
import { getWidgetSetting } from './getWidgetSetting';

export function getComponentSetting(content: any, path: string): FormlyFieldConfig[] {
  const fields: FormlyFieldConfig = {
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
                fieldGroupClassName: 'grid grid-cols-12 gap-3',
                fieldGroup: [
                  {
                    type: 'select',
                    key: 'classes',
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
                      label: '背景蒙版',
                      options: getOverlay,
                    },
                  },
                ],
              },

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
  };

  const tabsGroup = fields.fieldGroup;
  let componentConfig: FormlyFieldConfig[] = [];
  switch (content.type) {
    case 'layout-builder':
      componentConfig = [
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
      break;
    case 'swiper':
      componentConfig = [
        {
          props: {
            label: '幻灯片',
          },
          fieldGroup: [
            {
              type: 'tabs',
              fieldGroup: getSwiper(content).fieldGroup,
            },
          ],
        },
      ];
      break;

    case 'video':
      componentConfig = [
        {
          props: {
            label: '视频',
          },
          fieldGroup: getVideo(content).fieldGroup,
        },
      ];
      break;

    case 'text':
      componentConfig = [
        {
          props: {
            label: '文本',
          },
          fieldGroup: [
            content.title ? getTitle(content.title) : {},
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
        },
      ];
      break;

    case 'carousel-1v3':
      if (content.text) {
        const textConfig: FormlyFieldConfig = {
          props: {
            label: '标题',
          },
          fieldGroup: [getText(content.text)],
        };
        componentConfig.push(textConfig);
      }
      const swiperConfig1v3: FormlyFieldConfig = {
        props: {
          label: '幻灯片',
        },
        fieldGroup: [
          {
            ...getSwiper(content.swiper),
            key: 'swiper',
          },
        ],
      };
      componentConfig.push(swiperConfig1v3);
      break;

    case 'carousel-2v1':
      if (content.title) {
        const titleConfig: FormlyFieldConfig = {
          props: {
            label: '标题',
          },
          fieldGroup: [getTitle(content.title)],
        };
        componentConfig.push(titleConfig);
      }

      const swiperConfig2v1: FormlyFieldConfig = {
        props: {
          label: '幻灯片',
        },
        fieldGroup: [
          {
            ...getSwiper(content.swiper),
            key: 'swiper',
          },
        ],
      };

      componentConfig.push(swiperConfig2v1);
      break;

    case 'carousel-1v1':
    case 'carousel-1v2':
    case 'carousel-2v2':
    case 'hero-1v1':
      if (content.title) {
        const titleConfig: FormlyFieldConfig = {
          props: {
            label: '标题',
          },
          fieldGroup: [getTitle(content.title)],
        };
        componentConfig.push(titleConfig);
      }

      const swiperConfig: FormlyFieldConfig = {
        props: {
          label: '幻灯片',
        },
        fieldGroup: [
          {
            ...getSwiper(content.swiper),
            key: 'swiper',
          },
        ],
      };

      componentConfig.push(swiperConfig);
      break;

    default:
      componentConfig = [
        {
          props: {
            label: '组件',
          },
          fieldGroup: getWidgetSetting(content).fieldGroup,
        },
      ];
  }
  if (path.includes('.')) {
    tabsGroup?.unshift(...componentConfig);
  } else {
    tabsGroup?.push(...componentConfig);
  }
  tabsGroup?.push(getAnimate(content));
  return [fields];
}

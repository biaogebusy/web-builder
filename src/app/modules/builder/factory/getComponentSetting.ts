import { FormlyFieldConfig } from '@ngx-formly/core';
import { getSwiper } from './getSwiper';
import { getTitle } from './getTitle';
import { getText } from './getText';
import { getAnimate } from './getAnimate';
import { getBgClasses, getGridLayoutConfig, getOverlay, getSpacerOptions } from './getCommon';
import { getVideo } from './getVideo';
import { getWidgetSetting } from './getWidgetSetting';

export function getComponentSetting(content: any): FormlyFieldConfig[] {
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
  };

  const tabsGroup = fields.fieldGroup;
  switch (content.type) {
    case 'layout-builder':
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
      tabsGroup?.push(...flexConfig);
      break;
    case 'swiper':
      tabsGroup?.push({
        props: {
          label: '幻灯片',
        },
        fieldGroup: [
          {
            type: 'tabs',
            fieldGroup: getSwiper(content).fieldGroup,
          },
        ],
      });
      break;

    case 'video':
      tabsGroup?.push({
        props: {
          label: '视频',
        },
        fieldGroup: getVideo(content).fieldGroup,
      });
      break;

    case 'text':
      tabsGroup?.push({
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
      });
      break;

    case 'carousel-1v3':
      if (content.text) {
        const textConfig: FormlyFieldConfig = {
          props: {
            label: '标题',
          },
          fieldGroup: [getText(content.text)],
        };
        tabsGroup?.push(textConfig);
      }
      const swiperConfig1v3: FormlyFieldConfig = {
        props: {
          label: '幻灯片',
        },
        fieldGroup: [
          {
            ...getSwiper(content.sliders),
            key: 'sliders',
          },
        ],
      };

      tabsGroup?.push(swiperConfig1v3);
      break;

    case 'carousel-2v1':
      if (content.title) {
        const titleConfig: FormlyFieldConfig = {
          props: {
            label: '标题',
          },
          fieldGroup: [getTitle(content.title)],
        };
        tabsGroup?.push(titleConfig);
      }

      const swiperConfig2v1: FormlyFieldConfig = {
        props: {
          label: '幻灯片',
        },
        fieldGroup: [
          {
            ...getSwiper(content.sliders),
            key: 'sliders',
          },
        ],
      };

      tabsGroup?.push(swiperConfig2v1);
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
        tabsGroup?.push(titleConfig);
      }

      const swiperConfig: FormlyFieldConfig = {
        props: {
          label: '幻灯片',
        },
        fieldGroup: [
          {
            ...getSwiper(content.sliders),
            key: 'sliders',
          },
        ],
      };

      tabsGroup?.push(swiperConfig);
      break;

    default:
      tabsGroup?.push({
        props: {
          label: '组件',
        },
        fieldGroup: getWidgetSetting(content).fieldGroup,
      });
  }

  tabsGroup?.push(getAnimate(content));
  return [fields];
}

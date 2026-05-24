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
          label: 'BUILDER.FACTORY.COMMON_TAB',
        },
        fieldGroupClassName: 'grid grid-cols-12',
        fieldGroup: [
          {
            fieldGroupClassName: 'grid grid-cols-12 gap-3',
            className: 'col-span-12',
            fieldGroup: [
              {
                type: 'select',
                key: 'fullWidth',
                className: 'col-span-6',
                defaultValue: content.fullWidth ?? false,
                props: {
                  label: 'BUILDER.FACTORY.FULL_WIDTH',
                  options: [
                    {
                      label: 'BUILDER.FACTORY.FULL_SCREEN',
                      value: true,
                    },
                    {
                      label: 'BUILDER.FACTORY.NOT_FULL_SCREEN',
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
                  label: 'BUILDER.FACTORY.VERTICAL_GAP',
                  options: getSpacerOptions,
                },
              },
            ],
          },
          {
            type: 'input',
            key: 'containerClasses',
            className: 'col-span-12',
            defaultValue: content.containerClasses ?? '',
            props: {
              label: 'BUILDER.FACTORY.WIDGET_CLASS',
            },
          },
          {
            key: 'bg',
            className: 'col-span-12',
            fieldGroup: [
              {
                fieldGroupClassName: 'grid grid-cols-12 gap-3',
                fieldGroup: [
                  {
                    type: 'select',
                    key: 'classes',
                    className: 'col-span-12',
                    defaultValue: content?.bg?.classes ?? '',
                    props: {
                      label: 'BUILDER.FACTORY.BG_COLOR',
                      options: getBgClasses,
                    },
                  },
                  {
                    type: 'select',
                    key: 'variant',
                    className: 'col-span-6',
                    defaultValue: content?.bg?.variant,
                    props: {
                      label: 'BUILDER.FACTORY.BG_LEVEL',
                      options: [
                        {
                          label: 'BUILDER.FACTORY.NONE',
                          value: 0,
                        },
                        {
                          label: '50',
                          value: 50,
                        },
                        {
                          label: '100',
                          value: 100,
                        },
                        {
                          label: '200',
                          value: 200,
                        },
                        {
                          label: '300',
                          value: 300,
                        },
                        {
                          label: '400',
                          value: 400,
                        },
                        {
                          label: '500',
                          value: 500,
                        },
                        {
                          label: '600',
                          value: 600,
                        },
                        {
                          label: '700',
                          value: 700,
                        },
                        {
                          label: '800',
                          value: 800,
                        },
                        {
                          label: '900',
                          value: 900,
                        },
                      ],
                    },
                    validation: {
                      messages: {
                        required: 'BUILDER.FACTORY.BG_VARIANT_REQUIRED',
                      },
                    },
                    expressions: {
                      'props.required': (field: FormlyFieldConfig) => {
                        const classes = field.parent?.model?.classes;
                        if (classes) {
                          field.form?.get('variant')?.markAsTouched();
                          return true;
                        } else {
                          return false;
                        }
                      },
                    },
                  },
                  {
                    type: 'select',
                    key: 'overlay',
                    className: 'col-span-6',
                    defaultValue: content?.bg?.overlay ?? '',
                    props: {
                      label: 'BUILDER.FACTORY.BG_MASK',
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
                    key: 'classes',
                    type: 'select',
                    defaultValue: content?.bg?.img?.classes ?? 'bg-cover',
                    props: {
                      multiple: true,
                      label: 'BUILDER.FACTORY.BG_SETTING',
                      options: [
                        {
                          label: 'Cover',
                          value: 'bg-cover',
                        },
                        {
                          label: 'Contain',
                          value: 'bg-contain',
                        },
                        {
                          label: 'Auto',
                          value: 'bg-auto',
                        },
                        {
                          label: 'No Repeat',
                          value: 'bg-no-repeat',
                        },
                        {
                          label: 'Center',
                          value: 'bg-center',
                        },
                        {
                          label: 'Bottom',
                          value: 'bg-bottom',
                        },
                        {
                          label: 'Left',
                          value: 'bg-left',
                        },
                        {
                          label: 'Left Bottom',
                          value: 'bg-left-bottom',
                        },
                        {
                          label: 'Left Top',
                          value: 'bg-left-top',
                        },
                        {
                          label: 'Right',
                          value: 'bg-right',
                        },
                        {
                          label: 'Right Bottom',
                          value: 'bg-right-bottom',
                        },
                        {
                          label: 'Right Top',
                          value: 'bg-right-top',
                        },
                        {
                          label: 'Top',
                          value: 'bg-top',
                        },
                        {
                          label: 'fixed',
                          value: 'bg-fixed',
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
                defaultValue: content?.bg?.classes ?? '',
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
            label: 'BUILDER.FACTORY.LAYOUT_TAB',
          },
          fieldGroup: [
            ...getGridLayoutConfig(content),
            {
              type: 'input',
              key: 'wrapperClass',
              className: 'w-full',
              defaultValue: content.wrapperClass ?? '',
              props: {
                label: 'BUILDER.FACTORY.WRAPPER_CLASSES',
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
            label: 'BUILDER.FACTORY.SLIDESHOW_TAB',
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
            label: 'BUILDER.FACTORY.VIDEO_TAB_LABEL',
          },
          fieldGroup: getVideo(content).fieldGroup,
        },
      ];
      break;

    case 'text':
      componentConfig = [
        {
          props: {
            label: 'BUILDER.FACTORY.TEXT_TAB_LABEL',
          },
          fieldGroup: [
            content.title ? getTitle(content.title) : {},
            {
              key: 'body',
              type: 'rich-text',
              className: 'w-full',
              defaultValue: content.body,
              props: {
                label: 'BUILDER.FACTORY.CONTENT',
                rows: 10,
              },
            },
            {
              key: 'actionsAlign',
              type: 'select',
              className: 'w-full',
              defaultValue: content.actionsAlign ?? 'center',
              props: {
                label: 'BUILDER.FACTORY.BTN_ALIGN',
                options: [
                  {
                    label: 'BUILDER.FACTORY.ALIGN_START',
                    value: 'start',
                  },
                  {
                    label: 'BUILDER.FACTORY.ALIGN_CENTER_TEXT',
                    value: 'center',
                  },
                  {
                    label: 'BUILDER.FACTORY.ALIGN_END',
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
            label: 'BUILDER.FACTORY.TITLE_TAB',
          },
          fieldGroup: [getText(content.text)],
        };
        componentConfig.push(textConfig);
      }
      const swiperConfig1v3: FormlyFieldConfig = {
        props: {
          label: 'BUILDER.FACTORY.SLIDESHOW_TAB',
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
            label: 'BUILDER.FACTORY.TITLE_TAB',
          },
          fieldGroup: [getTitle(content.title)],
        };
        componentConfig.push(titleConfig);
      }

      const swiperConfig2v1: FormlyFieldConfig = {
        props: {
          label: 'BUILDER.FACTORY.SLIDESHOW_TAB',
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
            label: 'BUILDER.FACTORY.TITLE_TAB',
          },
          fieldGroup: [getTitle(content.title)],
        };
        componentConfig.push(titleConfig);
      }

      const swiperConfig: FormlyFieldConfig = {
        props: {
          label: 'BUILDER.FACTORY.SLIDESHOW_TAB',
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
            label: 'BUILDER.FACTORY.WIDGET_TAB',
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

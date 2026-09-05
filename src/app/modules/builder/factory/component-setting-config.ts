import type { FormlyFieldConfig } from '@ngx-formly/core';
import { getChart } from './getChart';
import { getChartBox } from './getChartBox';
import { getGridLayoutConfig } from './getCommon';
import { getHero2v1 } from './getHero2v1';
import { getHero2v3 } from './getHero2v3';
import { getShowcase1v1 } from './getShowcase1v1';
import { getShowcase3v9 } from './getShowcase3v9';
import { getShowcase4v1 } from './getShowcase4v1';
import { getTab1v1 } from './getTab1v1';
import { getSwiper } from './getSwiper';
import { getText } from './getText';
import { getTitle } from './getTitle';
import { getVideo } from './getVideo';
import { getWidgetSetting } from './getWidgetSetting';

type ComponentSettingFactory = (content: any, path: string) => FormlyFieldConfig[];

const componentSettingFactories: Record<string, ComponentSettingFactory> = {
  ['layout-builder']: getLayoutBuilderSetting,
  chart: getChart,
  swiper: getSwiperSetting,
  video: getVideoSetting,
  text: getTextSetting,
  ['dynamic-form']: getDynamicFormSetting,
  ['carousel-1v3']: getCarouselTextSetting,
  ['carousel-2v1']: getCarouselTitleSetting,
  ['carousel-1v1']: getCarouselTitleSetting,
  ['carousel-1v2']: getCarouselTitleSetting,
  ['carousel-2v2']: getCarouselTitleSetting,
  ['hero-1v1']: getCarouselTitleSetting,
  ['showcase-1v1']: getShowcase1v1Setting,
  ['showcase-3v9']: getShowcase3v9Setting,
  ['chart-box']: getChartBoxSetting,
  ['hero-2v1']: getHero2v1Setting,
  ['hero-2v3']: getHero2v3Setting,
  ['showcase-4v1']: getShowcase4v1Setting,
  ['tab-1v1']: getTab1v1Setting,
};

export function getComponentSpecificSetting(content: any, path: string): FormlyFieldConfig[] {
  const factory = Object.prototype.hasOwnProperty.call(componentSettingFactories, content.type)
    ? componentSettingFactories[content.type]
    : getDefaultSetting;
  return factory(content, path);
}

function getLayoutBuilderSetting(content: any): FormlyFieldConfig[] {
  return [
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
}

function getSwiperSetting(content: any): FormlyFieldConfig[] {
  return [
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
}

function getVideoSetting(content: any): FormlyFieldConfig[] {
  return [
    {
      props: {
        label: 'BUILDER.FACTORY.VIDEO_TAB_LABEL',
      },
      fieldGroup: getVideo(content).fieldGroup,
    },
  ];
}

function getTextSetting(content: any): FormlyFieldConfig[] {
  return [
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
}

/**
 * Webform-generated forms: the fields themselves are baked into the page JSON by
 * the picker, so only the submit button and the wrapper classes are editable here.
 * The sync button re-fetches the CMS element tree and replaces those fields.
 */
function getDynamicFormSetting(content: any, path: string): FormlyFieldConfig[] {
  return [
    {
      props: {
        label: 'BUILDER.FACTORY.FORM_TAB',
      },
      fieldGroupClassName: 'grid grid-cols-12 gap-3',
      fieldGroup: [
        {
          key: 'form',
          className: 'col-span-12',
          fieldGroup: [
            {
              key: 'id',
              type: 'input',
              className: 'w-full',
              defaultValue: content?.form?.id ?? '',
              props: {
                label: 'BUILDER.FACTORY.WEBFORM_ID',
              },
            },
          ],
        },
        {
          type: 'sync-webform',
          className: 'col-span-12',
          props: { path },
        },
        {
          key: 'action',
          className: 'col-span-12',
          fieldGroup: [
            {
              key: 'submit',
              fieldGroupClassName: 'grid grid-cols-12 gap-3',
              fieldGroup: [
                {
                  key: 'label',
                  type: 'input',
                  className: 'col-span-12',
                  defaultValue: content?.action?.submit?.label ?? '',
                  props: {
                    label: 'BUILDER.FACTORY.SUBMIT_LABEL',
                  },
                },
                {
                  key: 'mode',
                  type: 'select',
                  className: 'col-span-6',
                  defaultValue: content?.action?.submit?.mode ?? 'flat',
                  props: {
                    label: 'BUILDER.FACTORY.BTN_TYPE',
                    options: [
                      { label: 'BUILDER.FACTORY.MAT_BASIC', value: 'basic' },
                      { label: 'BUILDER.FACTORY.MAT_RAISED', value: 'raised' },
                      { label: 'BUILDER.FACTORY.MAT_STROKED', value: 'stroked' },
                      { label: 'BUILDER.FACTORY.MAT_FLAT', value: 'flat' },
                      { label: 'BUILDER.FACTORY.MAT_ICON', value: 'icon' },
                      { label: 'BUILDER.FACTORY.FAB', value: 'fab' },
                      { label: 'BUILDER.FACTORY.MINI_FAB', value: 'mini-fab' },
                    ],
                  },
                },
                {
                  key: 'color',
                  type: 'select',
                  className: 'col-span-6',
                  defaultValue: content?.action?.submit?.color ?? 'primary',
                  props: {
                    label: 'BUILDER.FACTORY.COLOR',
                    options: [
                      { label: 'BUILDER.FACTORY.MAT_BASIC', value: null },
                      { label: 'BUILDER.FACTORY.PRIMARY', value: 'primary' },
                      { label: 'BUILDER.FACTORY.ACCENT', value: 'accent' },
                      { label: 'BUILDER.FACTORY.WARN', value: 'warn' },
                    ],
                  },
                },
              ],
            },
            {
              key: 'classes',
              type: 'input',
              className: 'w-full',
              defaultValue: content?.action?.classes ?? '',
              props: {
                label: 'BUILDER.FACTORY.ACTION_CLASSES',
              },
            },
          ],
        },
        {
          key: 'formClasses',
          type: 'input',
          className: 'col-span-12',
          defaultValue: content?.formClasses ?? '',
          props: {
            label: 'BUILDER.FACTORY.FORM_CLASSES',
          },
        },
        {
          key: 'classes',
          type: 'input',
          className: 'col-span-12',
          defaultValue: content?.classes ?? '',
          props: {
            label: 'BUILDER.FACTORY.WIDGET_CLASS',
          },
        },
      ],
    },
  ];
}

function getCarouselTextSetting(content: any): FormlyFieldConfig[] {
  const componentConfig: FormlyFieldConfig[] = [];
  if (content.text) {
    componentConfig.push({
      props: {
        label: 'BUILDER.FACTORY.TITLE_TAB',
      },
      fieldGroup: [getText(content.text)],
    });
  }
  componentConfig.push(getCarouselSwiperSetting(content.swiper));
  return componentConfig;
}

function getCarouselTitleSetting(content: any): FormlyFieldConfig[] {
  const componentConfig: FormlyFieldConfig[] = [];
  if (content.title) {
    componentConfig.push({
      props: {
        label: 'BUILDER.FACTORY.TITLE_TAB',
      },
      fieldGroup: [getTitle(content.title)],
    });
  }
  componentConfig.push(getCarouselSwiperSetting(content.swiper));
  return componentConfig;
}

function getCarouselSwiperSetting(swiper: any): FormlyFieldConfig {
  return {
    props: {
      label: 'BUILDER.FACTORY.SLIDESHOW_TAB',
    },
    fieldGroup: [
      {
        ...getSwiper(swiper),
        key: 'swiper',
      },
    ],
  };
}

function getShowcase1v1Setting(content: any): FormlyFieldConfig[] {
  return getShowcase1v1(content).fieldGroup ?? [];
}

function getShowcase3v9Setting(content: any): FormlyFieldConfig[] {
  return getShowcase3v9(content).fieldGroup ?? [];
}

function getChartBoxSetting(content: any): FormlyFieldConfig[] {
  return getChartBox(content).fieldGroup ?? [];
}

function getHero2v1Setting(content: any): FormlyFieldConfig[] {
  return getHero2v1(content).fieldGroup ?? [];
}

function getHero2v3Setting(content: any): FormlyFieldConfig[] {
  return getHero2v3(content).fieldGroup ?? [];
}

function getShowcase4v1Setting(content: any): FormlyFieldConfig[] {
  return getShowcase4v1(content).fieldGroup ?? [];
}

function getTab1v1Setting(content: any): FormlyFieldConfig[] {
  return getTab1v1(content).fieldGroup ?? [];
}

function getDefaultSetting(content: any): FormlyFieldConfig[] {
  return [
    {
      props: {
        label: 'BUILDER.FACTORY.WIDGET_TAB',
      },
      fieldGroup: getWidgetSetting(content).fieldGroup,
    },
  ];
}

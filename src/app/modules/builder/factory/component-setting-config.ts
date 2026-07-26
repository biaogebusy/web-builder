import type { FormlyFieldConfig } from '@ngx-formly/core';
import { getGridLayoutConfig } from './getCommon';
import { getSwiper } from './getSwiper';
import { getText } from './getText';
import { getTitle } from './getTitle';
import { getVideo } from './getVideo';
import { getWidgetSetting } from './getWidgetSetting';

type ComponentSettingFactory = (content: any) => FormlyFieldConfig[];

const componentSettingFactories: Record<string, ComponentSettingFactory> = {
  ['layout-builder']: getLayoutBuilderSetting,
  swiper: getSwiperSetting,
  video: getVideoSetting,
  text: getTextSetting,
  ['carousel-1v3']: getCarouselTextSetting,
  ['carousel-2v1']: getCarouselTitleSetting,
  ['carousel-1v1']: getCarouselTitleSetting,
  ['carousel-1v2']: getCarouselTitleSetting,
  ['carousel-2v2']: getCarouselTitleSetting,
  ['hero-1v1']: getCarouselTitleSetting,
};

export function getComponentSpecificSetting(content: any): FormlyFieldConfig[] {
  const factory = Object.prototype.hasOwnProperty.call(componentSettingFactories, content.type)
    ? componentSettingFactories[content.type]
    : getDefaultSetting;
  return factory(content);
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

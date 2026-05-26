import { FormlyFieldConfig } from '@ngx-formly/core';
import { tap } from 'rxjs/operators';
export function getSwiper(widget: any): FormlyFieldConfig {
  const fields = {
    key: 'swiper',
    type: 'tabs',
    fieldGroup: [
      {
        key: 'params',
        props: {
          label: 'BUILDER.FACTORY.TAB_LABEL_PARAMS',
        },
        fieldGroup: [
          {
            type: 'select',
            key: 'direction',
            className: 'w-full',
            defaultValue: widget?.params?.direction ?? 'horizontal',
            props: {
              label: 'BUILDER.FACTORY.DIRECTION',
              options: [
                {
                  label: 'BUILDER.FACTORY.HORIZONTAL_DIR',
                  value: 'horizontal',
                },
                {
                  label: 'BUILDER.FACTORY.VERTICAL_DIR',
                  value: 'vertical',
                },
              ],
            },
          },
          {
            key: 'breakpoints',
            className: 'w-full',
            fieldGroup: [
              {
                key: '600',
                className: 'w-full',
                fieldGroupClassName: 'section-group',
                fieldGroup: [
                  {
                    key: 'slidesPerView',
                    type: 'slider',
                    className: 'w-full',
                    defaultValue: widget?.params?.breakpoints?.[600]?.slidesPerView,
                    props: {
                      min: 1,
                      max: 10,
                      step: 0.2,
                      label: 'BUILDER.FACTORY.MOBILE',
                      unit: 'BUILDER.FACTORY.EACH_UNIT',
                    },
                  },
                  {
                    key: 'spaceBetween',
                    type: 'slider',
                    className: 'w-full',
                    defaultValue: widget?.params?.breakpoints?.[600]?.spaceBetween || 0,
                    props: {
                      min: 1,
                      max: 100,
                      step: 1,
                      label: 'BUILDER.FACTORY.GAP_UNIT',
                      unit: 'px',
                    },
                  },
                ],
              },
              {
                key: '960',
                className: 'w-full',
                fieldGroupClassName: 'section-group',
                fieldGroup: [
                  {
                    key: 'slidesPerView',
                    type: 'slider',
                    className: 'w-full',
                    defaultValue: widget?.params.breakpoints?.[960]?.slidesPerView ?? 1,
                    props: {
                      min: 1,
                      max: 10,
                      step: 0.2,
                      label: 'BUILDER.FACTORY.DESKTOP',
                      unit: 'BUILDER.FACTORY.EACH_UNIT',
                    },
                  },
                  {
                    key: 'spaceBetween',
                    type: 'slider',
                    className: 'w-full',
                    defaultValue: widget?.params?.breakpoints?.[960]?.spaceBetween || 0,
                    props: {
                      min: 1,
                      max: 100,
                      step: 1,
                      label: 'BUILDER.FACTORY.GAP_UNIT',
                      unit: 'px',
                    },
                    hideExpression: 'model.slidesPerView <= 1',
                  },
                ],
              },
            ],
          },
          {
            key: 'effect',
            type: 'select',
            className: 'w-full',
            defaultValue: widget?.params?.effect || 'slide',
            props: {
              label: 'BUILDER.FACTORY.EFFECTS',
              options: [
                {
                  label: 'BUILDER.FACTORY.EFFECT_DEFAULT',
                  value: 'slide',
                },
                {
                  label: 'BUILDER.FACTORY.FADE',
                  value: 'fade',
                },
                {
                  label: 'BUILDER.FACTORY.CUBE',
                  value: 'cube',
                },
                {
                  label: 'BUILDER.FACTORY.COVERFLOW',
                  value: 'coverflow',
                },
                {
                  label: 'BUILDER.FACTORY.FLIP',
                  value: 'flip',
                },
              ],
            },
          },
          {
            key: 'speed',
            type: 'slider',
            className: 'w-full',
            defaultValue: widget?.params.speed ?? 300,
            props: {
              min: 0,
              max: 10000,
              step: 100,
              label: 'BUILDER.FACTORY.TRANSITION',
              unit: 'ms',
            },
          },
        ],
        hooks: {
          onInit: (formGroup: any) => {
            const { form, model } = formGroup;
            return form.valueChanges.pipe(
              tap((value: any) => {
                model.breakpoints = value.params.breakpoints;
              })
            );
          },
        },
      },
      {
        key: 'params',
        props: {
          label: 'BUILDER.FACTORY.FEATURES_TAB',
        },
        fieldGroup: [
          {
            key: 'pagination',
            defaultValue: widget?.params.pagination,
            fieldGroupClassName: 'section-group',
            fieldGroup: [
              {
                key: 'paginationEnable',
                type: 'toggle',
                className: 'w-full',
                defaultValue: widget?.params.pagination ?? false,
                props: {
                  label: 'BUILDER.FACTORY.PAGE_INDICATOR',
                },
              },
              {
                key: 'type',
                type: 'select',
                className: 'w-2/5',
                props: {
                  label: 'BUILDER.FACTORY.PAGE_TYPE',
                  options: [
                    {
                      label: 'bullets',
                      value: 'bullets',
                    },
                    {
                      label: 'progressbar',
                      value: 'progressbar',
                    },
                    {
                      label: 'fraction',
                      value: 'fraction',
                    },
                  ],
                },
                hideExpression: '!model.paginationEnable',
              },
              {
                key: 'clickable',
                type: 'toggle',
                props: {
                  className: 'w-2/5',
                  label: 'BUILDER.FACTORY.PAGE_CLICKABLE',
                },
                expressionProperties: {
                  'props.disabled': 'model.type !== "bullets"',
                },
                hideExpression: '!model.paginationEnable',
              },
            ],
          },
          {
            key: 'navigation',
            type: 'toggle',
            className: 'w-full',
            defaultValue: widget?.params.navigation ?? false,
            props: {
              label: 'BUILDER.FACTORY.ARROWS',
            },
          },
          {
            key: 'centeredSlides',
            type: 'toggle',
            className: 'w-full',
            defaultValue: widget?.params.centeredSlides ?? false,
            props: {
              label: 'BUILDER.FACTORY.CENTERED',
            },
          },
          {
            key: 'loop',
            type: 'toggle',
            className: 'w-full',
            defaultValue: widget?.params.loop ?? false,
            props: {
              label: 'BUILDER.FACTORY.LOOP',
            },
          },
          {
            key: 'autoplay',
            type: 'toggle',
            className: 'w-full',
            defaultValue: widget?.params.autoplay ?? false,
            props: {
              label: 'BUILDER.FACTORY.AUTOPLAY',
            },
          },
          {
            key: 'mousewheel',
            type: 'toggle',
            className: 'w-full',
            defaultValue: widget?.params.mousewheel ?? false,
            props: {
              label: 'BUILDER.FACTORY.MOUSE_CTRL',
            },
          },
        ],
      },
    ],
  };

  return fields;
}

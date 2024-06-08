import { FormlyFieldConfig } from '@ngx-formly/core';
export function getSwiper(widget: any, options?: any[]): FormlyFieldConfig[] {
  const fields = [
    {
      key: 'swiper',
      type: 'tabs',
      fieldGroup: [
        {
          key: 'params',
          props: {
            label: '参数',
          },
          fieldGroup: [
            {
              type: 'select',
              key: 'direction',
              className: 'w-full',
              defaultValue: widget.params?.direction ?? 'horizontal',
              props: {
                label: '方向',
                options: [
                  {
                    label: '水平方向',
                    value: 'horizontal',
                  },
                  {
                    label: '垂直方向',
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
                      defaultValue:
                        widget.params?.breakpoints?.[600]?.slidesPerView,
                      props: {
                        min: 1,
                        max: 10,
                        step: 0.2,
                        label: '移动端',
                        unit: '个',
                      },
                    },
                    {
                      key: 'spaceBetween',
                      type: 'slider',
                      className: 'w-full',
                      defaultValue:
                        widget.params?.breakpoints?.[600]?.spaceBetween || 0,
                      props: {
                        min: 1,
                        max: 100,
                        step: 1,
                        label: '间隔',
                        unit: 'px',
                      },
                      hideExpression: 'model.slidesPerView <= 1',
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
                      defaultValue:
                        widget.params.breakpoints?.[960].slidesPerView,
                      props: {
                        min: 1,
                        max: 10,
                        step: 0.2,
                        label: '电脑端显示',
                        unit: '个',
                      },
                    },
                    {
                      key: 'spaceBetween',
                      type: 'slider',
                      className: 'w-full',
                      defaultValue:
                        widget.params?.breakpoints?.[960]?.spaceBetween || 0,
                      props: {
                        min: 1,
                        max: 100,
                        step: 1,
                        label: '间隔',
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
              defaultValue: widget.params?.effect || 'slide',
              props: {
                label: `特效`,
                options: [
                  {
                    label: '默认',
                    value: 'slide',
                  },
                  {
                    label: 'Fade',
                    value: 'fade',
                  },
                  {
                    label: 'Cube',
                    value: 'cube',
                  },
                  {
                    label: 'Coverflow',
                    value: 'coverflow',
                  },
                  {
                    label: 'Fip',
                    value: 'flip',
                  },
                ],
              },
            },
            {
              key: 'speed',
              type: 'slider',
              className: 'w-full',
              defaultValue: widget.params.speed ?? 300,
              props: {
                min: 0,
                max: 10000,
                step: 100,
                label: '转场',
                unit: 'ms',
              },
            },
          ],
        },
        {
          key: 'params',
          props: {
            label: '功能',
          },
          fieldGroup: [
            {
              key: 'pagination',
              defaultValue: widget.params.pagination,
              fieldGroupClassName: 'section-group',
              fieldGroup: [
                {
                  key: 'paginationEnable',
                  type: 'toggle',
                  className: 'w-full',
                  defaultValue: widget.params.pagination ?? false,
                  props: {
                    label: '页码',
                  },
                },
                {
                  key: 'type',
                  type: 'select',
                  className: 'w-2/5',
                  props: {
                    label: '类型',
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
                    label: '可点击',
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
              defaultValue: widget.params.navigation ?? false,
              props: {
                label: '左右箭头',
              },
            },
            {
              key: 'centeredSlides',
              type: 'toggle',
              className: 'w-full',
              defaultValue: widget.params.centeredSlides ?? false,
              props: {
                label: '居中',
              },
            },
            {
              key: 'loop',
              type: 'toggle',
              className: 'w-full',
              defaultValue: widget.params.loop ?? false,
              props: {
                label: '循环',
              },
            },
            {
              key: 'autoplay',
              type: 'toggle',
              className: 'w-full',
              defaultValue: widget.params.autoplay ?? false,
              props: {
                label: '自动播放',
              },
            },
            {
              key: 'mousewheel',
              type: 'toggle',
              className: 'w-full',
              defaultValue: widget.params.mousewheel ?? false,
              props: {
                label: '鼠标控制',
              },
            },
          ],
        },
      ],
    },
  ];

  if (options) {
    fields[0].fieldGroup.push(...options);
  }

  return fields;
}

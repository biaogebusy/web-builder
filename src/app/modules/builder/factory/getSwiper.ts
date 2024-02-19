import { FormlyFieldConfig } from '@ngx-formly/core';

export function getSwiper(widget: any): FormlyFieldConfig[] {
  return [
    {
      key: 'swiper',
      type: 'tabs',
      fieldGroup: [
        {
          key: 'params',
          templateOptions: {
            label: '参数',
          },
          fieldGroup: [
            {
              type: 'select',
              key: 'direction',
              className: 'width-100',
              defaultValue: widget.params?.direction || 'horizontal',
              templateOptions: {
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
              className: 'width-100',
              fieldGroup: [
                {
                  key: '600',
                  className: 'width-100',
                  fieldGroupClassName: 'section-group',
                  fieldGroup: [
                    {
                      key: 'slidesPerView',
                      type: 'slider',
                      className: 'width-40',
                      defaultValue:
                        widget.params?.breakpoints[600]?.slidesPerView,
                      templateOptions: {
                        min: 1,
                        max: 10,
                        step: 0.2,
                        thumbLabel: true,
                      },
                      expressionProperties: {
                        'templateOptions.label':
                          '"移动端显示: " + model.slidesPerView',
                      },
                    },
                    {
                      key: 'spaceBetween',
                      type: 'slider',
                      className: 'width-40',
                      defaultValue:
                        widget.params?.breakpoints[600]?.spaceBetween || 0,
                      templateOptions: {
                        min: 1,
                        max: 100,
                        step: 1,
                        thumbLabel: true,
                      },
                      hideExpression: 'model.slidesPerView <= 1',
                      expressionProperties: {
                        'templateOptions.label':
                          '"间隔: " + model.spaceBetween + "px"',
                      },
                    },
                  ],
                },
                {
                  key: '960',
                  className: 'width-100',
                  fieldGroupClassName: 'section-group',
                  fieldGroup: [
                    {
                      key: 'slidesPerView',
                      type: 'slider',
                      className: 'width-40',
                      defaultValue:
                        widget.params.breakpoints[960].slidesPerView,
                      templateOptions: {
                        min: 1,
                        max: 10,
                        step: 0.2,
                        thumbLabel: true,
                      },
                      expressionProperties: {
                        'templateOptions.label':
                          '"电脑端显示: " + model.slidesPerView',
                      },
                    },
                    {
                      key: 'spaceBetween',
                      type: 'slider',
                      className: 'width-40',
                      defaultValue:
                        widget.params?.breakpoints[960]?.spaceBetween || 0,
                      templateOptions: {
                        min: 1,
                        max: 100,
                        step: 1,
                        thumbLabel: true,
                      },
                      hideExpression: 'model.slidesPerView <= 1',
                      expressionProperties: {
                        'templateOptions.label':
                          '"间隔: " + model.spaceBetween + "px"',
                      },
                    },
                  ],
                },
              ],
            },
            {
              key: 'effect',
              type: 'select',
              className: 'width-100',
              defaultValue: widget.params?.effect || 'slide',
              templateOptions: {
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
              className: 'width-100',
              defaultValue: widget.params.speed || 300,
              templateOptions: {
                description: '',
                min: 0,
                max: 10000,
                step: 100,
                thumbLabel: true,
              },
              expressionProperties: {
                'templateOptions.label': '"转场时长: " + model.speed + " 毫秒"',
              },
            },
          ],
        },
        {
          key: 'params',
          templateOptions: {
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
                  className: 'width-100',
                  defaultValue: widget.params.pagination || false,
                  templateOptions: {
                    label: '页码',
                  },
                },
                {
                  key: 'type',
                  type: 'select',
                  className: 'width-40',
                  templateOptions: {
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
                  templateOptions: {
                    className: 'width-40',
                    label: '可点击',
                  },
                  expressionProperties: {
                    'templateOptions.disabled': 'model.type !== "bullets"',
                  },
                  hideExpression: '!model.paginationEnable',
                },
              ],
            },
            {
              key: 'navigation',
              type: 'toggle',
              className: 'width-100',
              defaultValue: widget.params.navigation || false,
              templateOptions: {
                label: '左右箭头',
              },
            },
            {
              key: 'centeredSlides',
              type: 'toggle',
              className: 'width-100',
              defaultValue: widget.params.centeredSlides || false,
              templateOptions: {
                label: '居中',
              },
            },
            {
              key: 'loop',
              type: 'toggle',
              className: 'width-100',
              defaultValue: widget.params.loop || false,
              templateOptions: {
                label: '循环',
              },
            },
            {
              key: 'autoplay',
              type: 'toggle',
              className: 'width-100',
              defaultValue: widget.params.autoplay || false,
              templateOptions: {
                label: '自动播放',
              },
            },
            {
              key: 'mousewheel',
              type: 'toggle',
              className: 'width-100',
              defaultValue: widget.params.mousewheel || false,
              templateOptions: {
                label: '鼠标控制',
              },
            },
          ],
        },
      ],
    },
  ];
}

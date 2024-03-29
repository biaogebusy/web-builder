import { FormlyFieldConfig } from '@ngx-formly/core';
import { getLayoutAlign } from './getBlockSetting';
import { getSwiper } from './getSwiper';
import { getTitleField } from './getTitleField';
import { getText } from './getText';
import { getAnimate } from './getAnimate';

export function getComponentSetting(content: any): FormlyFieldConfig[] {
  const fields: FormlyFieldConfig[] = [
    {
      type: 'tabs',
      key: 'component',
      fieldGroup: [
        {
          templateOptions: {
            label: '通用',
          },
          fieldGroup: [
            {
              type: 'select',
              key: 'fullWidth',
              className: 'width-100',
              defaultValue: content.fullWidth,
              templateOptions: {
                label: '组件全屏宽',
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
              defaultValue: content.spacer || 'md',
              className: 'width-100',
              templateOptions: {
                label: '上下间距',
                options: [
                  {
                    label: '无',
                    value: 'none',
                  },
                  {
                    label: '超小',
                    value: 'xs',
                  },
                  {
                    label: '小',
                    value: 'sm',
                  },
                  {
                    label: '正常',
                    value: 'md',
                  },
                  {
                    label: '大',
                    value: 'lg',
                  },
                  {
                    label: '超大',
                    value: 'xl',
                  },
                ],
              },
            },
            {
              type: 'select',
              key: 'bgClasses',
              className: 'width-100',
              defaultValue: content?.bg?.classes || 'bg- bg-fill-width',
              templateOptions: {
                label: '预设背景色',
                options: [
                  {
                    label: '无',
                    value: 'bg- bg-fill-width',
                  },
                  {
                    label: '品牌色',
                    value: 'bg-primary bg-fill-width',
                  },
                  {
                    label: '灰色',
                    value: 'bg-shadow bg-fill-width',
                  },
                  {
                    label: '蓝色',
                    value: 'bg-blue bg-fill-width',
                  },
                  {
                    label: '绿色',
                    value: 'bg-green bg-fill-width',
                  },
                  {
                    label: '黄色',
                    value: 'bg-yellow bg-fill-width',
                  },
                  {
                    label: '红色',
                    value: 'bg-red bg-fill-width',
                  },
                  {
                    label: '警告色',
                    value: 'bg-warn bg-fill-width',
                  },
                  {
                    label: '粉色',
                    value: 'bg-pink bg-fill-width',
                  },
                  {
                    label: '橙色',
                    value: 'bg-orange bg-fill-width',
                  },
                  {
                    label: '紫色',
                    value: 'bg-purple bg-fill-width',
                  },
                ],
              },
            },
            {
              type: 'select',
              key: 'overlay',
              className: 'width-100',
              defaultValue: content?.bg?.overlay || '',
              templateOptions: {
                label: '蒙版不透明度',
                options: [
                  {
                    label: '无',
                    value: ' ',
                  },
                  {
                    label: '0.8',
                    value: 'overlay overlay-80',
                  },
                  {
                    label: '0.6',
                    value: 'overlay overlay-60',
                  },
                  {
                    label: '0.4',
                    value: 'overlay overlay-40',
                  },
                  {
                    label: '0.2',
                    value: 'overlay overlay-20',
                  },
                ],
              },
            },
            {
              type: 'input',
              key: 'classes',
              className: 'width-100',
              defaultValue: content.classes || '',
              templateOptions: {
                label: 'Classes',
                description: '添加class类',
              },
            },
            {
              type: 'input',
              key: 'id',
              className: 'width-100',
              defaultValue: content.id || '',
              templateOptions: {
                label: 'ID',
                description: '一般用于页面锚点定位',
              },
            },
            {
              key: 'bg',
              className: 'm-top-sm',
              fieldGroup: [
                {
                  key: 'img',
                  fieldGroup: [
                    {
                      key: 'src',
                      type: 'img-picker',
                      defaultValue: content?.bg?.img?.src || '',
                      templateOptions: {
                        label: '更新背景图',
                      },
                      hooks: {
                        onInit: (formGroup: any) => {
                          const { form } = formGroup;
                          form.valueChanges.subscribe((value: any) => {
                            const srcArr = value.src.split(/\/|(?=\.\w+$)/);
                            form
                              .get('alt')
                              .patchValue(srcArr[srcArr.length - 2], {
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
                      defaultValue: content?.bg?.img?.classes || 'object-fit',
                      templateOptions: {
                        label: '背景填充方式',
                        options: [
                          {
                            label: '按比例铺满 cover',
                            value: 'object-cover',
                          },
                          {
                            label: '按比例完整显示 contain',
                            value: 'object-contain',
                          },
                          {
                            label: '拉伸铺满 fill',
                            value: 'object-fill',
                          },
                        ],
                      },
                      hideExpression: '!model.src',
                    },
                    {
                      key: 'alt',
                      type: 'input',
                      defaultValue: content?.bg?.img?.alt || '',
                      templateOptions: {
                        label: 'alt',
                      },
                    },
                  ],
                },
                {
                  key: 'classes',
                  type: 'input',
                  defaultValue: content?.bg?.classes || 'bg-fill-width',
                  templateOptions: {
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
        templateOptions: {
          label: '布局',
        },
        fieldGroup: [
          {
            type: 'select',
            key: 'direction',
            className: 'width-100',
            defaultValue: content.direction || 'row wrap',
            templateOptions: {
              label: '组件布局方向',
              options: [
                {
                  label: 'Row Wrap',
                  value: 'row wrap',
                },
                {
                  label: 'Row',
                  value: 'row',
                },
                {
                  label: 'Column',
                  value: 'column',
                },
              ],
            },
          },
          {
            type: 'select',
            key: 'horizontal',
            className: 'width-100',
            defaultValue: getLayoutAlign(0, content.layoutAlign),
            templateOptions: {
              label: '水平对齐',
              options: [
                {
                  label: 'None',
                  value: 'flex-start',
                },
                {
                  label: 'start',
                  value: 'flex-start',
                },
                {
                  label: 'center',
                  value: 'center',
                },
                {
                  label: 'end',
                  value: 'flex-end',
                },
                {
                  label: 'space-around',
                  value: 'space-around',
                },
                {
                  label: 'space-between',
                  value: 'space-between',
                },
                {
                  label: 'space-evenly',
                  value: 'space-evenly',
                },
              ],
            },
          },
          {
            type: 'select',
            key: 'vertical',
            className: 'width-100',
            defaultValue: getLayoutAlign(1, content.layoutAlign),
            templateOptions: {
              label: '垂直对齐',
              options: [
                {
                  label: 'None',
                  value: 'stretch',
                },
                {
                  label: 'start',
                  value: 'flex-start',
                },
                {
                  label: 'center',
                  value: 'center',
                },
                {
                  label: 'end',
                  value: 'flex-end',
                },
                {
                  label: 'stretch',
                  value: 'stretch',
                },
              ],
            },
          },
          {
            type: 'input',
            key: 'layoutAlign',
            className: 'width-100 display-none',
            defaultValue: content.layoutAlign || 'center center',
            templateOptions: {
              label: '布局对齐',
            },
            hooks: {
              onInit: (formGroup: any) => {
                const { form, model } = formGroup;
                form.valueChanges.subscribe((value: any) => {
                  model.layoutAlign = `${value.horizontal.replace(
                    'flex-',
                    ''
                  )} ${value.vertical.replace('flex-', '')}`;
                });
              },
            },
          },
          {
            key: 'gap',
            fieldGroup: [
              {
                key: 'xs',
                type: 'slider',
                defaultValue: content.gap?.xs || 0,
                templateOptions: {
                  min: 0,
                  max: 80,
                  step: 2,
                  label: '移动端间距',
                  unit: 'px',
                },
              },
              {
                key: 'sm',
                type: 'slider',
                defaultValue: content.gap?.sm || 0,
                templateOptions: {
                  min: 0,
                  max: 80,
                  step: 2,
                  label: '平板端间距',
                  unit: 'px',
                },
              },
              {
                key: 'md',
                type: 'slider',
                defaultValue: content.gap?.md || 0,
                templateOptions: {
                  min: 0,
                  max: 80,
                  step: 2,
                  label: '桌面端间距',
                  unit: 'px',
                },
              },
              {
                key: 'lg',
                type: 'slider',
                defaultValue: content.gap?.lg || 0,
                templateOptions: {
                  min: 0,
                  max: 80,
                  step: 2,
                  label: '超大桌面间距',
                  unit: 'px',
                },
              },
            ],
          },
        ],
      },
    ];
    fields[0].fieldGroup?.push(...flexConfig);
  }

  if (content.type === 'swiper') {
    fields[0].fieldGroup?.push({
      templateOptions: {
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

  if (
    content.type === 'carousel-1v1' ||
    content.type === 'carousel-1v2' ||
    content.type === 'carousel-2v2' ||
    content.type === 'hero-1v1'
  ) {
    if (content.title) {
      const titleConfig: FormlyFieldConfig = {
        templateOptions: {
          label: '标题',
        },
        fieldGroup: [...getTitleField(content.title)],
      };
      fields[0].fieldGroup?.push(titleConfig);
    }

    const swiperConfig: FormlyFieldConfig = {
      templateOptions: {
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
        templateOptions: {
          label: '标题',
        },
        fieldGroup: [...getText(content.text)],
      };
      fields[0].fieldGroup?.push(textConfig);
    }
    const swiperConfig: FormlyFieldConfig = {
      templateOptions: {
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
        templateOptions: {
          label: '标题',
        },
        fieldGroup: [...getTitleField(content.title)],
      };
      fields[0].fieldGroup?.push(titleConfig);
    }

    const swiperConfig: FormlyFieldConfig = {
      templateOptions: {
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

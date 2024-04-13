import { FormlyFieldConfig } from '@ngx-formly/core';
import { getLayoutAlign } from './getLayoutSetting';
import { getSwiper } from './getSwiper';
import { getTitleField } from './getTitleField';
import { getText } from './getText';
import { getAnimate } from './getAnimate';
import {
  getBgClasses,
  getDirectionOption,
  getGapsGroup,
  getHorizontalOption,
  getOverlay,
  getVerticalOption,
} from './getCommon';

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
          fieldGroupClassName: 'display-flex flex-wrap',
          fieldGroup: [
            {
              type: 'select',
              key: 'fullWidth',
              className: 'width-50 m-right-sm',
              defaultValue: content.fullWidth,
              templateOptions: {
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
              defaultValue: content.spacer || 'md',
              className: 'width-40',
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
              className: 'width-50 m-right-sm',
              defaultValue: content?.bg?.classes || 'bg- bg-fill-width',
              templateOptions: {
                label: '背景色',
                options: getBgClasses,
              },
            },
            {
              type: 'select',
              key: 'overlay',
              className: 'width-40',
              defaultValue: content?.bg?.overlay || '',
              templateOptions: {
                label: '蒙版',
                options: getOverlay,
              },
            },
            {
              type: 'input',
              key: 'classes',
              className: 'width-50 m-right-sm',
              defaultValue: content.classes || '',
              templateOptions: {
                label: 'Classes',
                description: '添加class类',
              },
            },
            {
              type: 'input',
              key: 'id',
              className: 'width-40',
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
                        updateLabel: '更新背景图',
                        addLabel: '设置背景图',
                        deleteLabel: '删除',
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
              options: getDirectionOption,
            },
          },
          {
            type: 'select',
            key: 'horizontal',
            className: 'width-100',
            defaultValue: getLayoutAlign(0, content.layoutAlign),
            templateOptions: {
              label: '水平对齐',
              options: getHorizontalOption,
            },
          },
          {
            type: 'select',
            key: 'vertical',
            className: 'width-100',
            defaultValue: getLayoutAlign(1, content.layoutAlign),
            templateOptions: {
              label: '垂直对齐',
              options: getVerticalOption,
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
            fieldGroup: getGapsGroup(content),
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

import { FormlyFieldConfig } from '@ngx-formly/core';

export function getAnimate(content: any): FormlyFieldConfig {
  const actionsOptions = [
    {
      label: '无',
      value: 'none',
    },
    {
      label: '播放',
      value: 'play',
    },
    {
      label: '暂停',
      value: 'pause',
    },
    {
      label: '继续播放',
      value: 'resume',
    },
    {
      label: '重新开始',
      value: 'restart',
    },
    {
      label: '反向播放',
      value: 'reverse',
    },
    {
      label: '重置',
      value: 'reset',
    },
    {
      label: '立即完成',
      value: 'complete',
    },
  ];
  return {
    props: {
      label: '动画',
    },
    fieldGroup: [
      {
        key: 'animate',
        fieldGroupClassName: 'w-full',
        fieldGroup: [
          {
            key: 'aos',
            fieldGroupClassName: 'w-full',
            fieldGroup: [
              {
                key: 'enable',
                type: 'toggle',
                className: 'w-full',
                defaultValue: content?.animate?.aos?.enable ?? false,
                props: {
                  label: 'AOS 基础动画',
                },
              },
              {
                key: 'animation',
                type: 'select',
                className: 'w-full',
                defaultValue: content?.animate?.aos?.animation || 'fade-up',
                props: {
                  label: '动画效果',
                  options: [
                    { label: 'fade', value: 'fade' },
                    { label: 'fade-up', value: 'fade-up' },
                    { label: 'fade-down', value: 'fade-down' },
                    { label: 'fade-left', value: 'fade-left' },
                    { label: 'fade-right', value: 'fade-right' },
                    { label: 'fade-up-right', value: 'fade-up-right' },
                    { label: 'fade-up-left', value: 'fade-up-left' },
                    { label: 'fade-down-right', value: 'fade-down-right' },
                    { label: 'fade-down-left', value: 'fade-down-left' },
                    { label: 'flip-up', value: 'flip-up' },
                    { label: 'flip-down', value: 'flip-down' },
                    { label: 'flip-left', value: 'flip-left' },
                    { label: 'flip-right', value: 'flip-right' },
                    { label: 'slide-up', value: 'slide-up' },
                    { label: 'slide-down', value: 'slide-down' },
                    { label: 'slide-left', value: 'slide-left' },
                    { label: 'slide-right', value: 'slide-right' },
                    { label: 'zoom-in', value: 'zoom-in' },
                    { label: 'zoom-in-up', value: 'zoom-in-up' },
                    { label: 'zoom-in-down', value: 'zoom-in-down' },
                    { label: 'zoom-in-left', value: 'zoom-in-left' },
                    { label: 'zoom-in-right', value: 'zoom-in-right' },
                    { label: 'zoom-out', value: 'zoom-out' },
                    { label: 'zoom-out-up', value: 'zoom-out-up' },
                    { label: 'zoom-out-down', value: 'zoom-out-down' },
                    { label: 'zoom-out-left', value: 'zoom-out-left' },
                    { label: 'zoom-out-right', value: 'zoom-out-right' },
                  ],
                },
                expressions: {
                  hide: (field: FormlyFieldConfig) => {
                    return !field.parent?.model?.enable;
                  },
                },
              },
              {
                key: 'behaviour',
                fieldGroup: [
                  {
                    key: 'offset',
                    type: 'input',
                    className: 'w-full',
                    defaultValue: content?.animate?.aos?.offset ?? 120,
                    props: {
                      type: 'number',
                      label: '偏移量',
                    },
                  },
                  {
                    key: 'duration',
                    type: 'input',
                    className: 'w-full',
                    defaultValue: content?.animate?.aos?.duration ?? 400,
                    props: {
                      type: 'number',
                      label: '动画时长',
                    },
                  },
                  {
                    key: 'delay',
                    type: 'input',
                    className: 'w-full',
                    defaultValue: content?.animate?.aos?.delay ?? 0,
                    props: {
                      type: 'number',
                      label: '延迟时间',
                    },
                  },
                  {
                    key: 'easing',
                    type: 'select',
                    className: 'w-full',
                    defaultValue: content?.animate?.aos?.easing ?? 'ease',
                    props: {
                      type: 'text',
                      label: '缓动效果',
                      options: [
                        { value: 'ease', label: 'ease' },
                        { value: 'linear', label: 'linear' },
                        { value: 'ease-in', label: 'ease-in' },
                        { value: 'ease-out', label: 'ease-out' },
                        { value: 'ease-in-out', label: 'ease-in-out' },
                        { value: 'ease-in-back', label: 'ease-in-back' },
                        { value: 'ease-out-back', label: 'ease-out-back' },
                        { value: 'ease-in-out-back', label: 'ease-in-out-back' },
                        { value: 'ease-in-sine', label: 'ease-in-sine' },
                        { value: 'ease-out-sine', label: 'ease-out-sine' },
                        { value: 'ease-in-out-sine', label: 'ease-in-out-sine' },
                        { value: 'ease-in-quad', label: 'ease-in-quad' },
                        { value: 'ease-out-quad', label: 'ease-out-quad' },
                        { value: 'ease-in-out-quad', label: 'ease-in-out-quad' },
                        { value: 'ease-in-cubic', label: 'ease-in-cubic' },
                        { value: 'ease-out-cubic', label: 'ease-out-cubic' },
                        { value: 'ease-in-out-cubic', label: 'ease-in-out-cubic' },
                        { value: 'ease-in-quart', label: 'ease-in-quart' },
                        { value: 'ease-out-quart', label: 'ease-out-quart' },
                        { value: 'ease-in-out-quart', label: 'ease-in-out-quart' },
                      ],
                    },
                  },
                ],
                expressions: {
                  hide: (field: FormlyFieldConfig) => {
                    return !field.parent?.model?.enable;
                  },
                },
              },
            ],
          },
          {
            key: 'gsap',
            fieldGroup: [
              {
                key: 'enable',
                type: 'toggle',
                className: 'w-full',
                defaultValue: content?.animate?.gsap?.enable,
                props: {
                  label: 'GSAP 高级动画',
                },
              },
              {
                key: 'from',
                expressions: {
                  hide: (field: FormlyFieldConfig) => {
                    return !field.parent?.model?.enable;
                  },
                },
                fieldGroup: [
                  {
                    fieldGroupClassName: 'grid grid-cols-12 gap-3',
                    fieldGroup: [
                      {
                        key: 'x',
                        type: 'input',
                        className: 'col-span-6',
                        defaultValue: Number(content?.animate?.gsap?.from?.x) ?? 0,
                        props: {
                          label: '水平位移',
                          min: -500,
                          max: 500,
                          step: 10,
                          type: 'number',
                        },
                      },
                      {
                        key: 'y',
                        type: 'input',
                        className: 'col-span-6',
                        defaultValue: Number(content?.animate?.gsap?.from?.y) ?? 0,
                        props: {
                          label: '垂直位移',
                          min: -500,
                          max: 500,
                          step: 10,
                          type: 'number',
                        },
                      },
                    ],
                  },
                  {
                    fieldGroupClassName: 'grid grid-cols-12 gap-3',
                    fieldGroup: [
                      {
                        key: 'rotationX',
                        type: 'input',
                        className: 'col-span-6',
                        defaultValue: Number(content?.animate?.gsap?.from?.rotationX) ?? 0,
                        props: {
                          label: '水平旋转',
                          min: -360,
                          max: 360,
                          step: 1,
                          type: 'number',
                        },
                      },
                      {
                        key: 'rotationY',
                        type: 'input',
                        className: 'col-span-6',
                        defaultValue: Number(content?.animate?.gsap?.from?.rotationY) ?? 0,
                        props: {
                          label: '垂直旋转',
                          min: -360,
                          max: 360,
                          step: 1,
                          type: 'number',
                        },
                      },
                    ],
                  },
                  {
                    fieldGroupClassName: 'grid grid-cols-12 gap-3',
                    fieldGroup: [
                      {
                        key: 'scaleX',
                        type: 'input',
                        className: 'col-span-6',
                        defaultValue: Number(content?.animate?.gsap?.from?.scaleX) ?? 1,
                        props: {
                          label: '水平缩放',
                          min: 0,
                          max: 2,
                          step: 0.1,
                          type: 'number',
                        },
                      },
                      {
                        key: 'scaleY',
                        type: 'input',
                        className: 'col-span-6',
                        defaultValue: Number(content?.animate?.gsap?.from?.scaleY) ?? 1,
                        props: {
                          label: '垂直缩放',
                          min: 0,
                          max: 2,
                          step: 0.1,
                          type: 'number',
                        },
                      },
                    ],
                  },
                  {
                    fieldGroupClassName: 'grid grid-cols-12 gap-3',
                    fieldGroup: [
                      {
                        key: 'skewX',
                        type: 'input',
                        className: 'col-span-6',
                        defaultValue: Number(content?.animate?.gsap?.from?.skewX) ?? 0,
                        props: {
                          label: 'skewX',
                          min: -180,
                          max: 180,
                          step: 1,
                          type: 'number',
                        },
                      },
                      {
                        key: 'skewY',
                        type: 'input',
                        className: 'col-span-6',
                        defaultValue: Number(content?.animate?.gsap?.from?.skewY) ?? 0,
                        props: {
                          label: 'skewY',
                          min: -180,
                          max: 180,
                          step: 1,
                          type: 'number',
                        },
                      },
                    ],
                  },
                  {
                    fieldGroupClassName: 'grid grid-cols-12 gap-3',
                    fieldGroup: [
                      {
                        key: 'opacity',
                        type: 'input',
                        className: 'col-span-6',
                        defaultValue: Number(content?.animate?.gsap?.from?.opacity) ?? 1,
                        props: {
                          label: '不透明度',
                          min: 0,
                          max: 1,
                          step: 0.1,
                          type: 'number',
                        },
                      },
                      {
                        key: 'delay',
                        type: 'input',
                        className: 'col-span-6',
                        defaultValue: Number(content?.animate?.gsap?.from?.delay) ?? 0,
                        props: {
                          label: '延迟',
                          min: 0,
                          max: 6,
                          step: 0.1,
                          type: 'number',
                        },
                      },
                      {
                        key: 'duration',
                        type: 'input',
                        className: 'col-span-6',
                        defaultValue: Number(content?.animate?.gsap?.from?.duration) ?? 1,
                        props: {
                          label: '时长(秒)',
                          min: 0.1,
                          max: 6,
                          step: 0.1,
                          type: 'number',
                        },
                      },
                      {
                        key: 'ease',
                        defaultValue: content?.animate?.gsap?.from?.ease ?? 'none',
                        type: 'select',
                        className: 'col-span-6',
                        props: {
                          label: '缓动曲线',
                          options: [
                            { label: 'none', value: 'none' },
                            { label: 'power1.out', value: 'power1.out' },
                            { label: 'power2.out', value: 'power2.out' },
                            { label: 'power3.out', value: 'power3.out' },
                            { label: 'power4.out', value: 'power4.out' },
                            { label: 'back.out(1.7)', value: 'back.out(1.7)' },
                            { label: 'bounce.out', value: 'bounce.out' },
                            { label: 'circ.out', value: 'circ.out' },
                            {
                              label: 'elastic.out(1,0.3)',
                              value: 'elastic.out(1,0.3)',
                            },
                            { label: 'expo.out', value: 'expo.out' },
                            { label: 'sine.out', value: 'sine.out' },
                            { label: 'steps(12)', value: 'steps(12)' },
                            {
                              label: 'slow(0.7,0.7,false)',
                              value: 'slow(0.7,0.7,false)',
                            },
                          ],
                        },
                      },
                    ],
                  },
                ],
              },
              {
                key: 'trigger',
                expressions: {
                  hide: (field: FormlyFieldConfig) => {
                    return !field.parent?.model?.enable;
                  },
                },
                fieldGroup: [
                  {
                    fieldGroupClassName: 'grid grid-cols-12 gap-3',
                    fieldGroup: [
                      {
                        key: 'onEnter',
                        type: 'select',
                        className: 'col-span-6',
                        defaultValue: content?.animate?.gsap?.trigger?.onEnter ?? 'play',
                        props: {
                          label: '元素进入视线',
                          options: actionsOptions,
                        },
                      },
                      {
                        key: 'onLeave',
                        type: 'select',
                        className: 'col-span-6',
                        defaultValue: content?.animate?.gsap?.trigger?.onLeave ?? 'none',
                        props: {
                          label: '元素离开视线',
                          options: actionsOptions,
                        },
                      },
                      {
                        key: 'onEnterBack',
                        type: 'select',
                        className: 'col-span-6',
                        defaultValue: content?.animate?.gsap?.trigger?.onEnterBack ?? 'none',
                        props: {
                          label: '再进入视线',
                          options: actionsOptions,
                        },
                      },
                      {
                        key: 'onLeaveBack',
                        type: 'select',
                        className: 'col-span-6',
                        defaultValue: content?.animate?.gsap?.trigger?.onLeaveBack ?? 'none',
                        props: {
                          label: '再进入后离开',
                          options: actionsOptions,
                        },
                      },
                    ],
                  },
                  {
                    fieldGroupClassName: 'grid grid-cols-12 gap-3',
                    fieldGroup: [
                      {
                        key: 'start',
                        type: 'input',
                        className: 'col-span-6',
                        defaultValue: content?.animate?.gsap?.trigger?.start ?? 'top 90%',
                        props: {
                          label: '触发开始位置',
                        },
                      },
                      {
                        key: 'end',
                        type: 'input',
                        className: 'col-span-6',
                        defaultValue: content?.animate?.gsap?.trigger?.end ?? 'bottom 30%',
                        props: {
                          label: '触发结束位置',
                        },
                      },
                    ],
                  },
                  {
                    key: 'scrub',
                    type: 'toggle',
                    className: 'w-full',
                    defaultValue: content?.animate?.gsap?.trigger?.scrub ?? false,
                    props: {
                      label: '跟随滚动变化',
                    },
                  },
                  {
                    key: 'markers',
                    type: 'toggle',
                    className: 'w-full',
                    defaultValue: content?.animate?.gsap?.trigger?.markers ?? false,
                    props: {
                      label: '调试',
                    },
                  },
                ],
              },
            ],
          },
        ],
        hooks: {
          onInit: (formGroup: FormlyFieldConfig) => {
            const { form } = formGroup;
            form?.valueChanges.subscribe((value: any) => {
              const {
                animate: { aos, gsap },
              } = value;
              if (aos?.enable) {
                form
                  .get(['animate', 'gsap', 'enable'])
                  ?.patchValue(false, { onlySelf: true, emitEvent: true });
              }
              if (gsap?.enable) {
                form
                  .get(['animate', 'aos', 'enable'])
                  ?.patchValue(false, { onlySelf: true, emitEvent: true });
              }
            });
          },
        },
      },
    ],
  };
}

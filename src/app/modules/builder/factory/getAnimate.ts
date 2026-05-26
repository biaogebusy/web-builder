import { FormlyFieldConfig } from '@ngx-formly/core';
import { tap } from 'rxjs/operators';

export function getAnimate(content: any): FormlyFieldConfig {
  const actionsOptions = [
    {
      label: 'BUILDER.FACTORY.ACTION_RESTART',
      value: 'restart',
    },
    {
      label: 'BUILDER.FACTORY.NONE',
      value: 'none',
    },
    {
      label: 'BUILDER.FACTORY.ACTION_PLAY',
      value: 'play',
    },
    {
      label: 'BUILDER.FACTORY.ACTION_PAUSE',
      value: 'pause',
    },
    {
      label: 'BUILDER.FACTORY.ACTION_RESUME',
      value: 'resume',
    },
    {
      label: 'BUILDER.FACTORY.ACTION_REVERSE',
      value: 'reverse',
    },
    {
      label: 'BUILDER.FACTORY.ACTION_RESET',
      value: 'reset',
    },
    {
      label: 'BUILDER.FACTORY.ACTION_COMPLETE',
      value: 'complete',
    },
  ];
  return {
    props: {
      label: 'BUILDER.FACTORY.ANIMATION_TAB_LABEL',
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
                  label: 'BUILDER.FACTORY.AOS_BASIC',
                },
              },
              {
                key: 'animation',
                type: 'select',
                className: 'w-full',
                defaultValue: content?.animate?.aos?.animation || 'fade-up',
                props: {
                  label: 'BUILDER.FACTORY.ANIMATION_EFFECT',
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
                    defaultValue: content?.animate?.aos?.behaviour?.offset ?? 120,
                    props: {
                      type: 'number',
                      label: 'BUILDER.FACTORY.OFFSET',
                    },
                  },
                  {
                    key: 'duration',
                    type: 'input',
                    className: 'w-full',
                    defaultValue: content?.animate?.aos?.behaviour?.duration ?? 400,
                    props: {
                      type: 'number',
                      label: 'BUILDER.FACTORY.DURATION_ANIM',
                    },
                  },
                  {
                    key: 'delay',
                    type: 'input',
                    className: 'w-full',
                    defaultValue: content?.animate?.aos?.behaviour?.delay ?? 0,
                    props: {
                      type: 'number',
                      label: 'BUILDER.FACTORY.DELAY_MS',
                    },
                  },
                  {
                    key: 'easing',
                    type: 'select',
                    className: 'w-full',
                    defaultValue: content?.animate?.aos?.behaviour?.easing ?? 'ease',
                    props: {
                      type: 'text',
                      label: 'BUILDER.FACTORY.EASING_EFFECT',
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
                  label: 'BUILDER.FACTORY.GSAP_ADVANCED',
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
                        defaultValue: Number(content?.animate?.gsap?.from?.x) ?? null,
                        props: {
                          label: 'BUILDER.FACTORY.MOVE_X',
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
                        defaultValue: Number(content?.animate?.gsap?.from?.y) ?? null,
                        props: {
                          label: 'BUILDER.FACTORY.MOVE_Y',
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
                        defaultValue: Number(content?.animate?.gsap?.from?.rotationX) ?? null,
                        props: {
                          label: 'BUILDER.FACTORY.ROTATE_X',
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
                        defaultValue: Number(content?.animate?.gsap?.from?.rotationY) ?? null,
                        props: {
                          label: 'BUILDER.FACTORY.ROTATE_Y',
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
                        defaultValue: Number(content?.animate?.gsap?.from?.scaleX) ?? null,
                        props: {
                          label: 'BUILDER.FACTORY.SCALE_X',
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
                        defaultValue: Number(content?.animate?.gsap?.from?.scaleY) ?? null,
                        props: {
                          label: 'BUILDER.FACTORY.SCALE_Y',
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
                        defaultValue: Number(content?.animate?.gsap?.from?.skewX) ?? null,
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
                        defaultValue: Number(content?.animate?.gsap?.from?.skewY) ?? null,
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
                        defaultValue: Number(content?.animate?.gsap?.from?.opacity) ?? null,
                        props: {
                          label: 'BUILDER.FACTORY.OPACITY_LABEL',
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
                        defaultValue: Number(content?.animate?.gsap?.from?.delay) ?? null,
                        props: {
                          label: 'BUILDER.FACTORY.DELAY_LABEL',
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
                        defaultValue: Number(content?.animate?.gsap?.from?.duration) ?? null,
                        props: {
                          label: 'BUILDER.FACTORY.DURATION_SEC',
                          min: 0.1,
                          max: 6,
                          step: 0.1,
                          type: 'number',
                        },
                      },
                      {
                        key: 'ease',
                        defaultValue: content?.animate?.gsap?.from?.ease ?? null,
                        type: 'select',
                        className: 'col-span-6',
                        props: {
                          label: 'BUILDER.FACTORY.EASING_CURVE',
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
                        defaultValue: content?.animate?.gsap?.trigger?.onEnter || 'restart',
                        props: {
                          label: 'BUILDER.FACTORY.GSAP_ON_ENTER',
                          options: actionsOptions,
                        },
                      },
                      {
                        key: 'onLeave',
                        type: 'select',
                        className: 'col-span-6',
                        defaultValue: content?.animate?.gsap?.trigger?.onLeave || 'pause',
                        props: {
                          label: 'BUILDER.FACTORY.GSAP_ON_LEAVE',
                          options: actionsOptions,
                        },
                      },
                      {
                        key: 'onEnterBack',
                        type: 'select',
                        className: 'col-span-6',
                        defaultValue: content?.animate?.gsap?.trigger?.onEnterBack ?? 'none',
                        props: {
                          label: 'BUILDER.FACTORY.GSAP_ON_ENTER_BACK',
                          options: actionsOptions,
                        },
                      },
                      {
                        key: 'onLeaveBack',
                        type: 'select',
                        className: 'col-span-6',
                        defaultValue: content?.animate?.gsap?.trigger?.onLeaveBack ?? 'reverse',
                        props: {
                          label: 'BUILDER.FACTORY.GSAP_ON_LEAVE_BACK',
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
                        defaultValue: content?.animate?.gsap?.trigger?.start ?? '20px 80%',
                        props: {
                          label: 'BUILDER.FACTORY.GSAP_START',
                        },
                      },
                      {
                        key: 'end',
                        type: 'input',
                        className: 'col-span-6',
                        defaultValue: content?.animate?.gsap?.trigger?.end ?? 'bottom 100px',
                        props: {
                          label: 'BUILDER.FACTORY.GSAP_END',
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
                      label: 'BUILDER.FACTORY.GSAP_SCRUB',
                    },
                  },
                  {
                    key: 'markers',
                    type: 'toggle',
                    className: 'w-full',
                    defaultValue: content?.animate?.gsap?.trigger?.markers ?? false,
                    props: {
                      label: 'BUILDER.FACTORY.GSAP_MARKERS',
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
            return form!.valueChanges.pipe(
              tap((value: any) => {
                const {
                  animate: { aos, gsap },
                } = value;
                if (aos?.enable) {
                  form
                    ?.get(['animate', 'gsap', 'enable'])
                    ?.patchValue(false, { onlySelf: true, emitEvent: true });
                }
                if (gsap?.enable) {
                  form
                    ?.get(['animate', 'aos', 'enable'])
                    ?.patchValue(false, { onlySelf: true, emitEvent: true });
                }
              })
            );
          },
        },
      },
    ],
  };
}

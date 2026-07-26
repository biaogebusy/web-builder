import { FormlyFieldConfig } from '@ngx-formly/core';

const numOr = (v: unknown): number | null => (v == null || v === '' ? null : Number(v));

export function getAnimateGsap(content: any): FormlyFieldConfig {
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
                defaultValue: numOr(content?.animate?.gsap?.from?.x),
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
                defaultValue: numOr(content?.animate?.gsap?.from?.y),
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
                defaultValue: numOr(content?.animate?.gsap?.from?.rotationX),
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
                defaultValue: numOr(content?.animate?.gsap?.from?.rotationY),
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
                defaultValue: numOr(content?.animate?.gsap?.from?.scaleX),
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
                defaultValue: numOr(content?.animate?.gsap?.from?.scaleY),
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
                defaultValue: numOr(content?.animate?.gsap?.from?.skewX),
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
                defaultValue: numOr(content?.animate?.gsap?.from?.skewY),
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
                defaultValue: numOr(content?.animate?.gsap?.from?.opacity),
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
                defaultValue: numOr(content?.animate?.gsap?.from?.delay),
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
                defaultValue: numOr(content?.animate?.gsap?.from?.duration),
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
  };
}

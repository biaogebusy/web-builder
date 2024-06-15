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
        fieldGroup: [
          {
            key: 'enable',
            type: 'toggle',
            defaultValue: content?.animate?.enable,
            props: {
              label: '开启动画',
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
                    defaultValue: content?.animate?.from?.x ?? 0,
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
                    defaultValue: content?.animate?.from?.y ?? 0,
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
                    defaultValue: content?.animate?.from?.rotationX ?? 0,
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
                    defaultValue: content?.animate?.from?.rotationY ?? 0,
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
                    defaultValue: content?.animate?.from?.scaleX ?? 1,
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
                    defaultValue: content?.animate?.from?.scaleY ?? 1,
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
                    defaultValue: content?.animate?.from?.skewX ?? 0,
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
                    defaultValue: content?.animate?.from?.skewY ?? 0,
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
                    defaultValue: content?.animate?.from?.opacity ?? 1,
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
                    defaultValue: content?.animate?.from?.delay ?? 0,
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
                    defaultValue: content?.animate?.from?.duration ?? 1,
                    props: {
                      label: '时长',
                      min: 0.1,
                      max: 6,
                      step: 0.1,
                      unit: 's',
                    },
                  },
                  {
                    key: 'ease',
                    defaultValue: content?.animate?.from?.ease ?? 'none',
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
                    defaultValue: content?.animate?.trigger?.onEnter ?? 'play',
                    props: {
                      label: '元素进入视线',
                      options: actionsOptions,
                    },
                  },
                  {
                    key: 'onLeave',
                    type: 'select',
                    className: 'col-span-6',
                    defaultValue: content?.animate?.trigger?.onLeave ?? 'none',
                    props: {
                      label: '元素离开视线',
                      options: actionsOptions,
                    },
                  },
                  {
                    key: 'onEnterBack',
                    type: 'select',
                    className: 'col-span-6',
                    defaultValue:
                      content?.animate?.trigger?.onEnterBack ?? 'none',
                    props: {
                      label: '再进入视线',
                      options: actionsOptions,
                    },
                  },
                  {
                    key: 'onLeaveBack',
                    type: 'select',
                    className: 'col-span-6',
                    defaultValue:
                      content?.animate?.trigger?.onLeaveBack ?? 'none',
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
                    defaultValue: content?.animate?.trigger?.start ?? 'top 90%',
                    props: {
                      label: '触发开始位置',
                    },
                  },
                  {
                    key: 'end',
                    type: 'input',
                    className: 'col-span-6',
                    defaultValue: content?.animate?.trigger?.end ?? 'top 40%',
                    props: {
                      label: '触发结束位置',
                    },
                  },
                ],
              },
              {
                key: 'scrub',
                type: 'toggle',
                defaultValue: content?.animate?.trigger?.scrub ?? false,
                props: {
                  label: '跟随滚动变化',
                },
              },
            ],
          },
        ],
      },
    ],
  };
}

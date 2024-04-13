import { FormlyFieldConfig } from '@ngx-formly/core';
import { isUndefined } from 'lodash-es';

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
    templateOptions: {
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
            templateOptions: {
              label: '开启动画',
            },
          },
          {
            key: 'from',
            fieldGroup: [
              {
                fieldGroupClassName: 'section-group',
                fieldGroup: [
                  {
                    key: 'x',
                    type: 'input',
                    className: 'width-40 m-right-sm',
                    defaultValue: content?.animate?.from?.x || 0,
                    templateOptions: {
                      label: 'X',
                      min: -500,
                      max: 500,
                      step: 10,
                      type: 'number',
                    },
                  },
                  {
                    key: 'y',
                    type: 'input',
                    className: 'width-40',
                    defaultValue: content?.animate?.from?.y || 0,
                    templateOptions: {
                      label: 'Y',
                      min: -500,
                      max: 500,
                      step: 10,
                      type: 'number',
                    },
                  },
                ],
              },
              {
                fieldGroupClassName: 'section-group',
                fieldGroup: [
                  {
                    key: 'rotation',
                    type: 'input',
                    className: 'width-40 m-right-sm',
                    defaultValue: content?.animate?.from?.rotation || 0,
                    templateOptions: {
                      label: '旋转',
                      min: -360,
                      max: 360,
                      step: 1,
                      type: 'number',
                    },
                  },
                  {
                    key: 'scale',
                    type: 'input',
                    className: 'width-40',
                    defaultValue: content?.animate?.from?.scale || 1,
                    templateOptions: {
                      label: '缩放',
                      min: 0,
                      max: 2,
                      step: 0.1,
                      type: 'number',
                    },
                  },
                ],
              },
              {
                fieldGroupClassName: 'section-group',
                fieldGroup: [
                  {
                    key: 'opacity',
                    type: 'input',
                    className: 'width-40 m-right-sm',
                    defaultValue: isUndefined(content?.animate?.from?.opacity)
                      ? 1
                      : content?.animate?.from?.opacity,
                    templateOptions: {
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
                    className: 'width-40',
                    defaultValue: content?.animate?.from?.delay || 0,
                    templateOptions: {
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
                    className: 'width-40 m-right-sm',
                    defaultValue: content?.animate?.from?.duration || 1,
                    templateOptions: {
                      label: '时长',
                      min: 0.1,
                      max: 6,
                      step: 0.1,
                      unit: 's',
                    },
                  },
                  {
                    key: 'ease',
                    defaultValue: content?.animate?.from?.ease || 'none',
                    type: 'select',
                    className: 'width-40',
                    templateOptions: {
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
            fieldGroup: [
              {
                fieldGroupClassName: 'section-group',
                fieldGroup: [
                  {
                    key: 'onEnter',
                    type: 'select',
                    className: 'width-40',
                    defaultValue: content?.animate?.trigger?.onEnter || 'play',
                    templateOptions: {
                      label: '元素进入视线',
                      options: actionsOptions,
                    },
                  },
                  {
                    key: 'onLeave',
                    type: 'select',
                    className: 'width-40',
                    defaultValue: content?.animate?.trigger?.onLeave || 'none',
                    templateOptions: {
                      label: '元素离开视线',
                      options: actionsOptions,
                    },
                  },
                  {
                    key: 'onEnterBack',
                    type: 'select',
                    className: 'width-40',
                    defaultValue:
                      content?.animate?.trigger?.onEnterBack || 'none',
                    templateOptions: {
                      label: '再进入视线',
                      options: actionsOptions,
                    },
                  },
                  {
                    key: 'onLeaveBack',
                    type: 'select',
                    className: 'width-40',
                    defaultValue:
                      content?.animate?.trigger?.onLeaveBack || 'none',
                    templateOptions: {
                      label: '再进入后离开',
                      options: actionsOptions,
                    },
                  },
                ],
              },
              {
                fieldGroupClassName: 'section-group',
                fieldGroup: [
                  {
                    key: 'start',
                    type: 'input',
                    className: 'width-40',
                    defaultValue: content?.animate?.trigger?.start || 'top 90%',
                    templateOptions: {
                      label: '触发开始位置',
                    },
                  },
                  {
                    key: 'end',
                    type: 'input',
                    className: 'width-40',
                    defaultValue: content?.animate?.trigger?.end || 'top 40%',
                    templateOptions: {
                      label: '触发结束位置',
                    },
                  },
                ],
              },
              {
                key: 'scrub',
                type: 'toggle',
                defaultValue: content?.animate?.trigger?.scrub,
                templateOptions: {
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

import { FormlyFieldConfig } from '@ngx-formly/core';

export function getAnimate(content: any): FormlyFieldConfig {
  return {
    templateOptions: {
      label: '动画',
    },
    fieldGroup: [
      {
        key: 'animate',
        fieldGroup: [
          {
            key: 'from',
            fieldGroup: [
              {
                key: 'x',
                type: 'slider',
                defaultValue: content?.animate?.from?.x || 0,
                templateOptions: {
                  min: -500,
                  max: 500,
                  step: 10,
                },
                expressionProperties: {
                  'templateOptions.label': '"X轴: " + model.x + " px"',
                },
              },
              {
                key: 'y',
                type: 'slider',
                defaultValue: content?.animate?.from?.y || 0,
                templateOptions: {
                  min: -500,
                  max: 500,
                  step: 10,
                },
                expressionProperties: {
                  'templateOptions.label': '"Y轴: " + model.y + " px"',
                },
              },
              {
                key: 'opacity',
                type: 'slider',
                defaultValue: content?.animate?.from?.opacity || 1,
                templateOptions: {
                  min: 0,
                  max: 1,
                  step: 0.1,
                },
                expressionProperties: {
                  'templateOptions.label': '"不透明度: " + model.opacity',
                },
              },
              {
                key: 'delay',
                type: 'slider',
                defaultValue: content?.animate?.from?.delay || 0,
                templateOptions: {
                  min: 0,
                  max: 6,
                  step: 0.1,
                },
                expressionProperties: {
                  'templateOptions.label': '"延迟: " + model.delay + "秒"',
                },
              },
              {
                key: 'duration',
                type: 'slider',
                defaultValue: content?.animate?.from?.duration || 1,
                templateOptions: {
                  min: 1,
                  max: 6,
                  step: 0.1,
                },
                expressionProperties: {
                  'templateOptions.label':
                    '"动画时长: " + model.duration + "秒"',
                },
              },
              {
                key: 'ease',
                defaultValue: content?.animate?.from?.ease || 'none',
                type: 'select',
                templateOptions: {
                  label: '动画曲线',
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
          {
            key: 'trigger',
            fieldGroup: [
              {
                key: 'start',
                type: 'input',
                defaultValue: content?.animate?.trigger?.start || 'top 85%',
                templateOptions: {
                  label: '触发元素开始的位置',
                },
              },
              {
                key: 'end',
                type: 'input',
                defaultValue: content?.animate?.trigger?.end || 'bottom 30%',
                templateOptions: {
                  label: '触发元素结束的位置',
                },
              },
              {
                key: 'markers',
                type: 'toggle',
                defaultValue: content?.animate?.trigger?.markers,
                templateOptions: {
                  label: '开启Debuger标记',
                },
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

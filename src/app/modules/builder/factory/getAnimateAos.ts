import { FormlyFieldConfig } from '@ngx-formly/core';

export function getAnimateAos(content: any): FormlyFieldConfig {
  return {
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
        template: 'BUILDER.FACTORY.AOS_PREVIEW_TIP',
        className: 'block text-sm py-2 px-3 mb-2 bg-blue-50 rounded',
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
  };
}

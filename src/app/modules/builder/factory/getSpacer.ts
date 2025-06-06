import { FormlyFieldConfig } from '@ngx-formly/core';

export function getSpacer(widget: any): FormlyFieldConfig {
  return {
    key: 'spacer',
    fieldGroup: [
      {
        key: 'size',
        type: 'select',
        className: 'w-full',
        defaultValue: widget.size || 'sm',
        props: spacerOption,
      },
    ],
  };
}

export const spacerOption = {
  label: '间距大小',
  options: [
    {
      label: 'xs',
      value: 'xs',
    },
    {
      label: 'sm',
      value: 'sm',
    },
    {
      label: 'md',
      value: 'md',
    },
    {
      label: 'lg',
      value: 'lg',
    },
    {
      label: 'xl',
      value: 'xl',
    },
    {
      label: '无',
      value: 'none',
    },
  ],
};

import { FormlyFieldConfig } from '@ngx-formly/core';

export function getContact(widget: any, options?: any[]): FormlyFieldConfig[] {
  const fields = [
    {
      key: 'contact',
      type: 'tabs',
      fieldGroup: [
        {
          props: {
            label: '联系我们',
          },
          fieldGroup: [
            {
              key: 'params',
              fieldGroupClassName: 'w-full',
              fieldGroup: [
                {
                  key: 'webform_id',
                  type: 'input',
                  defaultValue: widget.params.webform_id,
                  props: {
                    label: 'Webform ID',
                    description: 'Drupal webform id',
                  },
                },
              ],
            },
            {
              key: 'action',
              fieldGroupClassName: 'w-full',
              fieldGroup: [
                {
                  key: 'label',
                  type: 'input',
                  defaultValue: widget.action.label,
                  props: {
                    label: '提交文字',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  if (options) {
    fields[0].fieldGroup.push(...options);
  }

  return fields;
}

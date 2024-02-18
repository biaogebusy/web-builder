import { FormlyFieldConfig } from '@ngx-formly/core';

export function getContact(widget: any): FormlyFieldConfig[] {
  return [
    {
      key: 'contact',
      fieldGroup: [
        {
          key: 'params',
          fieldGroupClassName: 'width-100',
          fieldGroup: [
            {
              key: 'webform_id',
              type: 'input',
              defaultValue: widget.params.webform_id,
              templateOptions: {
                label: 'Webform ID',
                description: 'Drupal webform id',
              },
            },
          ],
        },
        {
          key: 'action',
          fieldGroupClassName: 'width-100',
          fieldGroup: [
            {
              key: 'label',
              type: 'input',
              defaultValue: widget.action.label,
              templateOptions: {
                label: '提交文字',
              },
            },
          ],
        },
      ],
    },
  ];
}

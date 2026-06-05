import { FormlyFieldConfig } from '@ngx-formly/core';

export function getContact(widget: any): FormlyFieldConfig {
  const fields = {
    key: 'contact',
    type: 'tabs',
    fieldGroup: [
      {
        props: {
          label: 'BUILDER.FACTORY.CONTACT_US_TAB',
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
                  label: 'BUILDER.FACTORY.SUBMIT_LABEL',
                },
              },
            ],
          },
        ],
      },
    ],
  };

  return fields;
}

import { FormlyFieldConfig } from '@ngx-formly/core';
import { tap } from 'rxjs/operators';

export function getLink(widget: any): FormlyFieldConfig {
  const fields = {
    key: 'link',
    type: 'tabs',
    fieldGroup: [
      {
        props: {
          label: 'BUILDER.FACTORY.TAB_LABEL_LINK',
        },
        fieldGroup: [
          {
            key: 'label',
            type: 'textarea',
            className: 'w-full',
            defaultValue: widget.label ?? '',
            props: {
              rows: 1,
              label: 'BUILDER.FACTORY.LINK_TEXT',
            },
          },
          {
            key: 'href',
            type: 'input',
            className: 'w-full',
            defaultValue: widget.href ?? '/',
            props: {
              type: 'text',
              label: 'BUILDER.FACTORY.HREF',
            },
          },
          {
            key: 'classes',
            type: 'input',
            className: 'w-full',
            defaultValue: widget.classes ?? '',
            props: {
              type: 'text',
              label: 'Class',
            },
          },
          {
            key: 'rel',
            type: 'input',
            className: 'w-full hidden',
            defaultValue: widget.rel ?? '',
            props: {
              type: 'text',
              placeholder: 'rel',
            },
          },
          {
            type: 'toggle',
            key: 'isRel',
            defaultValue: widget.rel ?? false,
            className: 'w-full',
            props: {
              label: 'BUILDER.FACTORY.LOAD_IN_DRAWER',
              description: 'BUILDER.FACTORY.LOAD_IN_DRAWER_DESC',
            },
            hooks: {
              onInit: (formGroup: any) => {
                const { form, model } = formGroup;
                return form.valueChanges.pipe(
                  tap((value: any) => {
                    console.log(value);
                    const { isRel } = value;
                    if (isRel) {
                      model.rel = 'drawer';
                    } else {
                      model.rel = '';
                    }
                  })
                );
              },
            },
          },
        ],
      },
    ],
  };

  return fields;
}

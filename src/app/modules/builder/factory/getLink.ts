import { FormlyFieldConfig } from '@ngx-formly/core';

export function getLink(widget: any): FormlyFieldConfig {
  const fields = {
    key: 'link',
    type: 'tabs',
    fieldGroup: [
      {
        props: {
          label: '链接',
        },
        fieldGroup: [
          {
            key: 'label',
            type: 'textarea',
            className: 'w-full',
            defaultValue: widget.label ?? '',
            props: {
              rows: 1,
              label: '链接文本',
            },
          },
          {
            key: 'href',
            type: 'input',
            className: 'w-full',
            defaultValue: widget.href ?? '/',
            props: {
              type: 'text',
              label: '链接地址',
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
              label: '在侧边栏加载链接页面',
              description: '请发布后测试，点击加载链接的页面到侧边栏显示',
            },
            hooks: {
              onInit: (formGroup: any) => {
                const { form, model } = formGroup;
                form.valueChanges.subscribe((value: any) => {
                  console.log(value);
                  const { isRel } = value;
                  if (isRel) {
                    model.rel = 'drawer';
                  } else {
                    model.rel = '';
                  }
                });
              },
            },
          },
        ],
      },
    ],
  };

  return fields;
}

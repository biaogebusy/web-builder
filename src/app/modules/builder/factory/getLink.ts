import { FormlyFieldConfig } from '@ngx-formly/core';

export function getLink(widget: any, options?: any[]): FormlyFieldConfig[] {
  const fields = [
    {
      key: 'link',
      type: 'tabs',
      fieldGroup: [
        {
          templateOptions: {
            label: '链接',
          },
          fieldGroup: [
            {
              key: 'label',
              type: 'textarea',
              className: 'width-100',
              defaultValue: widget.label || '',
              templateOptions: {
                rows: 1,
                label: '链接文本',
              },
            },
            {
              key: 'href',
              type: 'input',
              className: 'width-100',
              defaultValue: widget.href || '/',
              templateOptions: {
                type: 'text',
                label: '链接地址',
              },
            },
            {
              key: 'classes',
              type: 'input',
              className: 'width-100',
              defaultValue: widget.classes || '',
              templateOptions: {
                type: 'text',
                label: 'Class',
              },
            },
            {
              key: 'rel',
              type: 'input',
              className: 'width-100 hidden',
              defaultValue: widget.rel || '',
              templateOptions: {
                type: 'text',
              },
            },
            {
              type: 'toggle',
              key: 'isRel',
              defaultValue: widget.rel || false,
              className: 'width-100',
              templateOptions: {
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
    },
  ];

  if (options) {
    fields[0].fieldGroup.push(...options);
  }

  return fields;
}

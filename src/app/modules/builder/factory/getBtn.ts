import { FormlyFieldConfig } from '@ngx-formly/core';

export function getBtn(widget: any): FormlyFieldConfig[] {
  return [
    {
      key: 'btn',
      fieldGroup: [
        {
          key: 'color',
          type: 'select',
          className: 'width-100',
          defaultValue: widget.color || null,
          templateOptions: {
            label: '颜色',
            options: [
              {
                label: 'Basic',
                value: null,
              },
              {
                label: 'Primary',
                value: 'primary',
              },
              {
                label: 'Accent',
                value: 'accent',
              },
              {
                label: 'Warn',
                value: 'warn',
              },
            ],
          },
        },
        {
          key: 'label',
          type: 'input',
          className: 'width-100',
          defaultValue: widget.label || '',
          templateOptions: {
            type: 'text',
            label: '文本',
          },
          hideExpression: 'model.mode === "icon"',
        },
        {
          key: 'mode',
          type: 'select',
          className: 'width-100',
          defaultValue: widget.mode || 'basic',
          templateOptions: {
            label: '类型',
            options: [
              {
                label: 'Basic',
                value: 'basic',
              },
              {
                label: 'raised',
                value: 'raised',
              },
              {
                label: 'stroked',
                value: 'stroked',
              },
              {
                label: 'icon',
                value: 'icon',
              },
              {
                label: 'flat',
                value: 'flat',
              },
              {
                label: 'fab',
                value: 'fab',
              },
              {
                label: 'mini-fab',
                value: 'mini-fab',
              },
            ],
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
          key: 'target',
          type: 'select',
          className: 'width-100',
          defaultValue: widget.target || '_blank',
          templateOptions: {
            label: '打开方式',
            options: [
              {
                label: '当前窗口',
                value: '',
              },
              {
                label: '新窗口',
                value: '_blank',
              },
            ],
          },
          hideExpression: '!model.href',
        },
        {
          key: 'icon',
          className: 'width-100',
          fieldGroup: [
            {
              key: 'svg',
              type: 'input',
              className: 'width-100',
              defaultValue: widget?.icon?.svg || '',
              templateOptions: {
                label: '图标',
              },
              modelOptions: {
                debounce: {
                  default: 1500,
                },
              },
            },
          ],
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
        // {
        //   type: 'toggle',
        //   key: 'isRel',
        //   defaultValue: widget.rel || false,
        //   className: 'width-100',
        //   templateOptions: {
        //     label: '在侧边栏加载链接页面',
        //     description: '请发布后测试，点击加载链接的页面到侧边栏显示',
        //   },
        //   hooks: {
        //     onInit: (formGroup: any) => {
        //       const { form, model } = formGroup;
        //       form.valueChanges.subscribe((value: any) => {
        //         console.log(value);
        //         const { isRel } = value;
        //         if (isRel) {
        //           model.rel = 'drawer';
        //         } else {
        //           model.rel = '';
        //         }
        //       });
        //     },
        //   },
        // },
      ],
    },
  ];
}

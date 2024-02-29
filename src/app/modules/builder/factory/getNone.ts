import { FormlyFieldConfig } from '@ngx-formly/core';

export function getNone(widget: any, options?: any[]): FormlyFieldConfig[] {
  const fields = [
    {
      key: 'none',
      type: 'tabs',

      fieldGroup: [
        {
          templateOptions: {
            label: 'None',
          },
          fieldGroup: [
            {
              template: `<div class="none-description">当前${widget.type}暂无可视化配置，可直接更新JSON修改。</div>`,
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

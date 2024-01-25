import { FormlyFieldConfig } from '@ngx-formly/core';

export function getNone(widget: any): FormlyFieldConfig[] {
  console.log(widget);
  return [
    {
      key: 'none',
      fieldGroup: [
        {
          template: `当前${widget.type}暂无可视化配置，可直接更新JSON修改。`,
        },
      ],
    },
  ];
}

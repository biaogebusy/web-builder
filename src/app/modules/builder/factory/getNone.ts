import { FormlyFieldConfig } from '@ngx-formly/core';

export function getNone(widget: any): FormlyFieldConfig {
  const fields = {
    key: 'none',
    type: 'tabs',
    fieldGroup: [
      {
        props: {
          label: 'BUILDER.FACTORY.TAB_LABEL_PARAMS',
        },
        fieldGroup: [
          {
            template: `<div class="none-description">当前${widget.type}暂无可视化配置，可直接更新JSON修改。</div>`,
          },
        ],
      },
    ],
  };

  return fields;
}

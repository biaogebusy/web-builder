import { InjectionToken } from '@angular/core';
import {
  ConfigOption,
  FormlyExtension,
  FormlyFieldConfig,
  FormlyFormOptions,
} from '@ngx-formly/core';

import { ShadcnFormFieldWrapper } from './shadcn-form-field.wrapper';
import { ShadcnInputType } from './shadcn-input.type';
import { ShadcnSelectType } from './shadcn-select.type';
import { ShadcnSliderType } from './shadcn-slider.type';
import { ShadcnTextareaType } from './shadcn-textarea.type';
import { ShadcnToggleType } from './shadcn-toggle.type';

export type FormUiTheme = 'material' | 'shadcn';

/**
 * 表单 UI 主题的全局默认值。整体切换到 shadcn 时在 app 级
 * provide { provide: FORM_UI_THEME, useValue: 'shadcn' } 即可,
 * 无需改动任何字段配置;单个表单仍可用 formState.uiTheme 覆盖。
 */
export const FORM_UI_THEME = new InjectionToken<FormUiTheme>('FORM_UI_THEME', {
  factory: () => 'material',
});

/**
 * 单个表单的 shadcn 开关:<formly-form [options]="xxxOptions" />。
 * formly 会向 options 写入内部状态,每个表单实例必须持有独立对象,
 * 因此提供工厂函数而非共享常量。
 */
export function shadcnFormOptions(): FormlyFormOptions {
  return { formState: { uiTheme: 'shadcn' } };
}

// Material 内置类型名 → shadcn 等价类型。wrappers 一并显式覆盖,
// 确保改名后字段不再落入 Material 的 form-field wrapper。
const SHADCN_TYPE_MAP: Record<string, { type: string; wrappers: string[] }> = {
  'input': { type: 'shadcn-input', wrappers: ['shadcn-form-field'] },
  'string': { type: 'shadcn-input', wrappers: ['shadcn-form-field'] },
  'number': { type: 'shadcn-input', wrappers: ['shadcn-form-field'] },
  'integer': { type: 'shadcn-input', wrappers: ['shadcn-form-field'] },
  'textarea': { type: 'shadcn-textarea', wrappers: ['shadcn-form-field'] },
  // 单选 select;多选(props.multiple)在 extension 中跳过,继续走 mat-select
  'select': { type: 'shadcn-select', wrappers: ['shadcn-form-field'] },
  // 自定义 slider 类型(MatSlider)→ 原生 range 滑块
  'slider': { type: 'shadcn-slider', wrappers: ['shadcn-form-field'] },
  // 复合控件,类型不变,仅补 shadcn wrapper 以渲染 label/必填标记/错误
  'img-picker': { type: 'img-picker', wrappers: ['shadcn-form-field'] },
  // toggle 自带内联 label,不需要字段 wrapper
  'toggle': { type: 'shadcn-toggle', wrappers: [] },
  // 不映射的类型:datepicker(业务零使用,且原生 date 输入与 Date 对象
  // 模型语义不同)、mat-select(搜索/API 选项/虚拟滚动无法用原生 select
  // 承载,仅存在于 Material 模式表单)。repeat 复合类型自身按
  // formState.uiTheme 切换按钮样式。shadcn 表单将来若需要多选/搜索下拉,
  // 应实现 shadcn combobox 类型,而非用 CSS 覆盖 Material 组件。
};

export const XINSHI_FORMLY_SHADCN_CONFIG: ConfigOption = {
  types: [
    { name: 'shadcn-input', component: ShadcnInputType, wrappers: ['shadcn-form-field'] },
    { name: 'shadcn-textarea', component: ShadcnTextareaType, wrappers: ['shadcn-form-field'] },
    { name: 'shadcn-select', component: ShadcnSelectType, wrappers: ['shadcn-form-field'] },
    { name: 'shadcn-slider', component: ShadcnSliderType, wrappers: ['shadcn-form-field'] },
    { name: 'shadcn-toggle', component: ShadcnToggleType },
  ],
  wrappers: [{ name: 'shadcn-form-field', component: ShadcnFormFieldWrapper }],
};

/**
 * 主题切换 extension:构建字段时按 formState.uiTheme(缺省取 FORM_UI_THEME)
 * 把映射表内的内置类型重写为 shadcn 实现。映射表之外的类型原样通过
 * (repeat 自身会按 formState 切换按钮样式)。重写是幂等的:
 * 已改名的字段不再命中映射表。
 */
export function registerShadcnThemeExtension(defaultTheme: FormUiTheme): ConfigOption {
  const extension: FormlyExtension = {
    prePopulate(field: FormlyFieldConfig): void {
      const theme: FormUiTheme = field.options?.formState?.uiTheme ?? defaultTheme;
      if (theme !== 'shadcn' || typeof field.type !== 'string') {
        return;
      }
      const target = SHADCN_TYPE_MAP[field.type];
      if (!target) {
        return;
      }
      if (field.type === 'select' && field.props?.multiple) {
        // 原生 select 的多选体验差,多选字段保留 Material mat-select
        return;
      }
      if (field.type === 'number' || field.type === 'integer') {
        // number/integer 的语义来自注册在原类型上的 defaultOptions,改名前补齐
        field.props = { type: 'number', ...field.props };
      }
      field.type = target.type;
      field.wrappers = target.wrappers;
    },
  };
  return { extensions: [{ name: 'shadcn-theme', extension }] };
}

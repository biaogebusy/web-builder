import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { FormlySelectOptionsPipe } from '@ngx-formly/core/select';

/**
 * shadcn/ui 风格下拉,对应内置 select 类型(单选)。
 * 原生 <select> 保证键盘与无障碍行为;props.options 经 formlySelectOptions
 * 管道归一化(数组 / Observable / labelProp / valueProp 均可)。
 * 分组选项(group)与多选(props.multiple)不在此实现:多选字段在主题
 * extension 中跳过映射,继续使用 Material mat-select。
 * compareWith 兜底与 Material select 的默认实现一致(o1 === o2),
 * 因为重映射后 Material 组件的 defaultOptions 不会再合并进来。
 */
@Component({
  selector: 'formly-shadcn-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, ReactiveFormsModule, FormlyModule, FormlySelectOptionsPipe],
  template: `
    <span class="select-wrap">
      <select
        class="shad-input shad-select"
        [class.error]="showError"
        [formControl]="formControl"
        [formlyAttributes]="field"
        [compareWith]="compareWith"
        [attr.aria-invalid]="showError || null"
        [attr.aria-describedby]="showError ? id + '-error' : null"
      >
        @if (props.placeholder) {
          <option [ngValue]="null" disabled hidden>{{ props.placeholder }}</option>
        }
        @for (opt of props.options | formlySelectOptions: field | async; track $index) {
          <option [ngValue]="opt.value" [disabled]="opt.disabled ?? false">{{ opt.label }}</option>
        }
      </select>
      <svg class="chevron" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <path
          d="M7 10l5 5 5-5"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
  `,
  styleUrl: './shadcn-select.type.scss',
})
export class ShadcnSelectType extends FieldType<FieldTypeConfig> {
  get compareWith(): (o1: unknown, o2: unknown) => boolean {
    return this.props.compareWith ?? ((o1: unknown, o2: unknown) => o1 === o2);
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { FormlySelectOption, FormlySelectOptionsPipe } from '@ngx-formly/core/select';

import { ShadcnDropdownBase } from './shadcn-dropdown.base';

/**
 * shadcn/ui 风格多选下拉,对应内置 select 类型的多选(props.multiple)场景,
 * 替代 Material mat-select。与 shadcn-select 共用 ShadcnDropdownBase 行为
 * 与全局 .shad-popover/.shad-option 面板样式;选中项以左侧方框指示
 * (区别于单选的对勾),Enter/Space/点击切换选中且面板保持打开,
 * 触发按钮内以徽章展示已选项。值为选中项 value 的数组;选项经
 * formlySelectOptions 管道归一化,分组选项(group)不在此实现。
 */
@Component({
  selector: 'formly-shadcn-multiselect',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, FormlyModule, FormlySelectOptionsPipe],
  host: { '(document:click)': 'onDocumentClick($event)' },
  template: `
    @let opts = (props.options | formlySelectOptions: field | async) ?? [];
    <div class="multi-wrap">
      <button
        type="button"
        class="shad-input multi-trigger"
        role="combobox"
        aria-haspopup="listbox"
        [class.error]="showError"
        [attr.aria-expanded]="open()"
        [attr.aria-controls]="open() ? id + '-listbox' : null"
        [attr.aria-activedescendant]="open() ? id + '-opt-' + activeIndex() : null"
        [attr.aria-invalid]="showError || null"
        [attr.aria-describedby]="showError ? id + '-error' : null"
        [disabled]="formControl.disabled"
        [formlyAttributes]="field"
        (click)="toggleOpen(opts)"
        (keydown)="onKeydown($event, opts)"
      >
        <span class="multi-value">
          @for (value of selectedValues; track $index) {
            <span class="shad-badge">{{ labelFor(opts, value) }}</span>
          } @empty {
            <span class="multi-placeholder">{{ props.placeholder || '' }}</span>
          }
        </span>
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
      </button>
      @if (open()) {
        <!-- mousedown 阻止默认行为:点击选项时焦点保持在触发按钮上 -->
        <ul
          class="shad-popover"
          role="listbox"
          aria-multiselectable="true"
          [id]="id + '-listbox'"
          (mousedown)="$event.preventDefault()"
        >
          @for (opt of opts; track $index) {
            <li
              class="shad-option"
              role="option"
              tabindex="-1"
              [id]="id + '-opt-' + $index"
              [class.active]="$index === activeIndex()"
              [class.selected]="isSelected(opt.value)"
              [attr.aria-selected]="isSelected(opt.value)"
              [attr.aria-disabled]="opt.disabled || null"
              (click)="commitOption(opt)"
              (keydown.enter)="commitOption(opt)"
              (mouseenter)="activeIndex.set($index)"
            >
              <span class="option-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
                  <path
                    d="M5 13l4 4L19 7"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <span class="shad-option-label">{{ opt.label }}</span>
            </li>
          }
        </ul>
      }
    </div>
  `,
  styleUrl: './shadcn-multiselect.type.scss',
})
export class ShadcnMultiselectType extends ShadcnDropdownBase {
  /** 表单值统一视作数组;编辑回填的单值/空值做归一化 */
  get selectedValues(): unknown[] {
    const value = this.formControl.value;
    if (Array.isArray(value)) {
      return value;
    }
    return value === undefined || value === null || value === '' ? [] : [value];
  }

  isSelected(value: unknown): boolean {
    return this.selectedValues.some(v => this.compareWith(v, value));
  }

  labelFor(options: FormlySelectOption[], value: unknown): string {
    const opt = options.find(o => this.compareWith(o.value, value));
    return opt?.label ?? String(value ?? '');
  }

  commitOption(option: FormlySelectOption): void {
    if (option.disabled || this.formControl.disabled) {
      return;
    }
    const current = this.selectedValues;
    const next = this.isSelected(option.value)
      ? current.filter(v => !this.compareWith(v, option.value))
      : [...current, option.value];
    this.formControl.setValue(next);
    this.formControl.markAsDirty();
  }
}

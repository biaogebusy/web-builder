import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { FormlySelectOption, FormlySelectOptionsPipe } from '@ngx-formly/core/select';

import { ShadcnDropdownBase } from './shadcn-dropdown.base';

/**
 * shadcn/ui 风格下拉,对应内置 select 类型(单选)。
 * 不再使用原生 <select>:其弹出列表由操作系统绘制,无法跟随主题
 * (圆角/暗色/动效)。改为与 shadcn-multiselect 共用 ShadcnDropdownBase
 * 行为与全局 .shad-popover/.shad-option 面板样式,保证单选与多选的
 * 下拉体验一致;选中项以左侧对勾指示,选中后关闭面板。
 * 选项经 formlySelectOptions 管道归一化(数组 / Observable / labelProp /
 * valueProp 均可);分组选项(group)不在此实现。多选字段(props.multiple)
 * 由主题 extension 改写为 shadcn-multiselect。
 */
@Component({
  selector: 'formly-shadcn-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, FormlyModule, FormlySelectOptionsPipe],
  host: { '(document:click)': 'onDocumentClick($event)' },
  template: `
    @let opts = (props.options | formlySelectOptions: field | async) ?? [];
    <div class="select-wrap">
      <button
        type="button"
        class="shad-input select-trigger"
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
        @if (selectedLabel(opts); as label) {
          <span class="select-value">{{ label }}</span>
        } @else {
          <span class="select-placeholder">{{ props.placeholder || '' }}</span>
        }
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
              <span class="option-check" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                  <path
                    d="M5 13l4 4L19 7"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
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
  styleUrl: './shadcn-select.type.scss',
})
export class ShadcnSelectType extends ShadcnDropdownBase {
  isSelected(value: unknown): boolean {
    return this.compareWith(this.formControl.value, value);
  }

  selectedLabel(options: FormlySelectOption[]): string | null {
    const selected = options.find(o => this.isSelected(o.value));
    return selected ? (selected.label ?? null) : null;
  }

  commitOption(option: FormlySelectOption): void {
    if (option.disabled || this.formControl.disabled) {
      return;
    }
    this.formControl.setValue(option.value);
    this.formControl.markAsDirty();
    this.close();
  }
}

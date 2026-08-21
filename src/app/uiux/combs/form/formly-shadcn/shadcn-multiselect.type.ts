import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { FormlySelectOption, FormlySelectOptionsPipe } from '@ngx-formly/core/select';

import { ShadcnDropdownBase } from './shadcn-dropdown.base';

/**
 * shadcn/ui-style multiselect dropdown for the built-in select type's multi
 * (props.multiple) scenario, replacing Material mat-select. Shares the
 * ShadcnDropdownBase behavior and the global .shad-popover/.shad-option panel
 * styles with shadcn-select; selected items are marked with a leading box
 * (distinct from the single-select check), Enter/Space/click toggles the
 * selection while the panel stays open, and the trigger shows the chosen items
 * as badges. The value is an array of the selected options' values; options are
 * normalized through the formlySelectOptions pipe, and grouped options are not
 * implemented here.
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
        <!-- mousedown prevents the default behavior: focus stays on the trigger button when clicking an option -->
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
  /** Form value is always treated as an array; single/empty values backfilled from editing are normalized */
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

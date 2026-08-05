import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';

/**
 * shadcn/ui 风格复选框,对应内置 checkbox 类型(如 Drupal boolean 字段)。
 * 视觉隐藏的原生 checkbox 承载状态与键盘/焦点行为,方框与对勾为纯展示;
 * label 内联在方框右侧,故不使用字段 wrapper(与 toggle 一致)。
 */
@Component({
  selector: 'formly-shadcn-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, FormlyModule],
  template: `
    <label class="check-row">
      <input
        type="checkbox"
        class="check-input"
        [formControl]="formControl"
        [formlyAttributes]="field"
      />
      <span class="check-box" aria-hidden="true">
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
      @if (props.label) {
        <span class="check-label">
          {{ props.label }}
          @if (props.required && props.hideRequiredMarker !== true) {
            <span class="required-marker" aria-hidden="true">*</span>
          }
        </span>
      }
    </label>
  `,
  styleUrl: './shadcn-checkbox.type.scss',
})
export class ShadcnCheckboxType extends FieldType<FieldTypeConfig> {}

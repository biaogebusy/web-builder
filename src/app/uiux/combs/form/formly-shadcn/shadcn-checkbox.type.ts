import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';

/**
 * shadcn/ui-style checkbox, mapped from the built-in checkbox type (e.g. Drupal
 * boolean fields). A visually hidden native checkbox carries the state and
 * keyboard/focus behavior; the box and check are purely presentational. The label
 * sits inline to the right of the box, so no field wrapper is used (same as toggle).
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

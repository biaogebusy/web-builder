import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';

/**
 * shadcn/ui-style switch, mapped from the built-in toggle type.
 * A visually hidden native checkbox (role="switch") carries the state and
 * keyboard/focus behavior; the track and thumb are purely presentational.
 * The label sits inline to the right of the switch, so no field wrapper is used.
 */
@Component({
  selector: 'formly-shadcn-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, FormlyModule],
  template: `
    <label class="switch-row">
      <input
        type="checkbox"
        role="switch"
        class="switch-input"
        [formControl]="formControl"
        [formlyAttributes]="field"
      />
      <span class="switch-track" aria-hidden="true">
        <span class="switch-thumb"></span>
      </span>
      @if (props.label) {
        <span class="switch-label">{{ props.label }}</span>
      }
    </label>
  `,
  styleUrl: './shadcn-toggle.type.scss',
})
export class ShadcnToggleType extends FieldType<FieldTypeConfig> {}

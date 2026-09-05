import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FieldWrapper, FormlyModule } from '@ngx-formly/core';

/**
 * shadcn/ui-style field wrapper, replacing Material's form-field wrapper:
 * the label sits above the control and errors/descriptions render inline below
 * it (shadcn Form structure). The error paragraph id is `${id}-error`, which
 * field components use to bind aria-describedby.
 */
@Component({
  selector: 'formly-shadcn-form-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormlyModule],
  template: `
    @if (props.label && props.hideLabel !== true) {
      <label class="shad-label" [attr.for]="id">
        {{ props.label }}
        @if (props.required && props.hideRequiredMarker !== true) {
          <span class="required-marker" aria-hidden="true">*</span>
        }
      </label>
    }
    <ng-template #fieldComponent />
    @if (showError) {
      <p class="shad-error" role="alert" [attr.id]="id + '-error'">
        <formly-validation-message [field]="field" />
      </p>
    } @else if (props.description) {
      <p class="shad-hint">{{ props.description }}</p>
    }
  `,
  styleUrl: './shadcn-form-field.wrapper.scss',
})
export class ShadcnFormFieldWrapper extends FieldWrapper {}

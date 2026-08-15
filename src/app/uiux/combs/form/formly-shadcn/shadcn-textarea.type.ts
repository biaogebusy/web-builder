import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';

/** shadcn/ui-style multi-line text, mapped from the built-in textarea type. */
@Component({
  selector: 'formly-shadcn-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, FormlyModule],
  template: `
    <textarea
      class="shad-input shad-textarea"
      [class.error]="showError"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [attr.rows]="props.rows || 4"
      [attr.aria-invalid]="showError || null"
      [attr.aria-describedby]="showError ? id + '-error' : null"
    ></textarea>
  `,
})
export class ShadcnTextareaType extends FieldType<FieldTypeConfig> {}

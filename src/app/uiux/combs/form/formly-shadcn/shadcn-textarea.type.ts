import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';

/** shadcn/ui 风格多行文本,对应内置 textarea 类型。 */
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

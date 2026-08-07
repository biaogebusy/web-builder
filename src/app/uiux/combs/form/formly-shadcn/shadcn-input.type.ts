import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';

/** shadcn/ui 风格文本输入,对应内置 input / number / integer / string 类型。 */
@Component({
  selector: 'formly-shadcn-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, FormlyModule],
  template: `
    <input
      class="shad-input"
      [class.error]="showError"
      [type]="props.type || 'text'"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [attr.aria-invalid]="showError || null"
      [attr.aria-describedby]="showError ? id + '-error' : null"
    />
  `,
})
export class ShadcnInputType extends FieldType<FieldTypeConfig> {}

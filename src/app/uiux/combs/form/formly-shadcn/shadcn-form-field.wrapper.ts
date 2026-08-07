import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FieldWrapper, FormlyModule } from '@ngx-formly/core';

/**
 * shadcn/ui 风格字段 wrapper,替代 Material 的 form-field wrapper:
 * label 在控件上方、错误/描述内联显示在控件下方(shadcn Form 结构)。
 * 错误段落 id 为 `${id}-error`,字段组件用它绑定 aria-describedby。
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

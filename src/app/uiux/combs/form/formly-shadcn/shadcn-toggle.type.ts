import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';

/**
 * shadcn/ui 风格开关,对应内置 toggle 类型。
 * 视觉隐藏的原生 checkbox(role="switch")承载状态与键盘/焦点行为,
 * 轨道与滑块为纯展示;label 内联在开关右侧,故不使用字段 wrapper。
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

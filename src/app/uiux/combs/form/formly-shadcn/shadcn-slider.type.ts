import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';

/**
 * shadcn/ui-style slider, mapped from the custom slider type (MatSlider + number
 * input). Native <input type="range"> (RangeValueAccessor yields numbers) plus a
 * track fill, with the number input and unit suffix kept on the right; feature
 * parity with the original type (min/max/step/unit). Material's thumbLabel bubble
 * is not implemented (the shadcn Slider has no such interaction either).
 */
@Component({
  selector: 'formly-shadcn-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, FormlyModule],
  template: `
    <div class="slider-row">
      <div class="range-wrap">
        <span class="range-track" aria-hidden="true"></span>
        <span class="range-fill" [style.width.%]="percent()" aria-hidden="true"></span>
        <input
          type="range"
          class="range-input"
          [min]="props.min ?? 0"
          [max]="props.max ?? 100"
          [step]="props.step ?? 1"
          [formControl]="formControl"
          [formlyAttributes]="field"
        />
      </div>
      <div class="value">
        <input
          type="number"
          class="shad-input value-input"
          [min]="props.min ?? 0"
          [max]="props.max ?? 100"
          [formControl]="formControl"
          [attr.aria-label]="props.label"
        />
        @if (props.unit) {
          <span class="suffix">{{ props.unit }}</span>
        }
      </div>
    </div>
  `,
  styleUrl: './shadcn-slider.type.scss',
})
export class ShadcnSliderType extends FieldType<FieldTypeConfig> implements OnInit {
  private destroyRef = inject(DestroyRef);
  private value = signal(0);

  percent = computed(() => {
    const min = Number(this.props.min ?? 0);
    const max = Number(this.props.max ?? 100);
    if (max <= min) {
      return 0;
    }
    const clamped = Math.min(Math.max(this.value(), min), max);
    return ((clamped - min) / (max - min)) * 100;
  });

  ngOnInit(): void {
    this.value.set(Number(this.formControl.value) || 0);
    this.formControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => {
        // Matches the original slider type: string values are always written back as numbers
        if (typeof value === 'string' && value !== '') {
          this.formControl.patchValue(Number(value), { emitEvent: false });
        }
        this.value.set(Number(value) || 0);
      });
  }
}

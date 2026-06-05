import { Component, DestroyRef, OnInit, inject, ChangeDetectionStrategy, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlider, MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { FieldType } from '@ngx-formly/material/form-field';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'formly-field-mat-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  imports: [ReactiveFormsModule, MatSliderModule, MatInputModule, FormlyModule],
})
export class SliderComponent extends FieldType<FieldTypeConfig> implements OnInit {
  readonly slider = viewChild.required(MatSlider);
  private destroyRef = inject(DestroyRef);

  defaultOptions = {
    props: {
      hideFieldUnderline: true,
      floatLabel: 'always',
      thumbLabel: false,
    },
  };

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.formControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => {
        this.formControl.patchValue(Number(value), { emitEvent: false });
      });
  }
}

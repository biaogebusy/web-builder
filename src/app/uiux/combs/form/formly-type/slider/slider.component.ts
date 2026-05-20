import { Component, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlider, MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { FieldType } from '@ngx-formly/material/form-field';

@Component({
  selector: 'formly-field-mat-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  imports: [ReactiveFormsModule, MatSliderModule, MatInputModule, FormlyModule],
})
export class SliderComponent extends FieldType<FieldTypeConfig> implements OnInit {
  @ViewChild(MatSlider) slider!: MatSlider;

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
    this.formControl.valueChanges.subscribe(value => {
      this.formControl.patchValue(Number(value), { emitEvent: false });
    });
  }
}

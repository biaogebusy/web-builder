import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSlider } from '@angular/material/slider';
import { FieldTypeConfig } from '@ngx-formly/core';
import { FieldType } from '@ngx-formly/material/form-field';

@Component({
  selector: 'formly-field-mat-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent
  extends FieldType<FieldTypeConfig>
  implements OnInit
{
  @ViewChild(MatSlider) slider!: MatSlider;

  defaultOptions = {
    templateOptions: {
      hideFieldUnderline: true,
      floatLabel: 'always',
      thumbLabel: false,
    },
  };

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.formControl.valueChanges.subscribe((value) => {
      this.formControl.patchValue(value, { emitEvent: false });
    });
  }

  onContainerClick(event: MouseEvent): void {
    this.slider.focus();
    this.onContainerClick(event);
  }
}

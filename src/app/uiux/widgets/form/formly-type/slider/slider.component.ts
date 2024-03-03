import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSlider } from '@angular/material/slider';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent
  extends FieldType<FieldTypeConfig>
  implements OnInit
{
  @ViewChild(MatSlider) slider!: MatSlider;
  value: any;
  defaultOptions = {
    templateOptions: {
      hideFieldUnderline: true,
      floatLabel: 'always',
      thumbLabel: false,
    },
  };

  ngOnInit(): void {
    this.value = this.field.defaultValue;
  }

  onContainerClick(event: MouseEvent): void {
    this.slider.focus();
  }
}

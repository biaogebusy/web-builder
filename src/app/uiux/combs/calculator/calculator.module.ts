import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { ShareModule } from '@share/share.module';
import { DateRangeComponent } from '@uiux/widgets/form/formly-type/date-range/date-range.component';
import { MatSelectComponent } from '@uiux/widgets/form/formly-type/mat-select/mat-select.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { LotteryComponent } from './lottery/lottery.component';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatSliderModule } from '@ngx-formly/material/slider';
const components = [LotteryComponent];

@NgModule({
  declarations: [...components],
  imports: [
    ShareModule,
    WidgetsModule,
    MatSliderModule,
    ReactiveFormsModule,
    FormlyMaterialModule,
    FormlyMatSliderModule,
    FormlyModule.forRoot({
      types: [
        {
          name: 'mat-select',
          component: MatSelectComponent,
        },
        {
          name: 'date-range',
          component: DateRangeComponent,
        },
      ],
      validationMessages: [
        { name: 'required', message: '该字段必填' },
        {
          name: 'max',
          message: '不能超过最大值',
        },
        {
          name: 'min',
          message: '不能小于最小值',
        },
      ],
    }),
  ],
  exports: [...components],
})
export class CalculatorModule {}

import { Component } from '@angular/core';
import { FieldArrayType, FormlyModule } from '@ngx-formly/core';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';

@Component({
  selector: 'formly-repeat',
  template: `
    @for (field of field.fieldGroup; track field; let i = $index) {
      <div class="row">
        <formly-field class="w-full" [field]="field" />
        <div class="flex justify-center items-center">
          <app-btn
            (click)="remove(i)"
            [content]="{
              label: '删除',
              color: 'warn',
              icon: {
                svg: 'delete',
                inline: true,
              },
            }" />
        </div>
      </div>
    }
    <div class="mt-5">
      <app-btn
        (click)="add()"
        [content]="{
          mode: 'raised',
          label: '新增',
          color: 'primary',
          icon: {
            inline: true,
            svg: 'plus',
          },
        }" />
    </div>
  `,
  imports: [FormlyModule, BtnComponent],
})
export class RepeatTypeComponent extends FieldArrayType {}

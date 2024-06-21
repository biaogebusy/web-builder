import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'formly-repeat',
  template: `
    @for (field of field.fieldGroup; track field; let i = $index) {
      <div class="row">
        <formly-field class="w-full" [field]="field"></formly-field>
        <div class="flex justify-center items-center">
          <app-btn
            (click)="remove(i)"
          [content]="{
            label: '删除',
            color: 'warn',
            icon: {
              svg: 'delete',
              inline: true
            }
          }"
        ></app-btn>
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
            svg: 'plus'
          }
        }"
    ></app-btn>
    </div>
    `,
})
export class RepeatTypeComponent extends FieldArrayType {}

import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'formly-repeat',
  template: `
    <div *ngFor="let field of field.fieldGroup; let i = index" class="row">
      <formly-field class="width-100" [field]="field"></formly-field>
      <div fxLayoutAlign="center center">
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
    <div class="m-top-sm">
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

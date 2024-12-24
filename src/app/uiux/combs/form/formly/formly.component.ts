import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import type { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-formly',
  templateUrl: './formly.component.html',
  styleUrls: ['./formly.component.scss'],
})
export class FormlyComponent implements OnInit {
  @Input() content: any;
  @Input() fields: FormlyFieldConfig[];
  @Input() options: FormlyFormOptions = {};
  @Input() form: UntypedFormGroup = new UntypedFormGroup({});
  @Input() model: any = {};
  @Input() classes: string | object;

  @Output() modelChange: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {
    if (this.content) {
      Object.keys(this.content).forEach((key: string) => {
        const that: any = this;
        that[key] = this.content[key];
      });
    }
  }

  onModelChange(event: any): void {
    this.modelChange.emit(event);
  }
}

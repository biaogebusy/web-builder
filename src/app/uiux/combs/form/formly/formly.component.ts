import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import type { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { cloneDeep } from 'lodash-es';

@Component({
    selector: 'app-formly',
    templateUrl: './formly.component.html',
    styleUrls: ['./formly.component.scss'],
    standalone: false
})
export class FormlyComponent implements OnInit, AfterViewInit {
  @Input() content: any;
  @Input() fields: FormlyFieldConfig[];
  @Input() options: FormlyFormOptions = {};
  @Input() form: UntypedFormGroup = new UntypedFormGroup({});
  @Input() model: any = {};
  @Input() classes: string | object;

  @Output() modelChange: EventEmitter<any> = new EventEmitter();

  fieldsConfig = signal<FormlyFieldConfig[]>([]);
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.fieldsConfig.set(cloneDeep(this.fields));
  }

  onModelChange(event: any): void {
    this.modelChange.emit(event);
  }
}

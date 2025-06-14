import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  signal,
  output
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import type { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { cloneDeep } from 'lodash-es';

interface IFormly {
  fields?: FormlyFieldConfig[];
}

@Component({
  selector: 'app-formly',
  templateUrl: './formly.component.html',
  styleUrls: ['./formly.component.scss'],
  standalone: false,
})
export class FormlyComponent implements OnInit, AfterViewInit {
  @Input() content: IFormly;
  @Input() fields: FormlyFieldConfig[];
  @Input() options: FormlyFormOptions = {};
  @Input() form: UntypedFormGroup = new UntypedFormGroup({});
  @Input() model: any = {};
  @Input() classes: string | object;

  readonly modelChange = output<any>();

  fieldsConfig = signal<FormlyFieldConfig[]>([]);
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    let config: FormlyFieldConfig[] = [];
    const fields = this.content?.fields;
    config = fields ?? this.fields;
    this.fieldsConfig.set(cloneDeep(config));
  }

  onModelChange(event: any): void {
    this.modelChange.emit(event);
  }
}

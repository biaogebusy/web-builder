import {
  AfterViewInit,
  Component,
  signal,
  output,
  ChangeDetectionStrategy,
  input
} from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import type { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormlyModule } from '@ngx-formly/core';
import { cloneDeep } from 'lodash-es';

interface IFormly {
  fields?: FormlyFieldConfig[];
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-formly',
  templateUrl: './formly.component.html',
  styleUrls: ['./formly.component.scss'],
  imports: [ReactiveFormsModule, FormlyModule],
})
export class FormlyComponent implements AfterViewInit {
  readonly content = input<IFormly>();
  readonly fields = input<FormlyFieldConfig[]>();
  readonly options = input<FormlyFormOptions>({});
  readonly form = input<UntypedFormGroup>(new UntypedFormGroup({}));
  readonly model = input<any>({});
  readonly classes = input<string | object>();

  readonly modelChange = output<any>();

  fieldsConfig = signal<FormlyFieldConfig[]>([]);

  ngAfterViewInit(): void {
    let config: FormlyFieldConfig[] = [];
    const fields = this.content()?.fields;
    config = fields ?? this.fields();
    this.fieldsConfig.set(cloneDeep(config));
  }

  onModelChange(event: any): void {
    this.modelChange.emit(event);
  }
}

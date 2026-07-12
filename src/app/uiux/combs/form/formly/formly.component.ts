import {
  AfterViewInit,
  Component,
  signal,
  output,
  ChangeDetectionStrategy,
  input,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import type { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormlyModule } from '@ngx-formly/core';
import { cloneDeep } from 'lodash-es';
import { provideXinshiFormly } from '../formly-feature.config';

interface IFormly {
  fields?: FormlyFieldConfig[];
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-formly',
  templateUrl: './formly.component.html',
  styleUrls: ['./formly.component.scss'],
  providers: [provideXinshiFormly()],
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
  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit(): void {
    try {
      let config: FormlyFieldConfig[] = [];
      const fields = this.content()?.fields;
      config = fields ?? this.fields() ?? [];

      // Only initialize form fields on browser to avoid SSR validation errors
      if (isPlatformBrowser(this.platformId)) {
        this.fieldsConfig.set(cloneDeep(config));
      } else {
        // On server, set empty config to prevent undefined access errors
        this.fieldsConfig.set([]);
      }
    } catch (error) {
      console.error('Error initializing Formly fields:', error);
      this.fieldsConfig.set([]);
    }
  }

  onModelChange(event: any): void {
    this.modelChange.emit(event);
  }
}

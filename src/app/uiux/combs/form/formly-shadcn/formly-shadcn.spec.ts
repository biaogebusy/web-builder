import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { UntypedFormGroup } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormlyModule } from '@ngx-formly/core';
import type { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

import { provideCoreMocks } from '@core/testing/mocks';
import { provideXinshiFormly } from '../formly-feature.config';
import { FormlyComponent } from '../formly/formly.component';
import { shadcnFormOptions } from './formly-shadcn.config';

@Component({
  selector: 'app-shadcn-spec-host',
  imports: [FormlyModule],
  providers: [provideXinshiFormly()],
  template: '<formly-form [form]="form" [fields]="fields" [model]="model" [options]="options" />',
})
class ShadcnSpecHostComponent {
  form = new UntypedFormGroup({});
  model: Record<string, unknown> = {};
  fields: FormlyFieldConfig[] = [];
  options: FormlyFormOptions = shadcnFormOptions();
}

describe('formly shadcn theme', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShadcnSpecHostComponent, FormlyComponent, TranslateModule.forRoot()],
      providers: [provideRouter([]), ...provideCoreMocks()],
    }).compileComponents();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  const render = async (
    fields: FormlyFieldConfig[],
    options?: FormlyFormOptions,
    model?: Record<string, unknown>
  ) => {
    const fixture = TestBed.createComponent(ShadcnSpecHostComponent);
    fixture.componentInstance.fields = fields;
    if (options) {
      fixture.componentInstance.options = options;
    }
    if (model) {
      fixture.componentInstance.model = model;
    }
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture;
  };

  it('renders a shadcn input with associated label instead of mat-form-field', async () => {
    const fixture = await render([
      { key: 'title', type: 'input', props: { label: 'Title', required: true } },
    ]);
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('mat-form-field')).toBeNull();
    const input = el.querySelector<HTMLInputElement>('input.shad-input');
    const label = el.querySelector<HTMLLabelElement>('label.shad-label');
    expect(input).toBeTruthy();
    expect(label?.textContent).toContain('Title');
    expect(input?.id).toBeTruthy();
    expect(label?.getAttribute('for')).toBe(input?.id);
  });

  it('keeps material rendering when uiTheme is not shadcn', async () => {
    const fixture = await render(
      [{ key: 'title', type: 'input', props: { label: 'Title' } }],
      {}
    );
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('mat-form-field')).toBeTruthy();
    expect(el.querySelector('input.shad-input')).toBeNull();
  });

  it('renders a switch for toggle and syncs the model', async () => {
    const fixture = await render([
      { key: 'enabled', type: 'toggle', defaultValue: false, props: { label: 'Enabled' } },
    ]);
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('mat-slide-toggle')).toBeNull();
    const switchInput = el.querySelector<HTMLInputElement>('input[role="switch"]');
    expect(switchInput).toBeTruthy();

    switchInput?.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.model['enabled']).toBe(true);
  });

  it('renders a shadcn textarea', async () => {
    const fixture = await render([
      { key: 'summary', type: 'textarea', props: { label: 'Summary', rows: 3 } },
    ]);
    const textarea = fixture.nativeElement.querySelector('textarea.shad-textarea');

    expect(textarea).toBeTruthy();
    expect(textarea.getAttribute('rows')).toBe('3');
  });

  it('preserves number semantics when remapping the number type', async () => {
    const fixture = await render([{ key: 'count', type: 'number', props: { label: 'Count' } }]);
    const input = fixture.nativeElement.querySelector('input.shad-input');

    expect(input?.getAttribute('type')).toBe('number');
  });

  it('remaps nested fields inside repeat rows', async () => {
    const fixture = await render(
      [
        {
          key: 'items',
          type: 'repeat',
          props: { addText: 'Add' },
          fieldArray: { fieldGroup: [{ key: 'label', type: 'input', props: { label: 'Label' } }] },
        },
      ],
      undefined,
      { items: [{ label: 'first' }] }
    );
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('mat-form-field')).toBeNull();
    expect(el.querySelector<HTMLInputElement>('input.shad-input')?.value).toBe('first');
  });

  it('renders a native shadcn select and preselects the model value', async () => {
    const fixture = await render([
      {
        key: 'fullWidth',
        type: 'select',
        defaultValue: false,
        props: {
          label: 'Width',
          options: [
            { label: 'Full', value: true },
            { label: 'Boxed', value: false },
          ],
        },
      },
    ]);
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('mat-select')).toBeNull();
    const select = el.querySelector<HTMLSelectElement>('select.shad-select');
    expect(select).toBeTruthy();
    expect(select?.options.length).toBe(2);
    expect(select?.options[select.selectedIndex]?.textContent?.trim()).toBe('Boxed');
  });

  it('syncs the model when a native select option is chosen', async () => {
    const fixture = await render([
      {
        key: 'fullWidth',
        type: 'select',
        defaultValue: false,
        props: {
          label: 'Width',
          options: [
            { label: 'Full', value: true },
            { label: 'Boxed', value: false },
          ],
        },
      },
    ]);
    const select: HTMLSelectElement = fixture.nativeElement.querySelector('select.shad-select');

    select.selectedIndex = 0;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(fixture.componentInstance.model['fullWidth']).toBe(true);
  });

  it('keeps mat-select for multi-select fields in shadcn mode', async () => {
    const fixture = await render([
      {
        key: 'tags',
        type: 'select',
        props: {
          label: 'Tags',
          multiple: true,
          options: [
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
          ],
        },
      },
    ]);
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('select.shad-select')).toBeNull();
    expect(el.querySelector('mat-select')).toBeTruthy();
  });

  it('renders a native range slider and coerces the value to a number', async () => {
    const fixture = await render([
      {
        key: 'gap',
        type: 'slider',
        defaultValue: 4,
        props: { label: 'Gap', min: 0, max: 20, step: 1 },
      },
    ]);
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('mat-slider')).toBeNull();
    const range = el.querySelector<HTMLInputElement>('input[type="range"]');
    expect(range).toBeTruthy();
    expect(el.querySelector('input[type="number"].shad-input')).toBeTruthy();

    range!.value = '10';
    range!.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(fixture.componentInstance.model['gap']).toBe(10);
  });

  it('applies the shadcn theme to app-formly via content.uiTheme', async () => {
    const fixture = TestBed.createComponent(FormlyComponent);
    fixture.componentRef.setInput('content', {
      uiTheme: 'shadcn',
      fields: [{ key: 'title', type: 'input', props: { label: 'Title' } }],
    });
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('mat-form-field')).toBeNull();
    expect(el.querySelector('input.shad-input')).toBeTruthy();
  });

  it('shows the validation message below the control and wires aria-describedby', async () => {
    const fixture = await render([
      {
        key: 'name',
        type: 'input',
        props: { label: 'Name', required: true },
        validation: { show: true },
      },
    ]);
    const el: HTMLElement = fixture.nativeElement;

    const error = el.querySelector<HTMLElement>('.shad-error');
    const input = el.querySelector<HTMLInputElement>('input.shad-input');
    expect(error).toBeTruthy();
    expect(error?.textContent).toContain('BUILDER.FORM_VALIDATION.REQUIRED');
    expect(input?.getAttribute('aria-invalid')).toBe('true');
    expect(input?.getAttribute('aria-describedby')).toBe(error?.id);
  });
});

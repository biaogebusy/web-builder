import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import type { FormlyFieldConfig } from '@ngx-formly/core';

import { provideCoreMocks } from '@core/testing/mocks';
import { getComponentSetting } from '@modules/builder/factory/getComponentSetting';
import { FORM_IMPORTS } from '../form-imports';
import { FormlyComponent } from './formly.component';

const findField = (
  fields: FormlyFieldConfig[] | undefined,
  key: string
): FormlyFieldConfig | undefined => {
  for (const field of fields ?? []) {
    if (field.key === key) {
      return field;
    }
    const child = findField(field.fieldGroup, key);
    if (child) {
      return child;
    }
  }
  return undefined;
};

describe('FormlyComponent select rendering', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  const render = async (fields: FormlyFieldConfig[]) => {
    const fixture = TestBed.createComponent(FormlyComponent);
    fixture.componentRef.setInput('fields', fields);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture;
  };

  it('renders a select field with the default compareWith function', async () => {
    await TestBed.configureTestingModule({
      imports: [FormlyComponent, TranslateModule.forRoot()],
    }).compileComponents();

    const fixture = await render([
      {
        type: 'select',
        key: 'fullWidth',
        props: {
          label: 'X',
          options: [
            { label: 'a', value: true },
            { label: 'b', value: false },
          ],
        },
      },
    ]);

    const built = fixture.componentInstance.fieldsConfig()[0];
    expect(typeof built.props?.compareWith).toBe('function');
    expect(fixture.nativeElement.querySelectorAll('mat-select').length).toBe(1);
  });

  it('renders the component setting form built by getComponentSetting without errors', async () => {
    await TestBed.configureTestingModule({
      imports: [FormlyComponent],
      providers: [provideRouter([]), ...provideCoreMocks()],
    }).compileComponents();

    const fixture = await render(getComponentSetting({ type: 'hero-1v1' }, '0'));

    const fullWidth = findField(fixture.componentInstance.fieldsConfig(), 'fullWidth');
    expect(typeof fullWidth?.props?.compareWith).toBe('function');
    expect(fixture.nativeElement.querySelectorAll('mat-select').length).toBeGreaterThan(0);
  });

  // Regression: the parent injector imports FORM_IMPORTS / the formly forChild modules
  // (the real context of the builder drawer). Formly 7.1 core extensions hold the
  // FormlyConfig instance injected at creation time; if provideXinshiFormly additionally
  // provided a bare FormlyConfig/FormlyFormBuilder at component level, it would split
  // from the root singleton bound to the parent: types register on the component
  // instance while defaultOptions merge happens on the root instance, so the select
  // loses its default compareWith / form-field wrapper and throws.
  it('renders selects when a parent injector imports FORM_IMPORTS', async () => {
    await TestBed.configureTestingModule({
      imports: [FORM_IMPORTS, FormlyComponent],
      providers: [provideRouter([]), ...provideCoreMocks()],
    }).compileComponents();

    const fixture = await render(getComponentSetting({ type: 'hero-1v1' }, '0'));

    const fullWidth = findField(fixture.componentInstance.fieldsConfig(), 'fullWidth');
    expect(typeof fullWidth?.props?.compareWith).toBe('function');
    expect(fixture.nativeElement.querySelectorAll('mat-select').length).toBeGreaterThan(0);
  });
});

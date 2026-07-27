import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import type { FormlyFieldConfig } from '@ngx-formly/core';

import { provideCoreMocks } from '@core/testing/mocks';
import { getComponentSetting } from '@modules/builder/factory/getComponentSetting';
import { FormModule } from '../form.module';
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

  // 回归:父级注入器导入 FormModule / formly forChild 模块(builder 抽屉的真实上下文)。
  // formly 7.1 的 core 扩展持有创建时注入的 FormlyConfig 实例；若 provideXinshiFormly
  // 在组件级额外提供裸 FormlyConfig/FormlyFormBuilder，会与父级绑定的 root 单例分裂：
  // 类型注册在组件实例、defaultOptions 合并却发生在 root 实例，
  // 导致 select 丢失默认 compareWith / form-field wrapper 并抛错。
  it('renders selects when a parent injector imports FormModule', async () => {
    await TestBed.configureTestingModule({
      imports: [FormModule, FormlyComponent],
      providers: [provideRouter([]), ...provideCoreMocks()],
    }).compileComponents();

    const fixture = await render(getComponentSetting({ type: 'hero-1v1' }, '0'));

    const fullWidth = findField(fixture.componentInstance.fieldsConfig(), 'fullWidth');
    expect(typeof fullWidth?.props?.compareWith).toBe('function');
    expect(fixture.nativeElement.querySelectorAll('mat-select').length).toBeGreaterThan(0);
  });
});

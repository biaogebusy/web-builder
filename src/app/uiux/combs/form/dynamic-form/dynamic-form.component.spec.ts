import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, Validators } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { FormService } from '@core/service/form.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { createUtilitiesServiceMock } from '@core/testing/mocks';
import { provideUiuxMocks } from '@uiux/testing/mocks';
import { of, throwError } from 'rxjs';

import { DynamicFormComponent } from './dynamic-form.component';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;
  const formService = { submitWebForm: vi.fn(() => of({})) };
  const util = createUtilitiesServiceMock();

  beforeEach(async () => {
    vi.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [DynamicFormComponent],
      providers: [
        provideRouter([]),
        ...provideUiuxMocks(),
        { provide: FormService, useValue: formService },
        { provide: UtilitiesService, useValue: util },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormComponent);
    fixture.componentRef.setInput('content', { form: { id: 'contact_form' } });
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('marks the invalid form as touched instead of submitting', () => {
    component.form.addControl('email', new UntypedFormControl('', Validators.required));

    component.onSubmit();

    expect(component.form.get('email')?.touched).toBe(true);
    expect(formService.submitWebForm).not.toHaveBeenCalled();
  });

  it('submits the webform id with the form values and resets on success', () => {
    component.form.addControl('email', new UntypedFormControl('a@b.co'));
    const resetSpy = vi.spyOn(component.form, 'reset');

    component.onSubmit();

    expect(formService.submitWebForm).toHaveBeenCalledWith({
      webform_id: 'contact_form',
      email: 'a@b.co',
    });
    expect(util.openSnackbar).toHaveBeenCalledWith('成功提交！');
    expect(component.disabled()).toBe(false);
    expect(resetSpy).toHaveBeenCalled();
  });

  it('surfaces the backend message when the submission fails', () => {
    formService.submitWebForm.mockReturnValueOnce(
      throwError(() => ({ error: { message: '邮箱格式不正确' } }))
    );

    component.onSubmit();

    expect(util.openSnackbar).toHaveBeenCalledWith('邮箱格式不正确');
    expect(component.disabled()).toBe(false);
  });

  it('falls back to the generic failure hint without a backend message', () => {
    formService.submitWebForm.mockReturnValueOnce(throwError(() => ({ error: {} })));

    component.onSubmit();

    expect(util.openSnackbar).toHaveBeenCalledWith('提交失败，请联系管理员！');
  });
});

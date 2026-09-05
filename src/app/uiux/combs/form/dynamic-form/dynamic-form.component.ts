import {
  Component,
  DestroyRef,
  inject,
  signal,
  computed,
  ChangeDetectionStrategy,
  input,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IDynamicForm } from '@core/interface/combs/IDynamicForm';
import type { IBtn } from '@core/interface/widgets/IBtn';
import { FormService } from '@core/service/form.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';
import { DynamicComponentComponent } from '@uiux/widgets/builder/dynamic-component/dynamic-component.component';
import { FormlyComponent } from '../formly/formly.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  imports: [ReactiveFormsModule, FormlyComponent, BtnComponent, DynamicComponentComponent],
})
export class DynamicFormComponent {
  readonly content = input.required<IDynamicForm>();
  public form = new UntypedFormGroup({});
  public model: any = {};
  public disabled = signal<boolean>(false);
  public loading = signal<boolean>(false);
  private formService = inject(FormService);
  private util = inject(UtilitiesService);
  private translate = inject(TranslateService);
  private destroyRef = inject(DestroyRef);

  /**
   * Disabling has to reach the button content: `app-btn` binds it to the native
   * button, which then blocks the clicks that would submit the form twice.
   */
  readonly submitBtn = computed<IBtn>(() => ({
    ...this.content().action.submit,
    disabled: this.disabled(),
  }));


  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.disabled.set(true);
    const data = Object.assign({ webform_id: this.content().form.id }, this.form.value);
    this.formService
      .submitWebForm(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.disabled.set(false);
          this.util.openSnackbar(this.translate.instant('BUILDER.DYNAMIC_FORM.SUBMIT_SUCCESS'));
          this.form.reset();
        },
        error: error => {
          this.disabled.set(false);
          this.util.openSnackbar(
            error?.error?.message || this.translate.instant('BUILDER.DYNAMIC_FORM.SUBMIT_FAILED')
          );
          console.error(error.error);
        },
      });
  }
}

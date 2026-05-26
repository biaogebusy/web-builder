import { Component, DestroyRef, inject, signal, ChangeDetectionStrategy, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { IDynamicForm } from '@core/interface/combs/IDynamicForm';
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
  readonly content = input<IDynamicForm>();
  public form = new UntypedFormGroup({});
  public model: any = {};
  public disabled = signal<boolean>(false);
  public loading = signal<boolean>(false);
  private formService = inject(FormService);
  private util = inject(UtilitiesService);
  private destroyRef = inject(DestroyRef);


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
          this.util.openSnackbar('成功提交！');
          this.form.reset();
        },
        error: error => {
          this.disabled.set(false);
          this.util.openSnackbar(error?.error?.message || `提交失败，请联系管理员！`);
          console.log(error.error);
        },
      });
  }
}

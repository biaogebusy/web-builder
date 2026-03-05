import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { IDynamicForm } from '@core/interface/combs/IDynamicForm';
import { FormService } from '@core/service/form.service';
import { UtilitiesService } from '@core/service/utilities.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  standalone: false,
})
export class DynamicFormComponent implements OnInit {
  @Input() content: IDynamicForm;
  public form = new UntypedFormGroup({});
  public model: any = {};
  public disabled = signal<boolean>(false);
  public loading = signal<boolean>(false);
  private formService = inject(FormService);
  private util = inject(UtilitiesService);

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.disabled.set(true);
    const data = Object.assign({ webform_id: this.content.form.id }, this.form.value);
    this.formService.submitWebForm(data).subscribe({
      next: () => {
        this.disabled.set(false);
        this.util.openSnackbar('成功提交！');
        this.form.reset();
      },
      error: () => {
        this.disabled.set(false);
        this.util.openSnackbar(`提交失败，请联系管理员！`);
      },
    });
  }
}

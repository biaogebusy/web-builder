import { ChangeDetectorRef, Component, DestroyRef, inject, ChangeDetectionStrategy, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FormService } from '@core/service/form.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { ImgComponent } from '@uiux/widgets/img/img.component';
import { IconComponent } from '@uiux/widgets/icon/icon.component';
import { LinkComponent } from '@uiux/widgets/link/link.component';
import { SpinnerComponent } from '@uiux/widgets/spinner/spinner.component';
import { DynamicComponentComponent } from '@uiux/widgets/builder/dynamic-component/dynamic-component.component';
import { FormlyComponent } from '@uiux/combs/form/formly/formly.component';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-inverse',
  templateUrl: './inverse.component.html',
  styleUrls: ['./inverse.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    SafeHtmlPipe,
    ImgComponent,
    IconComponent,
    LinkComponent,
    SpinnerComponent,
    DynamicComponentComponent,
    FormlyComponent,
    MenuItemComponent,
  ],
  host: {
    ngSkipHydration: 'true',
  },
})
export class InverseComponent {
  readonly content = input<any>();
  public form: UntypedFormGroup = new UntypedFormGroup({});
  public submited = false;

  private cd = inject(ChangeDetectorRef);
  public formService = inject(FormService);
  private util = inject(UtilitiesService);
  private destroyRef = inject(DestroyRef);

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.submited = true;
    const data = this.formService.getwebFormData(
      this.content().footerNewsletter.params,
      this.form.value
    );
    this.formService
      .submitWebForm(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        () => {
          this.submited = false;
          this.util.openSnackbar('成功订阅！');
          this.cd.detectChanges();
        },
        error => {
          this.submited = false;
          this.util.openSnackbar(`Error: ${error.message}`);
        }
      );
  }
}

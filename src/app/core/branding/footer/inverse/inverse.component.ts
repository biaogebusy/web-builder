import { ChangeDetectorRef, Component, Input, inject } from '@angular/core';
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
  @Input() content: any;
  public form: UntypedFormGroup = new UntypedFormGroup({});
  public submited = false;

  private cd = inject(ChangeDetectorRef);
  public formService = inject(FormService);
  private util = inject(UtilitiesService);

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.submited = true;
    const data = this.formService.getwebFormData(
      this.content.footerNewsletter.params,
      this.form.value
    );
    this.formService.submitWebForm(data).subscribe(
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

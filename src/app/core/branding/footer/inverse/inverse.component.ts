import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { finalize, timeout } from 'rxjs/operators';
import { FormService } from '@core/service/form.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { ImgComponent } from '@uiux/widgets/img/img.component';
import { IconComponent } from '@uiux/widgets/icon/icon.component';
import { LinkComponent } from '@uiux/widgets/link/link.component';
import { SpinnerComponent } from '@uiux/widgets/spinner/spinner.component';
import { DynamicComponentComponent } from '@uiux/widgets/builder/dynamic-component/dynamic-component.component';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-inverse',
  templateUrl: './inverse.component.html',
  styleUrls: ['./inverse.component.scss'],
  imports: [
    MatButtonModule,
    SafeHtmlPipe,
    ImgComponent,
    IconComponent,
    LinkComponent,
    SpinnerComponent,
    DynamicComponentComponent,
    MenuItemComponent,
  ],
  host: {
    ngSkipHydration: 'true',
  },
})
export class InverseComponent {
  readonly content = input.required<any>();
  readonly submitting = signal(false);

  public formService = inject(FormService);
  private util = inject(UtilitiesService);
  private destroyRef = inject(DestroyRef);

  onSubmit(event: Event, input: HTMLInputElement, fieldKey: string): void {
    event.preventDefault();
    if (this.submitting() || !input.checkValidity()) {
      input.reportValidity();
      return;
    }
    this.submitting.set(true);
    const data = this.formService.getwebFormData(this.content().footerNewsletter.params, {
      [fieldKey || 'email']: input.value.trim(),
    });
    this.formService
      .submitWebForm(data)
      .pipe(
        timeout(10000),
        finalize(() => this.submitting.set(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: () => {
          input.value = '';
          this.util.openSnackbar('成功订阅！');
        },
        error: error => {
          this.util.openSnackbar(`Error: ${error.message}`);
        },
      });
  }
}

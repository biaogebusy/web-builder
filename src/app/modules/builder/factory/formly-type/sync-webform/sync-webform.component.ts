import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FieldType } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import { get } from 'lodash-es';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import type { IBtn } from '@core/interface/widgets/IBtn';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';
import { getComponentSetting } from '@modules/builder/factory/getComponentSetting';
import { WebformPickerService } from '@modules/builder/main/widget-picker/webform/webform-picker.service';
import { webformElementsToFormly } from '@modules/builder/main/widget-picker/webform/webform-to-formly';

/**
 * The "refresh fields from CMS" action of the dynamic-form settings tab.
 * Builder-only: registered from the layout-setting component providers, so it
 * never reaches the formly bundles that public pages load.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'formly-field-sync-webform',
  template: `
    <div class="sync-webform">
      <app-btn [content]="btn()" (click)="onSync()" />
    </div>
  `,
  imports: [BtnComponent],
})
export class SyncWebformComponent extends FieldType {
  private builder = inject(BuilderState);
  private picker = inject(WebformPickerService);
  private util = inject(UtilitiesService);
  private translate = inject(TranslateService);
  private destroyRef = inject(DestroyRef);

  public syncing = signal(false);

  readonly btn = computed<IBtn>(() => ({
    label: this.translate.instant(
      this.syncing() ? 'BUILDER.FACTORY.SYNC_WEBFORM_LOADING' : 'BUILDER.FACTORY.SYNC_WEBFORM_FIELDS'
    ),
    color: 'primary',
    mode: 'stroked',
    disabled: this.syncing(),
  }));

  /** Re-fetches the webform element tree and replaces the baked-in formly fields */
  onSync(): void {
    if (this.syncing()) {
      return;
    }
    const path = this.props['path'] as string;
    const live = path ? get(this.builder.currentPage?.body, path) : null;
    const webformId = live?.form?.id;
    if (!webformId) {
      this.util.openSnackbar(this.translate.instant('BUILDER.FACTORY.SYNC_WEBFORM_NO_ID'), 'ok');
      return;
    }
    this.syncing.set(true);
    this.picker
      .getFields(webformId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: elements => {
          this.syncing.set(false);
          const { fields, warnings } = webformElementsToFormly(elements);
          // Only the baked-in fields are replaced; submit button and class tweaks survive
          const content = { ...live, form: { ...live.form, fields } };
          this.builder.updatePageContentByPath(path, content);
          // The drawer still holds the pre-sync node, so a later model merge would
          // re-bake the old fields; re-open it from the refreshed page node instead.
          this.builder.showComponentSetting(content, getComponentSetting(content, path), path);
          const dropped = warnings.filter(warning => warning.reason === 'unsupported');
          if (dropped.length > 0) {
            this.util.openSnackbar(
              this.translate.instant('BUILDER.WIDGET_PICKER.WEBFORM_PARTIAL', {
                fields: dropped.map(warning => warning.key).join(', '),
              }),
              'ok'
            );
          }
        },
        error: () => {
          this.syncing.set(false);
          this.util.openSnackbar(
            this.translate.instant('BUILDER.FACTORY.SYNC_WEBFORM_FAILED'),
            'ok'
          );
        },
      });
  }
}

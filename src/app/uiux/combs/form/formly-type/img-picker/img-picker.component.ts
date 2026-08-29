import {
  Component,
  DestroyRef,
  EnvironmentInjector,
  OnInit,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IDialog } from '@core/interface/IDialog';
import { ManageService } from '@core/service/manage.service';
import { BuilderState } from '@core/state/BuilderState';
import { FieldType, FormlyModule } from '@ngx-formly/core';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-img-picker',
  templateUrl: './img-picker.component.html',
  styleUrls: ['./img-picker.component.scss'],
  imports: [MatButtonModule, MatIconModule, FormlyModule, BtnComponent],
})
export class ImgPickerComponent extends FieldType implements OnInit {
  time: Date;
  dialog = inject(MatDialog);
  builder = inject(BuilderState);
  manageService = inject(ManageService);
  /** Media source URL; resolved from the UUID form value on backfill, or set on library pick */
  public src = signal('');
  private destroyRef = inject(DestroyRef);
  // The media library dialog resolves route-level tokens (BUILDER_CONFIG / MEDIA_ASSETS)
  // through the injector MatDialog was resolved from. This component does not import
  // MatDialogModule, so in a subtree without it MatDialog is the root instance and the
  // content would be created under the root injector; pass this injector instead.
  private environmentInjector = inject(EnvironmentInjector);
  constructor() {
    super();
  }

  /** Button/card switch to the shadcn style under shadcn-themed forms (formState.uiTheme) */
  get isShadcn(): boolean {
    return this.options.formState?.uiTheme === 'shadcn';
  }

  ngOnInit(): void {
    this.initPreviewSrc();
    this.builder.selectedMedia$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ img, time }) => {
        if (this.time && this.time === time) {
          const { src, uuid } = img;
          this.src.set(src);
          this.dialog.closeAll();
          this.field.props = {
            ...this.field.props,
            ...img,
          };
          if (this.field.props.valueIsUUID) {
            this.formControl.patchValue(uuid);
          } else {
            this.formControl.patchValue(src);
          }
        }
      });
  }

  /**
   * With valueIsUUID the form value is a media UUID, not a URL, so a freshly
   * backfilled field has nothing renderable in the preview. Resolve the media
   * by UUID (include=field_media_image) and fall back to the raw value (a URL)
   * when it does not look like a UUID.
   */
  private initPreviewSrc(): void {
    const value = this.formControl.value;
    if (!value) {
      return;
    }
    if (!this.field.props?.valueIsUUID || !this.isUuid(value)) {
      this.src.set(value);
      return;
    }
    this.manageService
      .getMediaImage(value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: res => {
          const url = this.manageService.getUrlIncluded(res?.data ?? {}, res?.included ?? []);
          if (url) {
            this.src.set(url);
            // Mirror what a library pick leaves in props, so the meta block shows file name and alt
            this.field.props = {
              ...this.field.props,
              src: url,
              fileName: res?.data?.attributes?.name,
              alt: res?.data?.relationships?.field_media_image?.data?.meta?.alt,
            };
          }
        },
        // A failed lookup leaves the picker usable: the value stays, only the preview stays empty
        error: err => console.error('Failed to load media preview', err),
      });
  }

  private isUuid(value: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
  }

  openMedias(): void {
    this.time = new Date();
    const config: IDialog = {
      disableActions: true,
      inputData: {
        content: {
          type: 'manage-media',
          time: this.time,
          fullWidth: true,
        },
      },
    };
    this.dialog.open(DialogComponent, {
      width: '85vw',
      panelClass: this.manageService.mediaDialogClass,
      id: 'img-picker',
      data: config,
      injector: this.environmentInjector,
    });
  }

  remove(): void {
    this.formControl.patchValue('');
  }
}

import { buildMediaDialogConfig } from '@core/util/media-dialog';
import {
  Component,
  DestroyRef,
  EnvironmentInjector,
  Injector,
  effect,
  untracked,
  OnInit,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Subscription, catchError, map, of } from 'rxjs';
import { USER } from '@core/token/token-providers';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IDialog } from '@core/interface/IDialog';
import { ManageService } from '@core/service/manage.service';
import type { MediaSelectionPurpose } from '@core/interface/manage/IManage';
import { canSelectMedia } from '@core/util/media-selection.util';
import { BuilderState } from '@core/state/BuilderState';
import { TranslateService } from '@ngx-translate/core';
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
  private translate = inject(TranslateService);
  /** Media source URL; resolved from the UUID form value on backfill, or set on library pick */
  public src = signal('');
  private destroyRef = inject(DestroyRef);
  private injector = inject(Injector);
  private user = inject(USER);
  private preview?: Subscription;
  private previewUrl = '';
  // The media library dialog resolves route-level tokens (BUILDER_CONFIG)
  // through the injector MatDialog was resolved from. This component does not import
  // MatDialogModule, so in a subtree without it MatDialog is the root instance and the
  // content would be created under the root injector; pass this injector instead.
  private environmentInjector = inject(EnvironmentInjector);
  constructor() {
    super();
  }

  /** Button/card switch to the shadcn style under shadcn-themed forms (formState.uiTheme) */
  get isShadcn(): boolean {
    return this.options?.formState?.uiTheme === 'shadcn';
  }

  /** Entity-reference fields cannot store a vector bundle in an image-only relationship. */
  get mediaPurpose(): MediaSelectionPurpose {
    return this.props['mediaPurpose'] === 'raster-image' ? 'raster-image'
      : this.props['valueIsUUID'] ? 'image-media' : 'web-image';
  }

  ngOnInit(): void {
    effect(() => {
      this.user();
      untracked(() => this.initPreviewSrc());
    }, { injector: this.injector });
    this.formControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.initPreviewSrc());
    this.initPreviewSrc();
    this.destroyRef.onDestroy(() => this.clearPreview());
    this.builder.selectedMedia$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ img, time }) => {
        if (this.time && this.time === time && canSelectMedia(img, this.mediaPurpose)) {
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

  private clearPreview(): void {
    this.preview?.unsubscribe();
    if (this.previewUrl) URL.revokeObjectURL(this.previewUrl);
    this.previewUrl = '';
    this.src.set('');
  }

  /**
   * With valueIsUUID the form value is a media UUID, not a URL, so a freshly
   * backfilled field has nothing renderable in the preview. Resolve the media
   * through the public display projection and fall back to the raw value (a URL)
   * when it does not look like a UUID.
   */
  private initPreviewSrc(): void {
    this.clearPreview();
    const value = this.formControl.value;
    if (!value) {
      return;
    }
    if (!this.field.props?.valueIsUUID || !this.isUuid(value)) {
      this.src.set(value);
      return;
    }
    this.preview = this.manageService
      .getMediaImage(value)
      .pipe(
        catchError(() => this.manageService.getMediaFile(value).pipe(map(blob => {
          if (!blob.type.startsWith('image/')) {
            return { src: '', alt: '' };
          }
          this.previewUrl = URL.createObjectURL(blob);
          return { src: this.previewUrl, alt: '' };
        }), catchError(() => of({ src: '', alt: '' })))),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: res => {
          const url = res.src;
          if (url) {
            this.src.set(url);
            // Mirror what a library pick leaves in props, so the meta block shows file name and alt
            this.field.props = {
              ...this.field.props,
              src: url,
              alt: res.alt,
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

    this.dialog.open(
      DialogComponent,
      buildMediaDialogConfig(
        { purpose: this.mediaPurpose, time: this.time },
        {
          width: '85vw',
          panelClass: this.manageService.mediaDialogClass,
          id: 'img-picker',
          injector: this.environmentInjector,
        }
      )
    );
  }

  /** Clearing the reference is destructive for the saved content, so confirm first */
  remove(): void {
    const config: IDialog = {
      title: this.translate.instant('BUILDER.FACTORY.IMG_REMOVE_TITLE'),
      noLabel: this.translate.instant('BUILDER.COMMON.CANCEL'),
      yesLabel: this.translate.instant('BUILDER.COMMON.CONFIRM'),
      inputData: {
        content: {
          type: 'text',
          fullWidth: true,
          body: this.translate.instant('BUILDER.FACTORY.IMG_REMOVE_BODY'),
        },
      },
    };
    this.dialog
      .open(DialogComponent, { width: '340px', data: config })
      .afterClosed()
      .subscribe(confirmed => {
        if (confirmed) {
          this.formControl.patchValue('');
        }
      });
  }
}

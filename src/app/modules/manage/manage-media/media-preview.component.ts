import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import type { IManageImg } from '@core/interface/manage/IManage';
import { MediaLibraryService } from '@core/service/media-library.service';
import { USER } from '@core/token/token-providers';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';
import { TranslateModule } from '@ngx-translate/core';

/** Fetches protected bytes through HttpClient and releases them when the preview closes. */
@Component({
  selector: 'app-media-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatDialogModule, BtnComponent, TranslateModule],
  template: `
    <h2 mat-dialog-title>{{ media.title }}</h2>
    <mat-dialog-content>
      <p>{{ media.mimeType }} · {{ media.size }} B</p>
      @if (url(); as source) {
        @if (media.kind === 'image' || media.kind === 'vector') {
          <img [src]="source" [alt]="media.title" class="max-w-full max-h-[60vh] object-contain" />
        } @else if (media.kind === 'audio') {
          <audio controls [src]="source" [attr.aria-label]="media.title"></audio>
        } @else if (media.kind === 'video') {
          <video controls [src]="source" [attr.aria-label]="media.title" class="max-w-full max-h-[60vh]">
          </video>
        }
      }
      @if (error()) { <p role="alert">{{ 'MANAGE.MEDIA.LOAD_FAILED' | translate }}</p> }
    </mat-dialog-content>
    <mat-dialog-actions>
      <app-btn (btnClick)="download()" [content]="{
        label: 'MANAGE.MEDIA.DOWNLOAD' | translate, disabled: loading(),
      }" />
      <app-btn (btnClick)="close()" [content]="{ label: 'MANAGE.MEDIA.CLOSE' | translate }" />
    </mat-dialog-actions>
  `,
})
export class MediaPreviewComponent {
  readonly media = inject<IManageImg>(MAT_DIALOG_DATA);
  private library = inject(MediaLibraryService);
  private dialog = inject(MatDialogRef<MediaPreviewComponent>);
  private destroyRef = inject(DestroyRef);
  private user = inject(USER);
  readonly url = signal('');
  readonly error = signal(false);
  readonly loading = signal(false);

  constructor() {
    const owner = this.user();
    effect(() => { if (this.user() !== owner) this.close(); });
    this.destroyRef.onDestroy(() => { if (this.url()) URL.revokeObjectURL(this.url()); });
    if (['image', 'vector', 'audio', 'video'].includes(this.media.kind || '')) this.load(false);
  }

  /** Downloads the authorized source without exposing credentials in its URL. */
  download(): void {
    if (this.url()) this.save();
    else this.load(true);
  }

  /** Closes the preview and destroys its binary URL. */
  close(): void { this.dialog.close(); }

  private load(download: boolean): void {
    this.loading.set(true);
    this.error.set(false);
    this.library.file(this.media.uuid).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: blob => {
        this.url.set(URL.createObjectURL(blob));
        this.loading.set(false);
        if (download) this.save();
      },
      error: () => { this.error.set(true); this.loading.set(false); },
    });
  }

  private save(): void {
    const link = document.createElement('a');
    link.href = this.url();
    link.download = this.media.filename || this.media.title;
    link.click();
  }
}

import { ChangeDetectionStrategy, Component, DestroyRef, computed, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgOptimizedImage } from '@angular/common';
import type { IManageImg, MediaTypeCapability } from '@core/interface/manage/IManage';
import { MediaLibraryService } from '@core/service/media-library.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { readFileAsArrayBuffer } from '@core/util/file.util';
import { USER } from '@core/token/token-providers';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';
import { IconComponent } from '@uiux/widgets/icon/icon.component';
import { SpinnerComponent } from '@uiux/widgets/spinner/spinner.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgPipesModule } from 'ngx-pipes';
import { NgxFileDropModule, NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { lastValueFrom, Subject, takeUntil } from 'rxjs';

interface UploadRow {
  id: number;
  entry: NgxFileDropEntry;
  status: 'pending' | 'uploading' | 'complete' | 'failed';
  media?: IManageImg;
  error?: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-upload-media',
  templateUrl: './upload-media.component.html',
  styleUrl: './upload-media.component.scss',
  imports: [NgxFileDropModule, NgPipesModule, NgOptimizedImage, IconComponent,
    BtnComponent, SpinnerComponent, TranslateModule],
})
export class UploadMediaComponent {
  private readonly user = inject(USER);
  private readonly util = inject(UtilitiesService);
  private readonly library = inject(MediaLibraryService);
  readonly types = signal<MediaTypeCapability[]>([]);
  readonly accept = computed(() => this.types().flatMap(type => type.extensions.map(ext => `.${ext}`)).join(','));
  readonly capabilityError = signal(false);
  private readonly destroyRef = inject(DestroyRef);
  private readonly translate = inject(TranslateService);
  private nextId = 0;
  private queue = Promise.resolve();
  private accountVersion = 0;
  private accountChanged = new Subject<void>();
  private observedOwner = this.ownerKey();
  /** Stable rows keep failed uploads aligned with their file names and results. */
  readonly uploads = signal<UploadRow[]>([]);
  /** Completed files remain available to callers independently of failed rows. */
  readonly files = computed(() => this.uploads().flatMap(row => row.media ? [row.media] : []));

  constructor() {
    effect(onCleanup => {
      const owner = this.ownerKey();
      this.types.set([]);
      this.capabilityError.set(false);
      if (owner) {
        const subscription = this.library.capabilities().subscribe({
          next: value => this.types.set(value.types.filter(type => type.canUpload)),
          error: () => this.capabilityError.set(true),
        });
        onCleanup(() => subscription.unsubscribe());
      }
      if (owner !== this.observedOwner) {
        this.observedOwner = owner;
        this.accountVersion++;
        this.accountChanged.next();
        this.queue = Promise.resolve();
        this.uploads.set([]);
      }
    });
  }

  private ownerKey(): string | null {
    const user = this.user();
    return typeof user === 'boolean' ? null : user.current_user?.uid || user.id;
  }

  private message(key: string): string {
    return this.translate.instant(`MANAGE.MEDIA.${key}`);
  }

  /** Serializes batches without replaying writes when a request fails. */
  dropped(entries: NgxFileDropEntry[]): Promise<void> {
    const owner = this.ownerKey();
    if (!owner) {
      this.util.openSnackbar(this.message('UPLOAD_LOGIN'), 'ok');
      return Promise.resolve();
    }
    const accountVersion = this.accountVersion;
    const rows: UploadRow[] = entries.map(entry => ({ id: ++this.nextId, entry, status: 'pending' }));
    this.uploads.update(current => [...current, ...rows]);
    const isCurrent = () => !this.destroyRef.destroyed && this.ownerKey() === owner &&
      this.accountVersion === accountVersion;
    this.queue = this.queue.then(async () => {
      for (const row of rows) {
        if (!isCurrent()) return;
        if (!row.entry.fileEntry.isFile) {
          this.updateRow(row.id, { status: 'failed', error: this.message('UPLOAD_DIRECTORY') });
          continue;
        }
        this.updateRow(row.id, { status: 'uploading' });
        try {
          // Native entries accept an error callback; ngx-file-drop omits it from its declaration.
          const entry = row.entry.fileEntry as FileSystemFileEntry & {
            file(success: (file: File) => void, failure: (error: DOMException) => void): void;
          };
          const file = await new Promise<File>((resolve, reject) => entry.file(resolve, reject));
          if (!isCurrent()) return;
          const extension = file.name.split('.').pop()?.toLowerCase() || '';
          const type = this.types().find(type => type.extensions.includes(extension));
          if (!type || file.size > type.maxBytes) {
            this.updateRow(row.id, { status: 'failed', error: this.message('UPLOAD_FORMAT') });
            continue;
          }
          const data = await readFileAsArrayBuffer(file);
          if (!isCurrent()) return;
          const media = await lastValueFrom(this.library.upload(type.bundle, file.name, data)
            .pipe(takeUntil(this.accountChanged), takeUntilDestroyed(this.destroyRef)));
          if (isCurrent()) this.updateRow(row.id, { status: 'complete', media });
        } catch {
          if (isCurrent()) {
            this.updateRow(row.id, { status: 'failed', error: this.message('UPLOAD_FAILED') });
          }
        }
      }
    });
    return this.queue;
  }

  private updateRow(id: number, patch: Partial<UploadRow>): void {
    this.uploads.update(rows => rows.map(row => row.id === id ? { ...row, ...patch } : row));
  }

  /** Copies only the URL belonging to the completed row. */
  onCopy(url: string): void {
    this.util.copy(url);
    this.util.openSnackbar(this.message('PATH_COPIED'), 'ok');
  }
}

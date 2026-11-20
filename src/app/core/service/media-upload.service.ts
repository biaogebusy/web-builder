import { Injectable, Injector, inject } from '@angular/core';
import type {
  IMediaAttr, IMediaUploadResult,
} from '@core/interface/manage/IManage';
import { USER } from '@core/token/token-providers';
import { TranslateService } from '@ngx-translate/core';
import { Observable, defer } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { MediaLibraryService } from './media-library.service';
import { ApiService } from './api.service';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root',
})
export class MediaUploadService extends ApiService {
  private user = inject(USER);
  private util = inject(UtilitiesService);
  private injector = inject(Injector);

  private library = inject(MediaLibraryService);

  /** Uploads a web image and suppresses results belonging to a stale consumer context. */
  uploadImage(
    fileName: string,
    imageData: ArrayBuffer,
    isCurrent: () => boolean = () => true
  ): Observable<IMediaUploadResult> {
    const account = this.user();
    return defer(() => {
      if (!isCurrent() || this.user() !== account) throw new Error('Media upload context changed');
      const bundle = /\.svg$/i.test(fileName) ? 'vector' : 'image';
      return this.library.upload(bundle, fileName, imageData);
    }).pipe(map(media => {
      if (!isCurrent() || this.user() !== account) throw new Error('Media upload context changed');
      // URL consumers cannot embed an authenticated download route in published content.
      if (media.private) throw new Error('A public image source is required');
      if (!media.uuid || !media.fileId || media.uuid === media.fileId || !media.source) {
        throw new Error('Invalid completed media response');
      }
      return {
        uuid: media.uuid, mediaId: media.uuid, fileId: media.fileId,
        filename: media.filename || fileName, filemime: media.mimeType || '',
        filesize: media.size || 0, uri: { url: media.source, value: '' },
      };
    }));
  }

  /** Pick a local image and upload it; on success hand the image URL to the insert callback (editor-implementation-agnostic) */
  pickAndUploadImage(
    insert: (url: string) => void,
    uploadImage: (fileName: string, imageData: any) => Observable<IMediaAttr> = (fileName, data) =>
      this.uploadImage(fileName, data)
  ): void {
    // Lazily get TranslateService: only the browser interaction path needs it, avoiding a hard dependency at service construction
    const translate = this.injector.get(TranslateService);
    const account = this.user();
    if (!account) {
      this.util.openSnackbar(translate.instant('BUILDER.FORM_EDITOR.IMAGE_LOGIN_REQUIRED'), 'ok');
      return;
    }
    const Imageinput: any = document.createElement('input');
    Imageinput.setAttribute('type', 'file');
    Imageinput.setAttribute('accept', 'image/png,image/gif,image/jpeg,image/webp,image/svg+xml');
    if (Imageinput.files) {
      Imageinput.addEventListener('change', () => {
        const file = Imageinput.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            if (this.user() !== account) return;
            const data = e.target.result;
            // Upload time is invisible to the user, so show a persistent in-progress hint;
            // dismiss it on success and show a retry hint on failure
            this.util.openSnackbar(translate.instant('BUILDER.FORM_EDITOR.IMAGE_UPLOADING'), '', {
              duration: 0,
            });
            uploadImage(file.name, data)
              .pipe(take(1))
              .subscribe({
                next: (img: IMediaAttr) => {
                  this.util.dismissSnackbar();
                  if (this.user() === account) insert(img.uri.url);
                },
                error: () =>
                  this.util.openSnackbar(
                    translate.instant('BUILDER.FORM_EDITOR.IMAGE_UPLOAD_FAILED'),
                    'ok'
                  ),
              });
          };
          reader.readAsArrayBuffer(file);
        }
      });
      Imageinput.click();
    }
  }
}

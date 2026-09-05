import { HttpHeaders } from '@angular/common/http';
import { Injectable, Injector, inject } from '@angular/core';
import type { IMediaAttr } from '@core/interface/manage/IManage';
import { USER } from '@core/token/token-providers';
import { TranslateService } from '@ngx-translate/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { ApiService } from './api.service';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root',
})
export class MediaUploadService extends ApiService {
  private user = inject(USER);
  private util = inject(UtilitiesService);
  private injector = inject(Injector);

  uploadImage(
    fileName: string,
    imageData: any,
    createMediaImage: (data: any) => Observable<void> = data => this.createMediaImage(data)
  ): Observable<IMediaAttr> {
    return this.http
      .post('/api/v1/media/image/field_media_image', imageData, {
        headers: new HttpHeaders({
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/octet-stream',
          'Content-Disposition': `file; filename="${encodeURIComponent(fileName)}"`,
        }),
      })
      .pipe(
        switchMap((res: any) => {
          const {
            data: { id, attributes },
          } = res;

          return createMediaImage(res.data).pipe(
            map(() => ({ ...attributes, uuid: id }) as IMediaAttr)
          );
        }),
        catchError(error => {
          console.error('Upload image failed:', error);
          return throwError(() => error);
        })
      );
  }

  createMediaImage(data: any): Observable<void> {
    const {
      id,
      attributes: { filename },
    } = data;
    const mediaData = {
      data: {
        type: 'media--image',
        attributes: { name: filename },
        relationships: {
          field_media_image: {
            data: { type: 'file--file', id },
          },
        },
      },
    };

    return this.http.post(`/api/v1/media/image`, mediaData, this.optionsWithBearerToken()).pipe(
      map(() => void 0),
      catchError(error => {
        console.error('Create media image failed:', error);
        return throwError(() => error);
      })
    );
  }

  /** Pick a local image and upload it; on success hand the image URL to the insert callback (editor-implementation-agnostic) */
  pickAndUploadImage(
    insert: (url: string) => void,
    uploadImage: (fileName: string, imageData: any) => Observable<IMediaAttr> = (fileName, data) =>
      this.uploadImage(fileName, data)
  ): void {
    // Lazily get TranslateService: only the browser interaction path needs it, avoiding a hard dependency at service construction
    const translate = this.injector.get(TranslateService);
    if (!this.user()) {
      this.util.openSnackbar(translate.instant('BUILDER.FORM_EDITOR.IMAGE_LOGIN_REQUIRED'), 'ok');
      return;
    }
    const Imageinput: any = document.createElement('input');
    Imageinput.setAttribute('type', 'file');
    Imageinput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
    if (Imageinput.files) {
      Imageinput.addEventListener('change', () => {
        const file = Imageinput.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
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
                  insert(img.uri.url);
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

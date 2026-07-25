import { HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { IMediaAttr } from '@core/interface/manage/IManage';
import { USER } from '@core/token/token-providers';
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

  uploadImage(
    fileName: string,
    imageData: any,
    createMediaImage: (data: any) => Observable<void> = data => this.createMediaImage(data)
  ): Observable<IMediaAttr> {
    return this.http
      .post('/api/v1/media/image/field_media_image', imageData, {
        headers: new HttpHeaders({
          Accept: 'application/vnd.api+json',
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

  imageHandler(
    editor: any,
    uploadImage: (fileName: string, imageData: any) => Observable<IMediaAttr> = (fileName, data) =>
      this.uploadImage(fileName, data)
  ): void {
    if (!this.user()) {
      this.util.openSnackbar('请登录后上传图片！', 'ok');
      return;
    }
    const Imageinput: any = document.createElement('input');
    Imageinput.setAttribute('type', 'file');
    Imageinput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
    Imageinput.classList.add('ql-image');
    if (Imageinput.files) {
      Imageinput.addEventListener('change', () => {
        const file = Imageinput.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            const data = e.target.result;
            uploadImage(file.name, data)
              .pipe(take(1))
              .subscribe((img: IMediaAttr) => {
                const range = editor.getSelection(true);
                editor.insertEmbed(range.index, 'image', img.uri.url);
              });
          };
          reader.readAsArrayBuffer(file);
        }
      });
      Imageinput.click();
    }
  }
}

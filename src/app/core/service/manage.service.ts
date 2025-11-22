import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { USER } from '@core/token/token-providers';
import type { IUser } from '@core/interface/IUser';
import { UtilitiesService } from './utilities.service';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';

@Injectable({
  providedIn: 'root',
})
export class ManageService extends ApiService {
  private user$ = inject<Observable<IUser>>(USER);

  private http = inject(HttpClient);
  private util = inject(UtilitiesService);
  public mediaDialogClass = ['close-outside', 'close-icon-white', 'manage-media-dialog'];
  private user: IUser;

  constructor() {
    super();
    this.user$.subscribe(user => {
      this.user = user;
    });
  }

  getBlock(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/api/v1/block_content_type/block_content_type`,
      this.optionsWithCookieAndToken(this.user.csrf_token)
    );
  }

  deleteMedia(uuid: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/api/v1/media/image/${uuid}`,
      this.optionsWithCookieAndToken(this.user.csrf_token)
    );
  }

  getUrlIncluded(item: any, included: any[]): string {
    const id = item.relationships.field_media_image.data.id;
    const obj = included.find(media => media.id === id);

    return obj.attributes.uri.url;
  }

  handlerJsonApiParams(value: any): { type: string; params: string } {
    const apiParams = new DrupalJsonApiParams();
    apiParams.addCustomParam({ noCache: true });
    const { key, type, limit, filter, sort } = value;

    if (limit !== undefined) {
      apiParams.addPageLimit(limit);
    }

    if (filter !== undefined) {
      apiParams.addFilter('status', filter);
    }

    if (sort !== undefined) {
      const { direction } = sort;
      apiParams.addSort('created', direction);
    }

    // 所有文件
    if (type.includes('file')) {
      if (key) {
        apiParams.addFilter('filename', key, 'CONTAINS');
      }
    }

    // 图片库
    if (type.includes('image')) {
      apiParams.addFields('file--file', ['uri']);
      apiParams.addInclude(['field_media_image']);
      if (key) {
        apiParams.addFilter('name', key, 'CONTAINS');
      }
    }

    // 文档库 or 视频库
    if (type.includes('document') || type.includes('video')) {
      this.util.openSnackbar('文档库和视频库功能未完善！', 'Ok');
    }
    return {
      type,
      params: apiParams.getQueryString({ encode: false }),
    };
  }

  readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        const result = e.target?.result;
        if (result) {
          resolve(result as ArrayBuffer);
        } else {
          reject(false);
        }
      };
      reader.onerror = e => reject(e);
      reader.readAsArrayBuffer(file);
    });
  }
}

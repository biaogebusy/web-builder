import { Inject, Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { API_URL, USER } from '@core/token/token-providers';
import type { IUser } from '@core/interface/IUser';
import { UtilitiesService } from './utilities.service';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';

@Injectable({
  providedIn: 'root',
})
export class ManageService extends ApiService {
  http = inject(HttpClient);
  util = inject(UtilitiesService);
  mediaDialogClass = [
    'close-outside',
    'close-icon-white',
    'manage-media-dialog',
  ];
  user: IUser;
  constructor(
    @Inject(API_URL) public apiBaseUrl: string,
    @Inject(USER) private user$: Observable<IUser>,
  ) {
    super(apiBaseUrl);
    this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  getBlock(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/api/v1/block_content_type/block_content_type`,
      this.optionsWithCookieAndToken(this.user.csrf_token),
    );
  }

  deleteMedia(uuid: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/api/v1/media/image/${uuid}`,
      this.optionsWithCookieAndToken(this.user.csrf_token),
    );
  }

  getFeatureBox(item: any, included: any[]): any {
    const iconPath = '/assets/icons';
    const widget = {
      id: item.id,
      type: 'feature-box',
      width: '20',
      fullIcon: 'fullscreen',
      copyIcon: 'content-copy',
      ratios: 'media-4-3',
      mode: 'float',
      hoverIcon: true,
    };
    let url = '';
    let fileName = '';

    if (!included) {
      url = item.attributes.uri.url;
      fileName = item.attributes.filename;
    }
    // media image
    if (included) {
      fileName = item.attributes.name;
      url = this.getUrlIncluded(item, included);
    }
    const type = this.util.getFileType(url);
    if (type === 'picture') {
      return {
        ...widget,
        img: {
          classes: 'object-fit',
          src: url,
          alt: fileName,
        },
      };
    } else {
      return {
        ...widget,
        openIcon: 'file_download',
        link: url,
        img: {
          classes: 'object-fill p-x-lg p-y-lg',
          src:
            type === 'pdf'
              ? `${iconPath}/file-pdf.svg`
              : type === 'excel'
                ? `${iconPath}/file-excel.svg`
                : `${iconPath}/file-word.svg`,
          alt: fileName,
        },
      };
    }
  }

  getUrlIncluded(item: any, included: any[]): string {
    const id = item.relationships.field_media_image.data.id;
    const obj = included.find((media) => media.id === id);

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
}

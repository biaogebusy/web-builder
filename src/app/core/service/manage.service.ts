import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { API_URL, USER } from '@core/token/token-providers';
import type { IUser } from '@core/interface/IUser';
import { UtilitiesService } from './utilities.service';
import { IFeatureBox } from '@core/interface/widgets/IFeatureBox';
import { IManageAssets } from '@core/interface/manage/IManage';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';

@Injectable({
  providedIn: 'root',
})
export class ManageService extends ApiService {
  constructor(
    public http: HttpClient,
    private util: UtilitiesService,
    @Inject(API_URL) public apiBaseUrl: string,
    @Inject(USER) private user: IUser
  ) {
    super(apiBaseUrl);
  }

  getBlock(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/api/v1/block_content_type/block_content_type`,
      this.optionsWithCookieAndToken(this.user.csrf_token)
    );
  }

  getFilesToFeatureBox(res: any): IManageAssets {
    let elements;
    const { data, links, included } = res;
    elements = data.map((item: any) => this.getFeatureBox(item, included));

    return {
      links,
      elements,
    };
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
    // file
    const {
      uri: { url },
      filename,
    } = item.attributes;

    const type = this.util.getFileType(url);
    if (type === 'picture') {
      return {
        ...widget,
        img: {
          classes: 'object-fit',
          src: url,
          alt: filename,
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
          alt: filename,
        },
      };
    }
  }

  handlerJsonApiParams(value: any): { type: string; params: string } {
    const apiParams = new DrupalJsonApiParams();
    const { type, limit, filter, sort } = value;

    if (limit !== undefined) {
      apiParams.addPageLimit(limit);
    }

    if (filter !== undefined) {
      apiParams.addFilter('status', filter);
    }

    if (sort !== undefined) {
      const { field, direction } = sort;
      apiParams.addSort(field, direction);
    }

    // 图片库
    if (type.includes('image')) {
      apiParams.addFields('file--file', ['uri']);
      apiParams.addInclude(['field_media_image']);
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

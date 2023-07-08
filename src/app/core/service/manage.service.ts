import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { API_URL, USER } from '@core/token/token-providers';
import type { IUser } from '@core/interface/IUser';
import { UtilitiesService } from './utilities.service';
import { IFeatureBox } from '@core/interface/widgets/IFeatureBox';
import { IManageAssets } from '@core/interface/manage/IManage';

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
    let content: any;
    const { data, links } = res;
    const iconPath = '/assets/icons';
    content = {
      links,
      elements: data.map((item: any) => {
        const attr = item.attributes;
        const type = this.util.getFileType(attr.uri.url);
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
        if (type === 'picture') {
          return {
            ...widget,
            img: {
              classes: 'object-fit',
              src: attr.uri.url,
              alt: attr.filename,
            },
          };
        } else {
          return {
            ...widget,
            openIcon: 'file_download',
            link: attr.uri.url,
            img: {
              classes: 'object-fill p-x-lg p-y-lg',
              src:
                type === 'pdf'
                  ? `${iconPath}/file-pdf.svg`
                  : type === 'excel'
                  ? `${iconPath}/file-excel.svg`
                  : `${iconPath}/file-word.svg`,
              alt: attr.filename,
            },
          };
        }
      }),
    };

    return content;
  }
}

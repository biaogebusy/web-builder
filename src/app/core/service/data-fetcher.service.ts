import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, concatMap, delay, from, lastValueFrom, map, of } from 'rxjs';
import { ApiService } from './api.service';
import { NodeService } from './node.service';
import { USER } from '@core/token/token-providers';
import { IUser } from '@core/interface/IUser';
import { SubmissionItem } from '@core/interface/node/IDrupal';
import { BuilderService } from './builder.service';
import { IPage } from '@core/interface/IAppConfig';

@Injectable({
  providedIn: 'root',
})
export class DataFetcherService extends ApiService {
  private nodeService = inject(NodeService);
  private builderService = inject(BuilderService);
  private user$ = inject<Observable<IUser>>(USER);
  private http = inject(HttpClient);
  private user: IUser;
  private readonly defaultDelay = 800;

  constructor() {
    super();
    this.user$.subscribe(user => {
      this.user = user;
    });
  }

  async transformExternalToLocal(page: any, domain?: string): Promise<SubmissionItem> {
    const { type, id, attributes } = page;
    const {
      title,
      body = '',
      drupal_internal__nid,
      created,
      langcode,
      is_transparent = false,
    } = attributes;
    if (type === 'node--landing_page') {
      const lang = this.builderService.getApiLang(langcode);
      const landingPage = await lastValueFrom(
        this.http
          .post<any>(`/collector`, {
            ...{},
            domain,
            api: `${lang}/api/v3/landingPage/json/${drupal_internal__nid}`,
          })
          .pipe(
            map((res: any) => {
              const formatPage = this.builderService.formatToExtraData(res.content);
              return formatPage;
            })
          )
      );
      return {
        id,
        status: false,
        type,
        title,
        body: landingPage.body,
        nid: drupal_internal__nid,
        created,
        langcode,
        page: landingPage,
      };
    } else {
      return {
        id,
        status: false,
        type,
        title,
        body: body.value,
        nid: drupal_internal__nid,
        created,
        langcode,
        attributes,
      };
    }
  }

  sequentialSubmit(
    items: SubmissionItem[],
    postApi: string,
    delayMs: number = this.defaultDelay
  ): Observable<{ success: boolean; index: number; item?: SubmissionItem }> {
    return from(items).pipe(
      concatMap((item, index) => this.submitItem(postApi, item, index, delayMs))
    );
  }

  private submitItem(
    api: string,
    item: SubmissionItem,
    index: number,
    delayMs: number
  ): Observable<{ success: boolean; index: number; item?: SubmissionItem }> {
    const { attributes = '', page, title, type } = item;
    if (type === 'node--landing_page' && page) {
      const newPage: IPage = {
        title,
        body: page.body,
      };
      return this.builderService.createLandingPage(newPage, false);
    } else {
      return this.nodeService.addEntity(api, attributes, this.user.csrf_token).pipe(
        delay(delayMs),
        concatMap(res =>
          of({
            success: true,
            index,
            item,
          })
        ),
        catchError((err: HttpErrorResponse) => {
          return of({
            success: false,
            index,
            item,
          });
        })
      );
    }
  }

  processList(form: any, list: any[]): any[] {
    const validKeys = Object.keys(form).filter(key => form[key] === true);

    return list.map((item: any) => {
      const newAttributes = { ...item.attributes };

      Object.keys(newAttributes).forEach(key => {
        if (!validKeys.includes(key)) {
          delete newAttributes[key];
        }

        if (validKeys.includes('body')) {
          newAttributes.body = item.attributes.body.value;
        }
      });

      return {
        ...item,
        attributes: newAttributes,
      };
    });
  }
}

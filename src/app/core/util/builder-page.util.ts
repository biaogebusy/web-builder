import { DrupalJsonApiParams } from 'drupal-jsonapi-params';
import type { IPage, IPageForJSONAPI } from '@core/interface/IAppConfig';
import { environment } from 'src/environments/environment';
import { DEFAULT_BUILDER_PAGE_BODY } from '@core/constant/default-builder-page';

export function getApiLang(langcode?: string): string {
  const { langs } = environment;
  let lang = '';
  if (langs && langcode && langs.length > 0) {
    const defaultLang = langs.find(item => item.default === true);
    lang = defaultLang?.langCode === langcode ? '' : langcode;
  }
  return lang;
}

export function getPageParams(include: string[]): string {
  const apiParams = new DrupalJsonApiParams();
  apiParams.addCustomParam({ noCache: true });
  apiParams.addInclude(include);
  return apiParams.getQueryString();
}

export function getAttrAlias(attr: any): string {
  const {
    drupal_internal__nid,
    langcode,
    path: { alias },
  } = attr;
  const lang = getApiLang(langcode);
  const url = alias ? `${lang}${alias}` : `${lang}/node/${drupal_internal__nid}`;
  return lang ? `/${url}` : url;
}

export function getTitle(title: string): string {
  // api response title includes site name; strip it
  const index = title.indexOf('|');
  return index !== -1 ? title.substring(0, index).trim() : title;
}

export function initExtraBody(body: any[], isTemplate?: boolean): any[] {
  if (!body.length) {
    return DEFAULT_BUILDER_PAGE_BODY;
  }
  return body.map(item => {
    if (isTemplate) {
      delete item.attributes.body.extra;
      return {
        ...item.attributes.body,
      };
    }
    return {
      extra: {
        uuid: item.uuid,
        id: item.id,
        type: item.type,
      },
      ...item.attributes.body,
    };
  });
}

export function formatPage(page: IPage): IPageForJSONAPI {
  const currentPage: IPage = { ...page };
  currentPage.body = page.body.map(item => ({
    type: 'json',
    attributes: {
      body: item,
    },
  }));
  return currentPage;
}

export function coverExtraData(page: IPage): any {
  const currentPage: IPage = { ...page };
  currentPage.label = page.title;
  currentPage.body = page.body.map(item => {
    if (item.extra) {
      const { uuid, id, type } = item.extra;
      return {
        uuid,
        id,
        type,
        attributes: {
          body: item,
        },
      };
    }
    return {
      type: 'json',
      attributes: {
        body: item,
      },
    };
  });
  return currentPage;
}

export function formatToExtraData(page: IPage, isTemplate?: boolean): IPage {
  if (isTemplate) {
    return {
      title: getTitle(page.title),
      current: true,
      time: new Date(),
      body: initExtraBody(page.body, true),
    };
  }
  return {
    ...page,
    title: getTitle(page.title),
    body: initExtraBody(page.body),
  };
}

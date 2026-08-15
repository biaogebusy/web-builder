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

// Translation = non-default-language version on a multilingual site; the default language is the source language of the node itself
export function isTranslationLang(langcode?: string): boolean {
  return Boolean(environment.multiLang) && Boolean(getApiLang(langcode));
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

/** Meta tag overrides stored in the node `meta_tags` field, keyed by metatag id. */
export type MetaTags = Record<string, string>;

function isTagRecord(value: unknown): value is MetaTags {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Read the node `meta_tags` field.
 *
 * JSON:API flattens the single-property metatag field to its raw column value,
 * so the API hands back the JSON string metatag stores; a site that puts the
 * jsonapi_extras JSON enhancer on the field hands back an object instead.
 * Accept both so the builder works either way.
 */
export function decodeMetaTags(value: unknown): MetaTags {
  if (!value) {
    return {};
  }
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return isTagRecord(parsed) ? parsed : {};
    } catch {
      return {};
    }
  }
  return isTagRecord(value) ? value : {};
}

/**
 * Serialize meta tags for a `meta_tags` PATCH.
 *
 * Empty tags are dropped so the page falls back to the Drupal metatag defaults,
 * and an empty set becomes null, which clears the field.
 */
export function encodeMetaTags(tags: MetaTags | undefined | null): string | null {
  const entries = Object.entries(tags ?? {})
    .filter(([, content]) => typeof content === 'string' && content.trim().length > 0)
    .map(([name, content]) => [name, content.trim()]);

  return entries.length ? JSON.stringify(Object.fromEntries(entries)) : null;
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
  return {
    title: page.title,
    meta: page.meta,
    body: page.body.map(item => ({
      type: 'json',
      attributes: {
        body: item,
      },
    })),
  };
}

export function coverExtraData(page: IPage): any {
  return {
    ...page,
    label: page.title,
    body: page.body.map(item => {
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
    }),
  };
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

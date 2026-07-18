import { appendQueryParams } from '@core/util/http-params.util';

export interface ApiEndpoint {
  name: string;
  endpoint: string;
  method: 'GET' | 'POST';
  expectedStatus?: number;
  headers?: any;
  body?: any;
  description: string;
}

const landingPageEndpoint = (content: string): string =>
  appendQueryParams('/api/v3/landingPage', { content });

export const API_CHECK_LIST: ApiEndpoint[] = [
  {
    name: 'BUILDER.API_CHECK_LIST.SEARCH',
    endpoint: '/api/v1/content',
    method: 'GET',
    description: 'BUILDER.API_CHECK_LIST.SEARCH_DESC',
    expectedStatus: 200,
  },
  {
    name: 'BUILDER.API_CHECK_LIST.PAGE_LIST',
    endpoint: '/api/v1/node/landing_page',
    method: 'GET',
    expectedStatus: 200,
    description: 'BUILDER.API_CHECK_LIST.PAGE_LIST_DESC',
  },
  {
    name: 'BUILDER.API_CHECK_LIST.GLOBAL_CONFIG',
    endpoint: landingPageEndpoint('/core/base'),
    method: 'GET',
    expectedStatus: 200,
    description: 'BUILDER.API_CHECK_LIST.GLOBAL_CONFIG_DESC',
  },
  {
    name: 'BUILDER.API_CHECK_LIST.HEADER_FOOTER',
    endpoint: landingPageEndpoint('/core/branding'),
    method: 'GET',
    expectedStatus: 200,
    description: 'BUILDER.API_CHECK_LIST.HEADER_FOOTER_DESC',
  },
  {
    name: 'BUILDER.API_CHECK_LIST.BUILDER_CONFIG',
    endpoint: landingPageEndpoint('/core/builder'),
    method: 'GET',
    expectedStatus: 200,
    description: 'BUILDER.API_CHECK_LIST.BUILDER_CONFIG_DESC',
  },
  {
    name: 'BUILDER.API_CHECK_LIST.MINI_CONFIG',
    endpoint: landingPageEndpoint('/core/mini'),
    method: 'GET',
    expectedStatus: 200,
    description: 'BUILDER.API_CHECK_LIST.MINI_CONFIG_DESC',
  },
  {
    name: 'BUILDER.API_CHECK_LIST.DEFAULT_PAGE',
    endpoint: landingPageEndpoint('/builder/default-page'),
    method: 'GET',
    expectedStatus: 200,
    description: 'BUILDER.API_CHECK_LIST.DEFAULT_PAGE_DESC',
  },
  {
    name: 'BUILDER.API_CHECK_LIST.PAGE_TEMPLATE',
    endpoint: appendQueryParams('/api/v1/node/landing_page', {
      'filter[status]': 1,
      'filter[group.name]': '模板',
      include: 'cover,cover.field_media_image',
      'page[limit]': 20,
      sort: '-changed',
      noCache: true,
    }),
    method: 'GET',
    expectedStatus: 200,
    description: 'BUILDER.API_CHECK_LIST.PAGE_TEMPLATE_DESC',
  },
  {
    name: 'BUILDER.API_CHECK_LIST.CONTENT_STATS',
    endpoint: appendQueryParams('/api/v3/statistics/node/published', { statistics: 1 }),
    method: 'GET',
    expectedStatus: 200,
    description: 'BUILDER.API_CHECK_LIST.CONTENT_STATS_DESC',
  },
  {
    name: 'BUILDER.API_CHECK_LIST.USER_STATS',
    endpoint: '/api/v3/statistics/user/register',
    method: 'GET',
    expectedStatus: 200,
    description: 'BUILDER.API_CHECK_LIST.USER_STATS_DESC',
  },
  {
    name: 'BUILDER.API_CHECK_LIST.USER_LIST',
    endpoint: '/api/v1/user/user',
    method: 'GET',
    expectedStatus: 200,
    description: 'BUILDER.API_CHECK_LIST.USER_LIST_DESC',
  },
  {
    name: 'BUILDER.API_CHECK_LIST.PAGE_TAXONOMY',
    endpoint: '/api/v2/taxonomy_term/page_group',
    method: 'GET',
    expectedStatus: 200,
    description: 'BUILDER.API_CHECK_LIST.PAGE_TAXONOMY_DESC',
  },
  {
    name: 'BUILDER.API_CHECK_LIST.UIUX',
    endpoint: '/api/v3/node/component',
    method: 'GET',
    expectedStatus: 200,
    description: 'BUILDER.API_CHECK_LIST.UIUX_DESC',
  },
  {
    name: 'BUILDER.API_CHECK_LIST.MEDIA',
    endpoint: '/api/v2/media',
    method: 'GET',
    expectedStatus: 200,
    description: 'BUILDER.API_CHECK_LIST.MEDIA_DESC',
  },
  {
    name: 'BUILDER.API_CHECK_LIST.URL_ALIAS',
    endpoint: '/api/v1/path_alias/path_alias',
    method: 'GET',
    expectedStatus: 200,
    description: 'BUILDER.API_CHECK_LIST.URL_ALIAS_DESC',
  },
  {
    name: 'BUILDER.API_CHECK_LIST.UPLOAD',
    endpoint: '/api/v1/media/image',
    method: 'GET',
    expectedStatus: 200,
    description: 'BUILDER.API_CHECK_LIST.UPLOAD_DESC',
  },
  {
    name: 'BUILDER.API_CHECK_LIST.COMMENTS',
    endpoint: '/api/v2/comments',
    method: 'GET',
    expectedStatus: 200,
    description: 'BUILDER.API_CHECK_LIST.COMMENTS_DESC',
  },
  {
    name: 'BUILDER.API_CHECK_LIST.ACCOUNT_PROFILE',
    endpoint: '/api/v3/accountProfile',
    method: 'GET',
    expectedStatus: 200,
    description: 'BUILDER.API_CHECK_LIST.ACCOUNT_PROFILE_DESC',
  },
];

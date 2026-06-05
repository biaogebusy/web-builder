export interface ApiEndpoint {
  name: string;
  endpoint: string;
  method: 'GET' | 'POST';
  expectedStatus?: number;
  headers?: any;
  body?: any;
  description: string;
}

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
    endpoint: '/api/v3/landingPage?content=/core/base',
    method: 'GET',
    expectedStatus: 200,
    description: 'BUILDER.API_CHECK_LIST.GLOBAL_CONFIG_DESC',
  },
  {
    name: 'BUILDER.API_CHECK_LIST.HEADER_FOOTER',
    endpoint: '/api/v3/landingPage?content=/core/branding',
    method: 'GET',
    expectedStatus: 200,
    description: 'BUILDER.API_CHECK_LIST.HEADER_FOOTER_DESC',
  },
  {
    name: 'BUILDER.API_CHECK_LIST.BUILDER_CONFIG',
    endpoint: '/api/v3/landingPage?content=/core/builder',
    method: 'GET',
    expectedStatus: 200,
    description: 'BUILDER.API_CHECK_LIST.BUILDER_CONFIG_DESC',
  },
  {
    name: 'BUILDER.API_CHECK_LIST.MINI_CONFIG',
    endpoint: '/api/v3/landingPage?content=/core/mini',
    method: 'GET',
    expectedStatus: 200,
    description: 'BUILDER.API_CHECK_LIST.MINI_CONFIG_DESC',
  },
  {
    name: 'BUILDER.API_CHECK_LIST.DEFAULT_PAGE',
    endpoint: '/api/v3/landingPage?content=/builder/default-page',
    method: 'GET',
    expectedStatus: 200,
    description: 'BUILDER.API_CHECK_LIST.DEFAULT_PAGE_DESC',
  },
  {
    name: 'BUILDER.API_CHECK_LIST.PAGE_TEMPLATE',
    endpoint:
      '/api/v1/node/landing_page?filter%5Bstatus%5D=1&filter%5Bgroup.name%5D=%E6%A8%A1%E6%9D%BF&include=cover%2Ccover.field_media_image&page%5Blimit%5D=20&sort=-changed&noCache=true',
    method: 'GET',
    expectedStatus: 200,
    description: 'BUILDER.API_CHECK_LIST.PAGE_TEMPLATE_DESC',
  },
  {
    name: 'BUILDER.API_CHECK_LIST.CONTENT_STATS',
    endpoint: '/api/v3/statistics/node/published?statistics=1',
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
];

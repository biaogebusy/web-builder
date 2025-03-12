export interface ApiEndpoint {
  name: string; // API名称
  endpoint: string; // API地址
  method: 'GET' | 'POST'; // 请求方法
  expectedStatus?: number; // 预期状态码
  headers?: any; // 自定义请求头
  body?: any; // 请求体（POST用）
}

export const API_CHECK_LIST: ApiEndpoint[] = [
  {
    name: '通用搜索API',
    endpoint: '/api/v1/content',
    method: 'GET',
    expectedStatus: 200,
  },
  {
    name: 'Page 列表',
    endpoint: '/api/v1/node/landing_page',
    method: 'GET',
    expectedStatus: 200,
  },
  {
    name: 'Core 配置列表',
    endpoint: '/api/v2/node/core',
    method: 'GET',
    expectedStatus: 200,
  },
  {
    name: '内容统计',
    endpoint: '/api/v3/statistics/node/published?statistics=1',
    method: 'GET',
    expectedStatus: 200,
  },
  {
    name: '用户统计',
    endpoint: '/api/v3/statistics/user/register',
    method: 'GET',
    expectedStatus: 200,
  },
  {
    name: '用户信息',
    endpoint: '/api/v1/user/user/1',
    method: 'GET',
    expectedStatus: 200,
  },
  {
    name: '着陆页分类',
    endpoint: '/api/v2/taxonomy_term/page_group',
    method: 'GET',
    expectedStatus: 200,
  },
  {
    name: '媒体库',
    endpoint: '/api/v2/media',
    method: 'GET',
    expectedStatus: 200,
  },
  {
    name: 'url 别名',
    endpoint: '/api/v1/path_alias/path_alias',
    method: 'GET',
    expectedStatus: 200,
  },
  {
    name: '提交评论',
    endpoint: '/api/v3/comment/comment/xxx',
    method: 'POST',
    expectedStatus: 201,
    body: { testData: true },
  },
  {
    name: '上传图片',
    endpoint: '/api/v1/media/image/field_media_image',
    method: 'POST',
    expectedStatus: 201,
    body: { testData: true },
  },
];

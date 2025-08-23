export interface ApiEndpoint {
  name: string; // API名称
  endpoint: string; // API地址
  method: 'GET' | 'POST'; // 请求方法
  expectedStatus?: number; // 预期状态码
  headers?: any; // 自定义请求头
  body?: any; // 请求体（POST用）
  description: string;
}

export const API_CHECK_LIST: ApiEndpoint[] = [
  {
    name: '通用搜索API',
    endpoint: '/api/v1/content',
    method: 'GET',
    description: '用于搜索等组件',
    expectedStatus: 200,
  },
  {
    name: 'Page 管理列表',
    endpoint: '/api/v1/node/landing_page',
    method: 'GET',
    expectedStatus: 200,
    description: '页面管理列表',
  },
  {
    name: '全局配置',
    endpoint: '/api/v3/landingPage?content=/core/base',
    method: 'GET',
    expectedStatus: 200,
    description: '应用全局配置',
  },
  {
    name: '页头页脚',
    endpoint: '/api/v3/landingPage?content=/core/branding',
    method: 'GET',
    expectedStatus: 200,
    description: '站点Header、Footer 配置',
  },
  {
    name: 'Builder 配置',
    endpoint: '/api/v3/landingPage?content=/core/builder',
    method: 'GET',
    expectedStatus: 200,
    description: 'Builder 主菜单，引导等配置',
  },
  {
    name: '小程序全局配置',
    endpoint: '/api/v3/landingPage?content=/core/mini',
    method: 'GET',
    expectedStatus: 200,
    description: '小程序需要的全局配置，比如底部菜单等',
  },
  {
    name: 'Builder 默认页面',
    endpoint: '/api/v3/landingPage?content=/builder/default-page',
    method: 'GET',
    expectedStatus: 200,
    description: 'Builder 默认欢迎页面',
  },
  {
    name: '页面模板',
    endpoint:
      '/api/v1/node/landing_page?filter%5Bstatus%5D=1&filter%5Bgroup.name%5D=%E6%A8%A1%E6%9D%BF&include=cover%2Ccover.field_media_image&page%5Blimit%5D=20&sort=-changed&noCache=true',
    method: 'GET',
    expectedStatus: 200,
    description: '弹窗提供给用户创建页面的模板',
  },
  {
    name: '内容统计',
    endpoint: '/api/v3/statistics/node/published?statistics=1',
    method: 'GET',
    expectedStatus: 200,
    description: 'Dashboard 内容统计',
  },
  {
    name: '用户统计',
    endpoint: '/api/v3/statistics/user/register',
    method: 'GET',
    expectedStatus: 200,
    description: 'Dashboard 用户统计',
  },
  {
    name: '用户列表',
    endpoint: '/api/v1/user/user',
    method: 'GET',
    expectedStatus: 200,
    description: '获取用户列表',
  },
  {
    name: '着陆页分类',
    endpoint: '/api/v2/taxonomy_term/page_group',
    method: 'GET',
    expectedStatus: 200,
    description: '过滤页面分类和设置着陆页分类使用',
  },
  {
    name: '组件库',
    endpoint: '/api/v3/node/component',
    method: 'GET',
    expectedStatus: 200,
    description: 'UIUX 组件库',
  },
  {
    name: '媒体库',
    endpoint: '/api/v2/media',
    method: 'GET',
    expectedStatus: 200,
    description: '媒体库列表',
  },
  {
    name: 'url 别名',
    endpoint: '/api/v1/path_alias/path_alias',
    method: 'GET',
    expectedStatus: 200,
    description: '页面 url 别名API',
  },
  {
    name: '上传图片',
    endpoint: '/api/v1/media/image',
    method: 'GET',
    expectedStatus: 200,
    description: '媒体库和图片组件上传图片',
  },
  {
    name: '评论列表',
    endpoint: '/api/v2/comments',
    method: 'GET',
    expectedStatus: 200,
    description: '评论列表API',
  },
];

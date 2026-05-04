/**
 * 后端 API 路径集中维护
 * 之前由 coreConfig.apiUrl（来自 base.json）下发，现统一在代码中维护。
 */
export const API_PATH = {
  apiBase: '/api/v1',
  localConfigUrl: '/assets/app',
  brandingConfigUrl: '/core/branding',
  coreConfigUrl: '/core/base',
  loginPath: '/user/login',
  logoutPath: '/user/logout',
  userIdGetPath: '/api/v1',
  nodeGetPath: '/api/v1/node',
  taxonomyGetPath: '/api/v1/taxonomy_term',
  userGetPath: '/api/v1/user/user',
  commentGetPath: '/api/v1/comment',
  flaggingGetPath: '/api/v1/flagging',
} as const;

export type ApiPath = typeof API_PATH;

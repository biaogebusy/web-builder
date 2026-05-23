import { IEnvironment } from '../app/core/interface/IEnvironment';

export const environment: IEnvironment = {
  apiUrl: 'https://yourdomain.com',
  production: true,
  port: 4200,
  multiLang: true,
  langs: [
    {
      label: '中文',
      langCode: 'zh-hans',
      prefix: '/',
      default: true,
    },
    {
      label: 'EN',
      langCode: 'en',
      prefix: '/en',
    },
  ],
  oauth: {
    clientId: 'xxx',
    tokenUrl: '/oauth/token',
    authorizeUrl: '/oauth/authorize',
    redirectPath: '/me/login/callback',
    logoutPath: '/user/logout',
    scope: 'webmaster',
  },
};

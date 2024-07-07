import { IEnvironment } from '../app/core/interface/IEnvironment';

export const environment: IEnvironment = {
  apiUrl: 'https://builder.design',
  production: true,
  port: 4200,
  cache: true,
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
};

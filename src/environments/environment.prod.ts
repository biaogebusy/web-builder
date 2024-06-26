import { IEnvironment } from '../app/core/interface/IEnvironment';

export const environment: IEnvironment = {
  apiUrl: 'https://yourdomain.com',
  production: true,
  port: 4200,
  cache: true,
  ssr: true,
  multiLang: true,
  langs: [
    {
      label: '中文',
      value: 'zh',
      prefix: '/',
      default: true,
    },
    {
      label: 'EN',
      value: 'en',
      prefix: '/en',
    },
  ],
};

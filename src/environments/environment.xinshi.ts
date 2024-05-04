import { IEnvironment } from '../app/core/interface/IEnvironment';

export const environment: IEnvironment = {
  apiUrl: 'https://builder.design',
  production: true,
  site: 'xinshi',
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

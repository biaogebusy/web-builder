import { IEnvironment } from '../app/core/interface/IEnvironment';

export const environment: IEnvironment = {
  apiUrl: 'https://base.builder.design',
  production: true,
  port: 4201,
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
  oauth: {
    clientId: 'Y_gpBdtKg45QidL31Ilb4UgfvOsSNeBVb-r0vk3Nc3o',
    tokenUrl: '/oauth/token',
    scope: '',
  },
};

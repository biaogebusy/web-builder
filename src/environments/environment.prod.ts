import { IEnvironment } from '../app/core/interface/IEnvironment';

export const environment: IEnvironment = {
  apiUrl: 'https://yourdomain.com',
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
  oauth: {
    clientId: 'VXd0QdXoSq1wRWjUpH0ub4p1RSMMiKMm2OMR_rN66rA',
    tokenUrl: '/oauth/token',
    scope: '',
  },
};

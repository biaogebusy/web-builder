import { IEnvironment } from '../app/core/interface/IEnvironment';

export const environment: IEnvironment = {
  apiUrl: 'https://api.zhaobg.com',
  production: true,
  site: 'dist',
  port: 4200,
  cache: false,
  ssr: true,
  drupalProxy: false,
};

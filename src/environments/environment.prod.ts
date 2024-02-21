import { IEnvironment } from '../app/core/interface/IEnvironment';

export const environment: IEnvironment = {
  apiUrl: 'https://api.zhaobg.com',
  production: true,
  site: 'dist',
  port: 4209,
  cache: true,
  ssr: false,
  drupalProxy: false,
};

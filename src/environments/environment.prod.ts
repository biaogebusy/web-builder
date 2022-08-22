import { IEnvironment } from '../app/core/interface/IEnvironment';

export const environment: IEnvironment = {
  production: true,
  site: 'dist',
  port: 4208,
  cache: true,
  ssr: false,
  drupalProxy: false,
};

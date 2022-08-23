import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment';

export const API_URL = new InjectionToken<string>('api url');

export const apiUrlFactory = () => {
  // can use front url to query backend api, ngxin will proxy
  return environment.apiUrl;
};

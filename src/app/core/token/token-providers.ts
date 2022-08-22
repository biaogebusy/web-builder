import { InjectionToken } from '@angular/core';

export const API_URL = new InjectionToken<string>('api url');

export const apiUrlFactory = (document: Document) => {
  // use front url to query backend api, ngxin will proxy
  // return 'https://www.zhaobg.com';
  return document.location.origin;
};

import { merge } from 'lodash-es';

export function formatBrandingJson(value: object): string {
  return JSON.stringify(value, null, 2);
}

export function getBrandingJsonError(value: string): string {
  try {
    JSON.parse(value);
    return '';
  } catch (error: unknown) {
    return (error as Error).message;
  }
}

export function mergeBrandingJson<T extends object>(base: T, value: string): T {
  const customConfig: unknown = JSON.parse(value);
  if (customConfig && typeof customConfig === 'object') {
    return merge({}, base, customConfig) as T;
  }
  return base;
}

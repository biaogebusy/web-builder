import { HttpParams } from '@angular/common/http';
import qs from 'qs';

export type QueryParamPrimitive = string | number | boolean;
export type QueryParamArray = readonly (QueryParamPrimitive | null | undefined | '')[];
export type QueryParamValue = QueryParamPrimitive | QueryParamArray | null | undefined | '';
export type QueryParams = Record<string, QueryParamValue>;

export interface QueryParamOptions {
  arrayFormat?: 'repeat' | 'plus' | 'comma';
  encodeKeys?: boolean;
  encodeValues?: boolean;
  skipEmptyString?: boolean;
}

const DEFAULT_OPTIONS: Required<QueryParamOptions> = {
  arrayFormat: 'repeat',
  encodeKeys: true,
  encodeValues: true,
  skipEmptyString: true,
};

function resolveOptions(options: QueryParamOptions = {}): Required<QueryParamOptions> {
  return {
    ...DEFAULT_OPTIONS,
    ...options,
  };
}

function shouldSkipValue(
  value: QueryParamPrimitive | null | undefined | '',
  options: Required<QueryParamOptions>
): value is null | undefined | '' {
  return value === null || value === undefined || (options.skipEmptyString && value === '');
}

function stringifyValue(value: QueryParamPrimitive): string {
  return String(value);
}

function isQueryParamArray(value: QueryParamValue): value is QueryParamArray {
  return Array.isArray(value);
}

function normalizedEntries(
  params: QueryParams,
  options: Required<QueryParamOptions>
): [string, QueryParamPrimitive[]][] {
  return Object.entries(params).reduce<[string, QueryParamPrimitive[]][]>(
    (entries, [key, value]) => {
      if (isQueryParamArray(value)) {
        const values = value.filter(
          (item): item is QueryParamPrimitive => !shouldSkipValue(item, options)
        );
        if (values.length > 0) {
          entries.push([key, values]);
        }
        return entries;
      }

      const scalarValue = value as QueryParamPrimitive | null | undefined | '';
      if (!shouldSkipValue(scalarValue, options)) {
        entries.push([key, [scalarValue]]);
      }
      return entries;
    },
    []
  );
}

export function buildHttpParams(
  params: QueryParams = {},
  options: QueryParamOptions = {}
): HttpParams {
  const resolved = resolveOptions(options);
  return normalizedEntries(params, resolved).reduce((httpParams, [key, values]) => {
    if (resolved.arrayFormat === 'repeat') {
      return values.reduce(
        (nextParams, value) => nextParams.append(key, stringifyValue(value)),
        httpParams
      );
    }

    const separator = resolved.arrayFormat === 'plus' ? '+' : ',';
    return httpParams.set(key, values.map(stringifyValue).join(separator));
  }, new HttpParams());
}

export function buildQueryString(
  params: QueryParams = {},
  options: QueryParamOptions = {}
): string {
  const resolved = resolveOptions(options);
  const entries = normalizedEntries(params, resolved);
  if (resolved.arrayFormat === 'plus' || resolved.arrayFormat === 'comma') {
    return buildJoinedArrayQueryString(
      entries,
      resolved,
      resolved.arrayFormat === 'plus' ? '+' : ','
    );
  }

  return qs.stringify(toQsParams(entries), {
    arrayFormat: resolved.arrayFormat,
    encoder: (
      value: unknown,
      defaultEncoder: qs.defaultEncoder,
      charset: string,
      type: 'key' | 'value'
    ) => {
      const shouldEncode = type === 'key' ? resolved.encodeKeys : resolved.encodeValues;
      return shouldEncode ? defaultEncoder(value, defaultEncoder, charset) : String(value);
    },
  });
}

function toQsParams(
  entries: [string, QueryParamPrimitive[]][]
): Record<string, QueryParamPrimitive[]> {
  return entries.reduce<Record<string, QueryParamPrimitive[]>>((result, [key, values]) => {
    result[key] = values;
    return result;
  }, {});
}

function buildJoinedArrayQueryString(
  entries: [string, QueryParamPrimitive[]][],
  options: Required<QueryParamOptions>,
  separator: string
): string {
  const pairs: string[] = [];

  entries.forEach(([key, values]) => {
    const encodedKey = encodeQueryPart(key, options.encodeKeys);
    const encodedValue = values
      .map(value => encodeQueryPart(stringifyValue(value), options.encodeValues))
      .join(separator);
    pairs.push(`${encodedKey}=${encodedValue}`);
  });

  return pairs.join('&');
}

function encodeQueryPart(value: string, enabled: boolean): string {
  return enabled ? encodeURIComponent(value) : value;
}

export function normalizeQueryString(queryString: string): string {
  let normalized = queryString.trim();
  while (normalized.startsWith('?') || normalized.startsWith('&')) {
    normalized = normalized.slice(1);
  }
  return normalized;
}

export function appendQueryParams(
  url: string,
  params: QueryParams | string | null | undefined,
  options: QueryParamOptions = {}
): string {
  const queryString =
    typeof params === 'string'
      ? normalizeQueryString(params)
      : buildQueryString(params ?? {}, options);

  if (!queryString) {
    return url;
  }

  const separator = url.includes('?') ? (url.endsWith('?') || url.endsWith('&') ? '' : '&') : '?';
  return `${url}${separator}${queryString}`;
}

export function combineQueryParams(
  paramsList: (QueryParams | string | null | undefined)[],
  options: QueryParamOptions = {}
): string {
  return paramsList
    .map(params =>
      typeof params === 'string'
        ? normalizeQueryString(params)
        : buildQueryString(params ?? {}, options)
    )
    .filter(queryString => queryString.length > 0)
    .join('&');
}

export function queryStringToParams(queryString: string): QueryParams {
  const parsed = qs.parse(queryString, {
    depth: 0,
    duplicates: 'combine',
    ignoreQueryPrefix: true,
  });

  return Object.entries(parsed).reduce<QueryParams>((result, [key, value]) => {
    if (Array.isArray(value)) {
      result[key] = value.map(item => String(item));
    } else if (value !== undefined) {
      result[key] = String(value);
    }
    return result;
  }, {});
}

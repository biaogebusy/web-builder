import { HttpParams } from '@angular/common/http';

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
  const pairs: string[] = [];
  for (const [key, values] of entries) {
    const encode = (value: string, enabled: boolean) => {
      const encoded = encodeQueryPart(value, enabled);
      // qs used RFC3986 for repeat; joined arrays historically use encodeURIComponent.
      return enabled && resolved.arrayFormat === 'repeat'
        ? encoded.replace(/[!'()*]/g, char => `%${char.charCodeAt(0).toString(16).toUpperCase()}`)
        : encoded;
    };
    const encodedKey = encode(key, resolved.encodeKeys);
    const encodedValues = values.map(value => encode(stringifyValue(value), resolved.encodeValues));
    if (resolved.arrayFormat === 'repeat') {
      // The previous intermediate object did not serialize this prototype setter.
      if (key !== '__proto__') {
        pairs.push(...encodedValues.map(value => `${encodedKey}=${value}`));
      }
    } else {
      const separator = resolved.arrayFormat === 'plus' ? '+' : ',';
      pairs.push(`${encodedKey}=${encodedValues.join(separator)}`);
    }
  }
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
  const result: QueryParams = {};
  // Preserve qs depth: 0 parsing, including its default parameter limit.
  const parts = queryString.replace(/^\?/, '').replace(/%5B/gi, '[').replace(/%5D/gi, ']')
    .split('&', 1000);
  const valuesByKey = new Map<string, string[]>();
  for (const part of parts) {
    const bracketEquals = part.indexOf(']=');
    const separator = bracketEquals < 0 ? part.indexOf('=') : bracketEquals + 1;
    const key = decodeQueryPart(separator < 0 ? part : part.slice(0, separator));
    if (!key || Object.prototype.hasOwnProperty.call(Object.prototype, key)) {
      continue;
    }
    const value = separator < 0 ? '' : decodeQueryPart(part.slice(separator + 1));
    const values = valuesByKey.get(key);
    if (values) {
      values.push(value);
    } else {
      valuesByKey.set(key, [value]);
    }
  }
  const merged = new Map<string, string[]>();
  for (const [key, values] of valuesByKey) {
    // Even depth: 0 strips an enclosing bracket pair; bare [] creates numeric keys.
    const outputKey = key.startsWith('[') && key.endsWith(']') ? key.slice(1, -1) : key;
    if (outputKey === '__proto__') {
      continue;
    }
    const entries: [string, string[]][] = key === '[]'
      ? values.map((value, index) => [String(index), [value]])
      : [[outputKey, values]];
    for (const [name, items] of entries) {
      merged.set(name, [...(merged.get(name) ?? []), ...items]);
    }
  }
  for (const [key, values] of merged) {
    // qs converts >20 duplicates to an object; the existing wrapper stringified it.
    result[key] = values.length > 20 ? '[object Object]' : values.length === 1 ? values[0] : values;
  }
  return result;
}

function decodeQueryPart(value: string): string {
  const normalized = value.replace(/\+/g, ' ');
  try {
    return decodeURIComponent(normalized);
  } catch {
    return normalized;
  }
}

import { IPage } from '../IAppConfig';
import type { JsonObject, JsonValue } from '../common';

export interface JsonApiResource<
  TAttributes extends JsonObject = JsonObject,
  TRelationships extends JsonObject = JsonObject,
> {
  type: string;
  id: string;
  attributes: TAttributes;
  relationships?: TRelationships;
}

export interface JsonApiResponse<
  TData,
  TIncluded extends JsonApiResource = JsonApiResource,
> {
  data: TData;
  links?: {
    next?: {
      href: string;
    };
  };
  included?: TIncluded[];
}

export type JsonApiListResponse<
  TResource extends JsonApiResource = JsonApiResource,
  TIncluded extends JsonApiResource = JsonApiResource,
> = JsonApiResponse<TResource[], TIncluded>;

export type DrupalNode = JsonApiResource<{
    title: string;
    body?: {
      value: string;
      format: string;
    };
    created: string;
    changed?: string;
  },
  Record<
    string,
    {
      data: {
        type: string;
        id: string;
      };
    }
  >
>;

export type DrupalResponse = JsonApiListResponse<DrupalNode>;

export interface SubmissionItem {
  id: string;
  status: boolean;
  type: string;
  title: string;
  body: JsonValue;
  nid: string;
  created: string;
  langcode: string;
  page?: IPage;
  attributes?: {
    title: string;
    body: {
      value: string;
      format: 'full_html';
    };
  };
}

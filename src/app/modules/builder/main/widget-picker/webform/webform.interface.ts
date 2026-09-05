import type { FormlyFieldConfig } from '@ngx-formly/core';

/** One entry of the CMS webform list endpoint (`/api/v3/webform`) */
export interface IWebformSummary {
  /** Drupal webform config entity id; also the `webform_id` sent on submit */
  id: string;
  /** Human readable webform title, already translated by the backend */
  title: string;
  /** Admin description shown as the picker card subtitle */
  description?: string;
  /** Webform category, kept for grouping/filtering later */
  category?: string;
  /** False for closed/archived webforms, which are filtered out of the picker */
  status?: boolean;
}

/**
 * A raw Drupal webform element as returned by `GET /webform_rest/{id}/fields`.
 * Drupal render-array keys are prefixed with `#`; any other key is a child
 * element of a container (details/fieldset/...).
 */
export type IWebformElement = Record<string, any>;

/** Keyed element tree returned by `GET /webform_rest/{id}/fields` */
export type IWebformElements = Record<string, any>;

/** Why a webform element could not be represented as a formly field */
export type WebformWarningReason = 'unsupported' | 'conditional';

/** One lossy step of the webform -> formly conversion, surfaced to the editor */
export interface IWebformWarning {
  /** Webform element key */
  key: string;
  /** Drupal element `#type` */
  type: string;
  /**
   * `unsupported`: the element was dropped entirely.
   * `conditional`: the field was kept but its `#states` logic was dropped.
   */
  reason: WebformWarningReason;
}

/** Result of converting a webform element tree into formly fields */
export interface IWebformMapResult {
  fields: FormlyFieldConfig[];
  warnings: IWebformWarning[];
}

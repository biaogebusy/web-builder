import type { FormlyFieldConfig } from '@ngx-formly/core';

import type {
  IWebformElement,
  IWebformElements,
  IWebformMapResult,
  IWebformWarning,
} from './webform.interface';

/**
 * Converts a Drupal webform element tree into formly fields.
 *
 * The mapping is an allowlist: any `#type` that is not explicitly known is
 * reported as an `unsupported` warning instead of being guessed at, so the
 * editor always learns what the generated form is missing.
 */

/** Elements that only group children; mapped to a formly `fieldGroup` */
const CONTAINER_TYPES = new Set([
  'container',
  'details',
  'fieldset',
  'webform_flexbox',
  'webform_section',
  'webform_wizard_page',
]);

/**
 * Elements dropped without a warning.
 * `webform_actions` is replaced by the comb's own submit button, and hidden /
 * value elements need no UI: webform applies their `#default_value` server side
 * when the submission is created.
 */
const IGNORED_TYPES = new Set(['webform_actions', 'hidden', 'value', 'webform_horizontal_rule']);

/** Display-only elements, rendered through formly's `template` */
const MARKUP_TYPES = new Set([
  'item',
  'markup',
  'processed_text',
  'webform_markup',
  'webform_message',
]);

/** Drupal `#type` -> formly `type` */
const TYPE_MAP: Readonly<Record<string, string>> = {
  textfield: 'input',
  password: 'input',
  search: 'input',
  email: 'input',
  webform_email_confirm: 'input',
  tel: 'input',
  url: 'input',
  number: 'input',
  range: 'input',
  textarea: 'textarea',
  select: 'select',
  webform_select_other: 'select',
  webform_entity_select: 'select',
  entity_autocomplete: 'select',
  checkbox: 'checkbox',
  checkboxes: 'multicheckbox',
  webform_checkboxes_other: 'multicheckbox',
  radios: 'radio',
  webform_radios_other: 'radio',
  date: 'datepicker',
};

/** `props.type` for the formly `input` types that are not plain text */
const INPUT_HTML_TYPE: Readonly<Record<string, string>> = {
  email: 'email',
  webform_email_confirm: 'email',
  tel: 'tel',
  url: 'url',
  number: 'number',
  range: 'number',
  password: 'password',
  search: 'search',
};

/** formly types whose value set comes from `#options` */
const OPTION_TYPES = new Set(['select', 'multicheckbox', 'radio']);

function isRenderKey(key: string): boolean {
  return key.startsWith('#');
}

/**
 * Normalizes Drupal `#options` into formly options.
 * Optgroups are flattened one level; the group label is dropped because the
 * material select in this project renders a flat list.
 */
function toFormlyOptions(raw: unknown): { value: string; label: string }[] | undefined {
  if (!raw || typeof raw !== 'object') {
    return undefined;
  }
  const options: { value: string; label: string }[] = [];
  for (const [value, label] of Object.entries(raw as Record<string, unknown>)) {
    if (label && typeof label === 'object') {
      for (const [childValue, childLabel] of Object.entries(label as Record<string, unknown>)) {
        options.push({ value: childValue, label: String(childLabel) });
      }
      continue;
    }
    options.push({ value, label: String(label) });
  }
  return options.length > 0 ? options : undefined;
}

function buildProps(
  key: string,
  element: IWebformElement,
  formlyType: string
): Record<string, any> {
  const props: Record<string, any> = {
    label: String(element['#title'] ?? key),
  };
  const drupalType = String(element['#type']);

  if (element['#required']) {
    props.required = true;
  }
  if (element['#description']) {
    props.description = String(element['#description']);
  }
  if (element['#placeholder']) {
    props.placeholder = String(element['#placeholder']);
  }
  const htmlType = INPUT_HTML_TYPE[drupalType];
  if (formlyType === 'input' && htmlType) {
    props.type = htmlType;
  }
  if (formlyType === 'textarea' && element['#rows']) {
    props.rows = Number(element['#rows']);
  }
  if (OPTION_TYPES.has(formlyType)) {
    const options = toFormlyOptions(element['#options']);
    if (options) {
      props.options = options;
    }
  }
  // Formly's multicheckbox stores its value as a {value: boolean} map unless it is
  // told otherwise, while Drupal's checkboxes element expects the selected values
  // as an array; without this the submission is rejected as an illegal choice
  if (formlyType === 'multicheckbox') {
    props.type = 'array';
  }
  // #multiple is either a boolean or the allowed number of values, and webform
  // writes 1 for the single-value case
  const multiple = element['#multiple'];
  if (formlyType === 'select' && (multiple === true || Number(multiple) > 1)) {
    props.multiple = true;
  }
  if (element['#minlength'] !== undefined) {
    props.minLength = Number(element['#minlength']);
  }
  if (element['#maxlength'] !== undefined) {
    props.maxLength = Number(element['#maxlength']);
  }
  if (element['#min'] !== undefined) {
    props.min = Number(element['#min']);
  }
  if (element['#max'] !== undefined) {
    props.max = Number(element['#max']);
  }
  if (element['#step'] !== undefined) {
    props.step = Number(element['#step']);
  }
  if (element['#pattern']) {
    props.pattern = String(element['#pattern']);
  }
  return props;
}

function mapElement(
  key: string,
  element: IWebformElement,
  warnings: IWebformWarning[]
): FormlyFieldConfig | undefined {
  const drupalType = String(element['#type'] ?? '');

  // Elements hidden by access rules never reach the visitor, so never reach the JSON
  if (element['#access'] === false || IGNORED_TYPES.has(drupalType)) {
    return undefined;
  }

  if (CONTAINER_TYPES.has(drupalType)) {
    const fieldGroup = mapChildren(element, warnings);
    if (fieldGroup.length === 0) {
      return undefined;
    }
    const group: FormlyFieldConfig = { fieldGroup };
    if (element['#title']) {
      group.props = { label: String(element['#title']) };
    }
    return group;
  }

  if (MARKUP_TYPES.has(drupalType)) {
    const template = element['#markup'] ?? element['#text'] ?? element['#title'];
    return template ? { template: String(template) } : undefined;
  }

  const formlyType = TYPE_MAP[drupalType];
  if (!formlyType) {
    warnings.push({ key, type: drupalType, reason: 'unsupported' });
    return undefined;
  }

  // Entity-backed selects resolve their values server side and ship no #options.
  // A free-text input in their place would look fine and then fail every
  // submission, because drupal expects an entity id: report them instead.
  const options = toFormlyOptions(element['#options']);
  if (OPTION_TYPES.has(formlyType) && !options) {
    warnings.push({ key, type: drupalType, reason: 'unsupported' });
    return undefined;
  }

  if (element['#states'] && Object.keys(element['#states']).length > 0) {
    warnings.push({ key, type: drupalType, reason: 'conditional' });
  }

  const field: FormlyFieldConfig = {
    key,
    type: formlyType,
    props: buildProps(key, element, formlyType),
  };
  if (element['#default_value'] !== undefined && element['#default_value'] !== '') {
    field.defaultValue = element['#default_value'];
  }
  return field;
}

function mapChildren(elements: IWebformElements, warnings: IWebformWarning[]): FormlyFieldConfig[] {
  const fields: FormlyFieldConfig[] = [];
  for (const [key, element] of Object.entries(elements)) {
    if (isRenderKey(key) || !element || typeof element !== 'object') {
      continue;
    }
    const field = mapElement(key, element, warnings);
    if (field) {
      fields.push(field);
    }
  }
  return fields;
}

/**
 * Converts the payload of `GET /webform_rest/{id}/fields` into formly fields.
 * Returns the warnings alongside so the caller can tell the editor which
 * elements were dropped or lost their conditional logic.
 */
export function webformElementsToFormly(elements: IWebformElements): IWebformMapResult {
  const warnings: IWebformWarning[] = [];
  const fields = mapChildren(elements ?? {}, warnings);
  return { fields, warnings };
}

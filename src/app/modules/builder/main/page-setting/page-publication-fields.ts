import type { INodeFormSchema } from '@core/service/node-field-form.service';
import type { FormlyFieldConfig } from '@ngx-formly/core';

/** Builds a status field from the CMS account's allowed states and public field names. */
export function buildPagePublicationField(
  schema: INodeFormSchema | null,
  currentState: string,
  translate: (key: string) => string
): FormlyFieldConfig {
  const state = schema?.defaults.state ?? currentState;
  const label = (value: string): string => value === 'published' || value === 'unpublished'
    ? translate(`BUILDER.NODE_ADD.STATE_${value.toUpperCase()}`)
    : value || translate('BUILDER.PAGE_SETTING.STATE_UNKNOWN');
  const options = (schema?.states ?? []).map(option => ({
    ...option, label: schema?.moderated ? option.label : label(option.value),
  }));
  if (!options.some(option => option.value === state)) {
    options.unshift({ value: state, label: label(state) });
  }
  const writable = !!schema?.baseFields[schema.moderated ? 'moderation_state' : 'status'];
  return {
    key: 'publicationState',
    type: 'select',
    className: 'w-full',
    defaultValue: state,
    props: {
      label: translate('BUILDER.PAGE_SETTING.STATE'),
      disabled: !writable,
      options,
      // Refresh Material's selection when Formly reuses option positions for new workflow states.
      compareWith: (left: unknown, right: unknown) => left === right,
    },
  };
}

/** Returns only an authorized state change; unchanged settings never republish a page. */
export function buildPagePublicationAttributes(
  schema: INodeFormSchema | null,
  state: unknown
): Record<string, string | boolean> {
  if (!schema || state === undefined || state === schema.defaults.state) return {};
  const field = schema.baseFields[schema.moderated ? 'moderation_state' : 'status'];
  if (!field || !schema.states.some(option => option.value === state)) {
    throw new Error('Publication state is not allowed by the CMS.');
  }
  return { [field]: schema.moderated ? state as string : state === 'published' };
}

import type { INodeFormSchema } from '@core/service/node-field-form.service';

/** Synthetic administrator form, overridden for ordinary-account regressions. */
export function contentFormFixture(overrides: Partial<INodeFormSchema> = {}): INodeFormSchema {
  const baseFields = Object.fromEntries(
    ['title', 'status', 'moderation_state', 'promote', 'sticky', 'path', 'revision_log', 'langcode']
      .map(key => [key, key])
  );
  return {
    fields: [], baseFields, baseFieldNames: baseFields, moderated: false,
    states: [
      { value: 'published', label: 'Published' },
      { value: 'unpublished', label: 'Unpublished' },
    ],
    defaults: { state: 'published', promote: false, sticky: false }, canDelete: true,
    ...overrides,
  };
}

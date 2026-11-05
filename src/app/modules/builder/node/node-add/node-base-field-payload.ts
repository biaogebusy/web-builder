import type { INodeFormSchema } from '@core/service/node-field-form.service';

/** Submission context supplied by the content editor. */
interface NodeBaseFieldContext {
  originalNode: {
    attributes?: {
      moderation_state?: unknown;
      status?: unknown;
      promote?: unknown;
      sticky?: unknown;
      path?: { alias?: unknown } | null;
    };
  } | null;
  schema: Pick<INodeFormSchema, 'moderated' | 'baseFields'> | null;
  creatingTranslation: boolean;
  editUuid: string;
  lang?: string;
}

/** Build the minimal base-field patch, using the writable JSON:API names from Drupal. */
export function buildNodeBaseFieldAttributes(
  value: Readonly<Record<string, unknown>>,
  state: string,
  { originalNode, schema, creatingTranslation, editUuid, lang }: NodeBaseFieldContext
): Record<string, unknown> {
  const attrs: Record<string, unknown> = {};
  // A new translation has no baseline of its own; originalNode is the source translation.
  const original = creatingTranslation ? null : originalNode;
  // Moderated entities must use workflow state instead of writing status directly.
  if (schema?.moderated) {
    if (!original || original.attributes?.moderation_state !== state) {
      attrs.moderation_state = state;
    }
  } else {
    const publish = state === 'published';
    if (!original || !!original.attributes?.status !== publish) {
      attrs.status = publish;
    }
  }
  // Unchecked create values leave CMS defaults untouched; edits submit only changes.
  const promote = !!value['promote'];
  const sticky = !!value['sticky'];
  if (original ? !!original.attributes?.promote !== promote : promote) {
    attrs.promote = promote;
  }
  if (original ? !!original.attributes?.sticky !== sticky : sticky) {
    attrs.sticky = sticky;
  }
  if (value['revision_log']) {
    attrs.revision_log = value['revision_log'];
  }
  const alias = normalizeAlias(value['path_alias']);
  const originalAlias = original?.attributes?.path?.alias ?? '';
  if (original ? alias !== originalAlias : alias) {
    attrs.path = { alias: alias || null };
  }
  // Translation PATCH requests use the language prefix; langcode would retarget the node.
  if (!originalNode && !editUuid && lang) {
    attrs.langcode = lang;
  }
  const writable = schema?.baseFields ?? {};
  return Object.fromEntries(
    Object.entries(attrs)
      .filter(([key]) => !!writable[key])
      .map(([key, fieldValue]) => [writable[key], fieldValue])
  );
}

function normalizeAlias(raw: unknown): string {
  const alias = typeof raw === 'string' ? raw.trim() : '';
  if (!alias) {
    return '';
  }
  return alias.startsWith('/') ? alias : `/${alias}`;
}

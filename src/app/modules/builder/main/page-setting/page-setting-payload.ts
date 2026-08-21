import { encodeMetaTags, type MetaTags } from '@core/util/builder-page.util';

/**
 * Build the JSON:API attributes patch.
 *
 * @param value form model
 * @param storedMetaTags tags currently on the node, merged under the form values so
 * tags managed in the Drupal metatag form (og:*, …) survive a builder update
 */
export function buildPageSettingAttributes(value: any, storedMetaTags: MetaTags = {}): object {
  const { title, is_transparent, transparent_style, type, meta_tags } = value;
  const common = {
    title,
  };
  if (type === 'node--landing_page') {
    return {
      ...common,
      is_transparent,
      transparent_style,
      meta_tags: encodeMetaTags({ ...storedMetaTags, ...meta_tags }),
    };
  }

  if (type === 'node--json') {
    return {
      ...common,
    };
  }

  return {};
}

export function buildPageSettingRelationships(value: any, userId: string | undefined): object {
  const { page_group, type } = value;
  if (type === 'node--landing_page') {
    return {
      uid: {
        data: {
          type: 'user--user',
          id: userId,
        },
      },
      group: {
        data: page_group
          ? {
              type: 'taxonomy_term--page_group',
              id: page_group,
            }
          : null,
      },
    };
  }

  if (type === 'node--json') {
    return {
      uid: {
        data: {
          type: 'user--user',
          id: userId,
        },
      },
    };
  }

  return {};
}

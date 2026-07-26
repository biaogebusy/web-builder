export function buildPageSettingAttributes(value: any): object {
  const { title, is_transparent, transparent_style, type } = value;
  const common = {
    title,
  };
  if (type === 'node--landing_page') {
    return {
      ...common,
      is_transparent,
      transparent_style,
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

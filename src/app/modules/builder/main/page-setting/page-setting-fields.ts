import { decodeMetaTags, getAttrAlias, type MetaTags } from '@core/util/builder-page.util';
import type { FormlyFieldConfig } from '@ngx-formly/core';

interface PageSettingFieldsOptions {
  data: any;
  included: any[];
  getCommonField: (key: string, defaultValue: any) => FormlyFieldConfig;
  onCoverInit: (field: FormlyFieldConfig) => void;
  translate: (key: string) => string;
}

export function buildPageSettingFields({
  data,
  included,
  getCommonField,
  onCoverInit,
  translate,
}: PageSettingFieldsOptions): FormlyFieldConfig[] {
  const {
    type,
    attributes: {
      changed,
      drupal_internal__nid,
      langcode,
      title,
      path,
      meta_tags,
      is_transparent,
      transparent_style,
    },
  } = data;
  const user = included.find(item => item.type === 'user--user');
  const basicFields = [
    getCommonField('title', title.trim()),
    getCommonField(
      'alias',
      getAttrAlias({
        drupal_internal__nid,
        path,
        langcode,
      })
    ),
    {
      key: 'author',
      type: 'input',
      className: 'w-full',
      defaultValue: user.attributes.display_name,
      props: {
        label: translate('BUILDER.PAGE_SETTING.AUTHOR'),
        disabled: true,
      },
    },
    getCommonField('changed', changed),
    getCommonField('type', type),
    getCommonField('langcode', langcode),
    getCommonField('nid', drupal_internal__nid),
  ];

  if (type === 'node--landing_page') {
    const cover = included.find(item => item.type === 'file--file');
    const pageGroup = included.find(item => item.type === 'taxonomy_term--page_group');
    basicFields.splice(
      2,
      0,
      {
        key: 'page_group',
        type: 'mat-select',
        defaultValue: pageGroup ? pageGroup.id : '',
        props: {
          api: '/api/v2/taxonomy_term/page_group',
          nocache: true,
          label: translate('BUILDER.PAGE_SETTING.PAGE_CATEGORY'),
          options: [
            {
              label: translate('BUILDER.PAGE_SETTING.NONE'),
              value: null,
            },
          ],
        },
      },
      {
        key: 'cover',
        type: 'img-picker',
        defaultValue: cover ? cover.attributes.uri.url : '',
        props: {
          valueIsUUID: true,
          updateLabel: translate('BUILDER.PAGE_SETTING.UPDATE_COVER'),
          addLabel: translate('BUILDER.PAGE_SETTING.ADD_COVER'),
          deleteLabel: translate('BUILDER.PAGE_SETTING.DELETE'),
          fileName: cover ? cover.attributes.uri.url.split('/').pop() : '',
        },
        hooks: {
          onInit: onCoverInit,
        },
      },
      {
        key: 'is_transparent',
        type: 'toggle',
        defaultValue: is_transparent,
        props: {
          label: translate('BUILDER.PAGE_SETTING.HEADER_TRANSPARENT'),
        },
      },
      {
        key: 'transparent_style',
        type: 'mat-select',
        defaultValue: transparent_style,
        props: {
          label: translate('BUILDER.PAGE_SETTING.TRANSPARENT_STYLE'),
          options: [
            {
              label: translate('BUILDER.PAGE_SETTING.LIGHT'),
              value: 'light',
            },
            {
              label: translate('BUILDER.PAGE_SETTING.DARK'),
              value: 'dark',
            },
          ],
        },
        expressions: {
          hide: (field: FormlyFieldConfig) => {
            return !field.parent?.model.is_transparent;
          },
        },
      }
    );
  }

  const tabs: FormlyFieldConfig[] = [
    {
      props: {
        label: translate('BUILDER.PAGE_SETTING.BASIC'),
      },
      fieldGroup: basicFields,
    },
  ];

  // Only landing pages carry the Drupal `meta_tags` field; patching it on other
  // bundles fails, so the SEO tab stays out of their form
  if (type === 'node--landing_page') {
    tabs.push(getCommonField('meta_tags', decodeMetaTags(meta_tags)));
  }

  return [
    {
      type: 'tabs',
      fieldGroup: tabs,
    },
  ];
}

export function buildPageSettingCommonField(
  key: string,
  defaultValue: any,
  translate: (key: string) => string
): FormlyFieldConfig {
  switch (key) {
    case 'title':
      return {
        key: 'title',
        type: 'input',
        defaultValue,
        className: 'w-full',
        props: {
          label: translate('BUILDER.PAGE_SETTING.TITLE'),
          required: true,
        },
        expressions: {
          'props.disabled': 'formState.disabled',
        },
      };
    case 'changed':
      return {
        key: 'changed',
        type: 'input',
        className: 'w-full',
        defaultValue,
        props: {
          label: translate('BUILDER.PAGE_SETTING.UPDATE_TIME'),
          disabled: true,
        },
      };
    case 'langcode':
      return {
        key: 'landcode',
        type: 'input',
        className: 'w-full',
        defaultValue,
        props: {
          label: translate('BUILDER.PAGE_SETTING.LANGUAGE'),
          disabled: true,
        },
      };
    case 'nid':
      return {
        key: 'id',
        type: 'input',
        className: 'w-full',
        defaultValue,
        props: {
          label: 'nid',
          disabled: true,
        },
      };
    case 'type':
      return {
        key: 'type',
        type: 'input',
        className: 'w-full',
        defaultValue,
        props: {
          label: translate('BUILDER.PAGE_SETTING.CONTENT_TYPE'),
          disabled: true,
        },
      };
    case 'alias':
      return {
        key: 'alias',
        type: 'input',
        className: 'w-full',
        defaultValue,
        props: {
          label: translate('BUILDER.PAGE_SETTING.URL_ALIAS'),
          disabled: false,
        },
        expressions: {
          'props.disabled': 'formState.disabled',
        },
      };
    case 'meta_tags':
      return buildSeoField(defaultValue, translate);
    default:
      return {
        key,
        type: 'input',
        defaultValue,
        className: 'w-full',
        props: {
          label: key,
        },
      };
  }
}

/**
 * SEO tab backed by the Drupal metatag field. Only tags the backend renders as
 * `<meta name="…">` are offered: `NodeJson::setMate()` outputs every stored tag
 * with its metatag id as the meta name, so property-based tags (og:*, twitter:*)
 * would come out invalid without backend work.
 */
function buildSeoField(tags: MetaTags, translate: (key: string) => string): FormlyFieldConfig {
  return {
    key: 'meta_tags',
    props: {
      label: translate('BUILDER.PAGE_SETTING.SEO'),
    },
    fieldGroup: [
      {
        key: 'title',
        type: 'input',
        className: 'w-full',
        defaultValue: tags.title ?? '',
        props: {
          label: translate('BUILDER.PAGE_SETTING.SEO_TITLE'),
          placeholder: translate('BUILDER.PAGE_SETTING.SEO_TITLE_PLACEHOLDER'),
        },
      },
      {
        key: 'description',
        type: 'textarea',
        className: 'w-full',
        defaultValue: tags.description ?? '',
        props: {
          label: translate('BUILDER.PAGE_SETTING.PAGE_DESC'),
          placeholder: translate('BUILDER.PAGE_SETTING.SEO_DESC_PLACEHOLDER'),
          rows: 2,
        },
      },
      {
        key: 'keywords',
        type: 'input',
        className: 'w-full',
        defaultValue: tags.keywords ?? '',
        props: {
          label: translate('BUILDER.PAGE_SETTING.SEO_KEYWORDS'),
          placeholder: translate('BUILDER.PAGE_SETTING.SEO_KEYWORDS_PLACEHOLDER'),
        },
      },
      {
        key: 'robots',
        type: 'select',
        className: 'w-full',
        defaultValue: tags.robots ?? '',
        props: {
          label: translate('BUILDER.PAGE_SETTING.SEO_ROBOTS'),
          options: [
            {
              label: translate('BUILDER.PAGE_SETTING.SEO_ROBOTS_DEFAULT'),
              value: '',
            },
            {
              label: translate('BUILDER.PAGE_SETTING.SEO_ROBOTS_INDEX'),
              value: 'index, follow',
            },
            {
              label: translate('BUILDER.PAGE_SETTING.SEO_ROBOTS_NOINDEX'),
              value: 'noindex, nofollow',
            },
          ],
        },
      },
    ],
  };
}

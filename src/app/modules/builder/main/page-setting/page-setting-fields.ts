import { getAttrAlias } from '@core/util/builder-page.util';
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
  const fields = [
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
    getCommonField('description', meta_tags?.description),
  ];

  if (type === 'node--landing_page') {
    const cover = included.find(item => item.type === 'file--file');
    const pageGroup = included.find(item => item.type === 'taxonomy_term--page_group');
    fields.splice(
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

  return fields;
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
    case 'description':
      return {
        key: 'meta_tags',
        fieldGroup: [
          {
            key: 'description',
            type: 'textarea',
            defaultValue,
            props: {
              label: translate('BUILDER.PAGE_SETTING.PAGE_DESC'),
              rows: 2,
              disabled: true,
            },
          },
        ],
      };
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

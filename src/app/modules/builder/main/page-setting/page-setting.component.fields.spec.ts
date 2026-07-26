import { signal } from '@angular/core';
import type { FormlyFieldConfig } from '@ngx-formly/core';
import { Subject, of } from 'rxjs';
import { PageSettingComponent } from './page-setting.component';

function createFacade(type: 'node--landing_page' | 'node--json') {
  const instant = vi.fn((key: string) => key);
  const updateAttributes = vi.fn(() => of(true));
  const openSnackbar = vi.fn();
  const user = vi.fn(() => ({ id: 'user-1' }));
  const component = Object.create(PageSettingComponent.prototype) as any;

  component.loading = signal(false);
  component.fields = [];
  component.screenService = { isPlatformBrowser: vi.fn(() => true) };
  component.translate = { instant };
  component.builderService = { updateAttributes };
  component.destroyRef = { onDestroy: vi.fn(() => vi.fn()) };
  component.util = { openSnackbar };
  component.user = user;
  component.content = vi.fn(() => ({
    content: {
      data: {
        id: 'page-1',
        type,
        attributes: {
          changed: '2026-07-25T08:00:00Z',
          drupal_internal__nid: 42,
          langcode: 'en',
          title: '  Page title  ',
          path: { alias: '/landing' },
          meta_tags: { description: 'Page description' },
          is_transparent: true,
          transparent_style: 'dark',
        },
      },
      included: [
        {
          type: 'user--user',
          attributes: { display_name: 'Page author' },
        },
        {
          type: 'file--file',
          attributes: { uri: { url: '/sites/default/files/cover.png' } },
        },
        {
          id: 'group-1',
          type: 'taxonomy_term--page_group',
        },
      ],
    },
  }));

  const getCommonField = vi.spyOn(component, 'getCommonField');
  component.ngOnInit();

  return { component, getCommonField, instant, openSnackbar, updateAttributes, user };
}

function getField(fields: FormlyFieldConfig[], key: string): FormlyFieldConfig {
  const field = fields.find(item => item.key === key);
  if (!field) {
    throw new Error(`Missing field: ${key}`);
  }
  return field;
}

describe('PageSettingComponent fields façade', () => {
  it('keeps landing page field order, defaults, labels, and special keys', () => {
    const { component, getCommonField, instant } = createFacade('node--landing_page');

    expect(component.fields.map((field: FormlyFieldConfig) => field.key)).toEqual([
      'title',
      'alias',
      'page_group',
      'cover',
      'is_transparent',
      'transparent_style',
      'author',
      'changed',
      'type',
      'landcode',
      'id',
      'meta_tags',
    ]);
    expect(getField(component.fields, 'title').defaultValue).toBe('Page title');
    expect(getField(component.fields, 'alias').defaultValue).toBe('/en/landing');
    expect(getField(component.fields, 'page_group').defaultValue).toBe('group-1');
    expect(getField(component.fields, 'cover')).toMatchObject({
      defaultValue: '/sites/default/files/cover.png',
      props: {
        valueIsUUID: true,
        fileName: 'cover.png',
      },
    });
    expect(getField(component.fields, 'is_transparent').defaultValue).toBe(true);
    expect(getField(component.fields, 'transparent_style').defaultValue).toBe('dark');
    expect(getField(component.fields, 'author').defaultValue).toBe('Page author');
    expect(getField(component.fields, 'landcode').defaultValue).toBe('en');
    expect(getField(component.fields, 'id').defaultValue).toBe(42);
    expect(getField(component.fields, 'meta_tags').fieldGroup?.[0].defaultValue).toBe(
      'Page description'
    );
    expect(instant.mock.calls.map(([key]) => key)).toEqual([
      'BUILDER.PAGE_SETTING.TITLE',
      'BUILDER.PAGE_SETTING.URL_ALIAS',
      'BUILDER.PAGE_SETTING.AUTHOR',
      'BUILDER.PAGE_SETTING.UPDATE_TIME',
      'BUILDER.PAGE_SETTING.CONTENT_TYPE',
      'BUILDER.PAGE_SETTING.LANGUAGE',
      'BUILDER.PAGE_SETTING.PAGE_DESC',
      'BUILDER.PAGE_SETTING.PAGE_CATEGORY',
      'BUILDER.PAGE_SETTING.NONE',
      'BUILDER.PAGE_SETTING.UPDATE_COVER',
      'BUILDER.PAGE_SETTING.ADD_COVER',
      'BUILDER.PAGE_SETTING.DELETE',
      'BUILDER.PAGE_SETTING.HEADER_TRANSPARENT',
      'BUILDER.PAGE_SETTING.TRANSPARENT_STYLE',
      'BUILDER.PAGE_SETTING.LIGHT',
      'BUILDER.PAGE_SETTING.DARK',
    ]);
    expect(getCommonField.mock.calls.map(([key]) => key)).toEqual([
      'title',
      'alias',
      'changed',
      'type',
      'langcode',
      'nid',
      'description',
    ]);
    expect(component.type).toBe('node--landing_page');
    expect(component.loading()).toBe(false);
  });

  it('keeps JSON pages limited to the common fields', () => {
    const { component } = createFacade('node--json');

    expect(component.fields.map((field: FormlyFieldConfig) => field.key)).toEqual([
      'title',
      'alias',
      'author',
      'changed',
      'type',
      'landcode',
      'id',
      'meta_tags',
    ]);
  });

  it('keeps transparent style visibility tied to is_transparent', () => {
    const { component } = createFacade('node--landing_page');
    const field = getField(component.fields, 'transparent_style');
    const hide = field.expressions?.hide as (config: FormlyFieldConfig) => boolean;

    expect(hide({ parent: { model: { is_transparent: true } } })).toBe(false);
    expect(hide({ parent: { model: { is_transparent: false } } })).toBe(true);
  });

  it('keeps the cover update request and success notification sequence', () => {
    const { component, openSnackbar, updateAttributes, user } = createFacade('node--landing_page');
    const cover = getField(component.fields, 'cover');
    const coverChanges = new Subject<string>();
    const onInit = cover.hooks?.onInit as (field: FormlyFieldConfig) => void;

    onInit({ formControl: { valueChanges: coverChanges } } as unknown as FormlyFieldConfig);
    coverChanges.next('');
    expect(updateAttributes).not.toHaveBeenCalled();

    coverChanges.next('media-2');

    expect(updateAttributes).toHaveBeenCalledWith(
      { uuid: 'page-1', langcode: 'en' },
      '/api/v1/node/landing_page',
      {},
      {
        cover: {
          data: {
            type: 'media--image',
            id: 'media-2',
          },
        },
        uid: {
          data: {
            type: 'user--user',
            id: 'user-1',
          },
        },
      }
    );
    expect(user).toHaveBeenCalledOnce();
    expect(openSnackbar).toHaveBeenCalledWith('BUILDER.PAGE_SETTING.COVER_UPDATED');
    expect(component.loading()).toBe(false);
  });
});

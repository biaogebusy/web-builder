import type { FormlyFieldConfig } from '@ngx-formly/core';
import { getComponentSetting } from './getComponentSetting';

interface TabSummary {
  label: unknown;
  fields: (string | number)[];
}

function summarizeTabs(content: any, path = '0'): TabSummary[] {
  const tabs = getComponentSetting(content, path)[0].fieldGroup ?? [];

  return tabs.map(tab => ({
    label: tab.props?.label,
    fields: (tab.fieldGroup ?? []).map(field => summarizeField(field)),
  }));
}

function summarizeField(field: FormlyFieldConfig): string | number {
  return field.key ?? field.type ?? '<group>';
}

describe('getComponentSetting', () => {
  it('keeps layout fields between the common and animation tabs for a root component', () => {
    expect(
      summarizeTabs({
        type: 'layout-builder',
        horizontal: 'center',
        vertical: 'start',
        alignItems: 'stretch',
        gap: {},
        wrapperClass: 'layout-shell',
      })
    ).toEqual([
      {
        label: 'BUILDER.FACTORY.COMMON_TAB',
        fields: ['<group>', 'containerClasses', 'bg'],
      },
      {
        label: 'BUILDER.FACTORY.LAYOUT_TAB',
        fields: ['horizontal', 'vertical', 'alignItems', 'gap', 'wrapperClass'],
      },
      {
        label: 'BUILDER.FACTORY.ANIMATION_TAB_LABEL',
        fields: ['animate'],
      },
    ]);
  });

  it('keeps swiper settings before common settings for a nested component', () => {
    expect(summarizeTabs({ type: 'swiper', params: {} }, 'body.0')).toEqual([
      {
        label: 'BUILDER.FACTORY.SLIDESHOW_TAB',
        fields: ['tabs'],
      },
      {
        label: 'BUILDER.FACTORY.COMMON_TAB',
        fields: ['<group>', 'containerClasses', 'bg'],
      },
      {
        label: 'BUILDER.FACTORY.ANIMATION_TAB_LABEL',
        fields: ['animate'],
      },
    ]);
  });

  it('keeps text title, body, and action alignment fields in order', () => {
    expect(
      summarizeTabs({
        type: 'text',
        title: { label: 'Title' },
        body: '<p>Body</p>',
        actionsAlign: 'end',
      })
    ).toEqual([
      {
        label: 'BUILDER.FACTORY.COMMON_TAB',
        fields: ['<group>', 'containerClasses', 'bg'],
      },
      {
        label: 'BUILDER.FACTORY.TEXT_TAB_LABEL',
        fields: ['title', 'body', 'actionsAlign'],
      },
      {
        label: 'BUILDER.FACTORY.ANIMATION_TAB_LABEL',
        fields: ['animate'],
      },
    ]);
  });

  it('keeps carousel title and swiper settings as separate tabs', () => {
    expect(
      summarizeTabs({
        type: 'carousel-1v1',
        title: { label: 'Carousel title' },
        swiper: { params: {} },
      })
    ).toEqual([
      {
        label: 'BUILDER.FACTORY.COMMON_TAB',
        fields: ['<group>', 'containerClasses', 'bg'],
      },
      {
        label: 'BUILDER.FACTORY.TITLE_TAB',
        fields: ['title'],
      },
      {
        label: 'BUILDER.FACTORY.SLIDESHOW_TAB',
        fields: ['swiper'],
      },
      {
        label: 'BUILDER.FACTORY.ANIMATION_TAB_LABEL',
        fields: ['animate'],
      },
    ]);
  });

  it.each(['future-widget', 'constructor'])(
    'keeps unknown component type %s on the existing no-visual-settings fallback',
    type => {
      expect(summarizeTabs({ type })).toEqual([
        {
          label: 'BUILDER.FACTORY.COMMON_TAB',
          fields: ['<group>', 'containerClasses', 'bg'],
        },
        {
          label: 'BUILDER.FACTORY.WIDGET_TAB',
          fields: ['<group>'],
        },
        {
          label: 'BUILDER.FACTORY.ANIMATION_TAB_LABEL',
          fields: ['animate'],
        },
      ]);
    }
  );
});

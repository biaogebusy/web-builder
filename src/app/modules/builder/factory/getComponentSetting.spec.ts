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
  return (field.key ?? field.type ?? '<group>') as string | number;
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

  it('keeps webform id, submit button, and wrapper class fields for a dynamic form', () => {
    expect(
      summarizeTabs({
        type: 'dynamic-form',
        form: { type: 'formly', id: 'contact', fields: [] },
        action: {
          classes: 'flex justify-center mt-4',
          submit: { type: 'btn', mode: 'flat', color: 'primary', label: 'Submit' },
        },
      })
    ).toEqual([
      {
        label: 'BUILDER.FACTORY.COMMON_TAB',
        fields: ['<group>', 'containerClasses', 'bg'],
      },
      {
        label: 'BUILDER.FACTORY.FORM_TAB',
        fields: ['form', 'sync-webform', 'action', 'formClasses', 'classes'],
      },
      {
        label: 'BUILDER.FACTORY.ANIMATION_TAB_LABEL',
        fields: ['animate'],
      },
    ]);
  });

  it('keeps chart fields on real EChartsOption paths so the model merges back cleanly', () => {
    expect(
      summarizeTabs({
        type: 'chart',
        series: [{ type: 'bar', name: 'Sales', data: [10, 20, 30] }],
        title: { text: 'My Chart' },
        xAxis: { type: 'category' },
        yAxis: { type: 'value' },
      })
    ).toEqual([
      {
        label: 'BUILDER.FACTORY.COMMON_TAB',
        fields: ['<group>', 'containerClasses', 'bg'],
      },
      {
        label: 'BUILDER.FACTORY.CHART_TAB',
        fields: [
          'series.0.type',
          'series.0.name',
          'series.0.label.show',
          'title.show',
          'title.text',
          'title.subtext',
          'title.left',
        ],
      },
      {
        label: 'BUILDER.FACTORY.CHART_LEGEND_TAB',
        fields: ['legend.show', 'legend.left', 'legend.top', 'legend.orient'],
      },
      {
        label: 'BUILDER.FACTORY.CHART_TOOLTIP_TAB',
        fields: ['tooltip.show', 'tooltip.trigger'],
      },
      {
        label: 'BUILDER.FACTORY.CHART_AXIS_TAB',
        fields: [
          'xAxis.show',
          'xAxis.type',
          'xAxis.name',
          'yAxis.show',
          'yAxis.type',
          'yAxis.name',
          'grid.left',
          'grid.right',
          'grid.top',
          'grid.bottom',
        ],
      },
      {
        label: 'BUILDER.FACTORY.TAB_LABEL_DATA',
        fields: ['chart-data'],
      },
      {
        label: 'BUILDER.FACTORY.ANIMATION_TAB_LABEL',
        fields: ['animate'],
      },
    ]);
  });

  it('seeds the chart type select from the existing series so the value is never blank', () => {
    const tabs = getComponentSetting({ type: 'chart', series: [{ type: 'pie' }] }, '0')[0].fieldGroup;
    const chartTab = tabs?.find(tab => tab.props?.label === 'BUILDER.FACTORY.CHART_TAB');
    const typeField = chartTab?.fieldGroup?.find(field => field.key === 'series.0.type');

    expect(typeField?.defaultValue).toBe('pie');
  });

  it('does not seed a legend, tooltip, or title onto a chart that never declared one', () => {
    const tabs = getComponentSetting({ type: 'chart', series: [{ type: 'bar' }] }, '0')[0].fieldGroup;
    const showOf = (label: string, key: string) =>
      tabs
        ?.find(tab => tab.props?.label === label)
        ?.fieldGroup?.find(field => field.key === key)?.defaultValue;

    expect(showOf('BUILDER.FACTORY.CHART_LEGEND_TAB', 'legend.show')).toBe(false);
    expect(showOf('BUILDER.FACTORY.CHART_TOOLTIP_TAB', 'tooltip.show')).toBe(false);
    expect(showOf('BUILDER.FACTORY.CHART_TAB', 'title.show')).toBe(false);
  });

  it('leaves grid padding unseeded so an untouched chart keeps the ECharts default', () => {
    const tabs = getComponentSetting({ type: 'chart', series: [{ type: 'bar' }] }, '0')[0].fieldGroup;
    const axisTab = tabs?.find(tab => tab.props?.label === 'BUILDER.FACTORY.CHART_AXIS_TAB');

    expect(
      axisTab?.fieldGroup?.filter(field => String(field.key).startsWith('grid.'))
        .every(field => field.defaultValue === undefined)
    ).toBe(true);
  });

  it('omits the axis tab for a non-cartesian series instead of showing a blank tab', () => {
    // the tabs type renders a header per fieldGroup entry regardless of `hide`
    const labels = (type: string) =>
      getComponentSetting({ type: 'chart', series: [{ type }] }, '0')[0].fieldGroup?.map(
        tab => tab.props?.label
      );

    expect(labels('pie')).not.toContain('BUILDER.FACTORY.CHART_AXIS_TAB');
    expect(labels('line')).toContain('BUILDER.FACTORY.CHART_AXIS_TAB');
  });

  it('passes the component path to the chart data editor', () => {
    const tabs = getComponentSetting({ type: 'chart' }, 'body.2.elements.0')[0].fieldGroup;
    const dataTab = tabs?.find(tab => tab.props?.label === 'BUILDER.FACTORY.TAB_LABEL_DATA');

    expect(dataTab?.fieldGroup?.[0].props?.['path']).toBe('body.2.elements.0');
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

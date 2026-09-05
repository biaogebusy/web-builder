import type { FormlyFieldConfig } from '@ngx-formly/core';

// Kept in sync with the echarts.use() registration list in ChartComponent: a type
// outside that list renders blank, and an existing chart must still show its own
// type in the select, so the two lists move together.
const CHART_TYPES = [
  { label: 'Bar', value: 'bar' },
  { label: 'Line', value: 'line' },
  { label: 'Pie', value: 'pie' },
  { label: 'Scatter', value: 'scatter' },
  { label: 'Radar', value: 'radar' },
  { label: 'Funnel', value: 'funnel' },
  { label: 'Gauge', value: 'gauge' },
  { label: 'Candlestick', value: 'candlestick' },
  { label: 'Graph', value: 'graph' },
  { label: 'Tree', value: 'tree' },
  { label: 'Sunburst', value: 'sunburst' },
  { label: 'Sankey', value: 'sankey' },
  { label: 'ThemeRiver', value: 'themeRiver' },
  { label: 'Map', value: 'map' },
];

const AXIS_TYPES = [
  { label: 'Category', value: 'category' },
  { label: 'Value', value: 'value' },
  { label: 'Time', value: 'time' },
  { label: 'Log', value: 'log' },
];

const TOOLTIP_TRIGGERS = [
  { label: 'Item', value: 'item' },
  { label: 'Axis', value: 'axis' },
  { label: 'BUILDER.FACTORY.NONE', value: 'none' },
];

const H_POSITIONS = [
  { label: 'BUILDER.FACTORY.LEFT', value: 'left' },
  { label: 'BUILDER.FACTORY.CENTER', value: 'center' },
  { label: 'BUILDER.FACTORY.RIGHT', value: 'right' },
];

const V_POSITIONS = [
  { label: 'BUILDER.FACTORY.TOP', value: 'top' },
  { label: 'BUILDER.FACTORY.CENTER', value: 'middle' },
  { label: 'BUILDER.FACTORY.BOTTOM', value: 'bottom' },
];

// Only these series read xAxis/yAxis/grid. ChartComponent strips stale axes for
// every other type, so the axis tab is left out for them entirely.
const CARTESIAN_TYPES = ['bar', 'line', 'scatter', 'candlestick'];

/**
 * Visual settings for the top-level `chart` component.
 *
 * Every key is a real EChartsOption path (`series.0.type`, `legend.show`, …) so the
 * form model merges straight back onto the option object the component feeds to
 * `setOption`, leaving no builder-only keys behind in the saved page JSON.
 *
 * `show` toggles default to whether the section exists today rather than to the
 * ECharts default: seeding `legend`/`tooltip`/`title` on a chart that never had one
 * would add it to the page the first time the drawer writes back.
 */
export function getChart(widget: any, path: string): FormlyFieldConfig[] {
  // The tabs type renders a header per entry regardless of `hide`, so the axis tab
  // is included or dropped here rather than hidden — otherwise a pie chart would
  // show a blank axis tab. Switching type re-reads this when the drawer re-opens.
  const cartesian = CARTESIAN_TYPES.includes(widget?.series?.[0]?.type ?? 'bar');

  return [
    {
      props: {
        label: 'BUILDER.FACTORY.CHART_TAB',
      },
      fieldGroupClassName: 'grid grid-cols-12 gap-3',
      fieldGroup: [
        {
          key: 'series.0.type',
          type: 'select',
          className: 'col-span-12',
          defaultValue: widget?.series?.[0]?.type ?? 'bar',
          props: {
            label: 'BUILDER.FACTORY.CHART_TYPE',
            options: CHART_TYPES,
          },
        },
        {
          key: 'series.0.name',
          type: 'input',
          className: 'col-span-12',
          defaultValue: widget?.series?.[0]?.name ?? '',
          props: {
            label: 'BUILDER.FACTORY.CHART_SERIES_NAME',
          },
        },
        {
          key: 'series.0.label.show',
          type: 'toggle',
          className: 'col-span-12',
          defaultValue: widget?.series?.[0]?.label?.show ?? false,
          props: {
            label: 'BUILDER.FACTORY.CHART_SERIES_LABEL',
          },
        },
        {
          key: 'title.show',
          type: 'toggle',
          className: 'col-span-12',
          defaultValue: widget?.title?.show ?? !!widget?.title,
          props: {
            label: 'BUILDER.FACTORY.SHOW_TITLE',
          },
        },
        {
          key: 'title.text',
          type: 'input',
          className: 'col-span-12',
          defaultValue: widget?.title?.text ?? '',
          props: {
            label: 'BUILDER.FACTORY.TITLE',
          },
        },
        {
          key: 'title.subtext',
          type: 'input',
          className: 'col-span-12',
          defaultValue: widget?.title?.subtext ?? '',
          props: {
            label: 'BUILDER.FACTORY.SUBTITLE',
          },
        },
        {
          key: 'title.left',
          type: 'select',
          className: 'col-span-12',
          defaultValue: widget?.title?.left ?? 'left',
          props: {
            label: 'BUILDER.FACTORY.ALIGN',
            options: H_POSITIONS,
          },
        },
      ],
    },
    {
      props: {
        label: 'BUILDER.FACTORY.CHART_LEGEND_TAB',
      },
      fieldGroupClassName: 'grid grid-cols-12 gap-3',
      fieldGroup: [
        {
          key: 'legend.show',
          type: 'toggle',
          className: 'col-span-12',
          defaultValue: widget?.legend?.show ?? !!widget?.legend,
          props: {
            label: 'BUILDER.FACTORY.SHOW',
          },
        },
        {
          key: 'legend.left',
          type: 'select',
          className: 'col-span-6',
          defaultValue: widget?.legend?.left ?? 'center',
          props: {
            label: 'BUILDER.FACTORY.HORIZONTAL_DIR',
            options: H_POSITIONS,
          },
          expressions: { hide: '!model.legend?.show' },
        },
        {
          key: 'legend.top',
          type: 'select',
          className: 'col-span-6',
          defaultValue: widget?.legend?.top ?? 'top',
          props: {
            label: 'BUILDER.FACTORY.VERTICAL_DIR',
            options: V_POSITIONS,
          },
          expressions: { hide: '!model.legend?.show' },
        },
        {
          key: 'legend.orient',
          type: 'select',
          className: 'col-span-12',
          defaultValue: widget?.legend?.orient ?? 'horizontal',
          props: {
            label: 'BUILDER.FACTORY.DIRECTION',
            options: [
              { label: 'BUILDER.FACTORY.HORIZONTAL_DIR', value: 'horizontal' },
              { label: 'BUILDER.FACTORY.VERTICAL_DIR', value: 'vertical' },
            ],
          },
          expressions: { hide: '!model.legend?.show' },
        },
      ],
    },
    {
      props: {
        label: 'BUILDER.FACTORY.CHART_TOOLTIP_TAB',
      },
      fieldGroupClassName: 'grid grid-cols-12 gap-3',
      fieldGroup: [
        {
          key: 'tooltip.show',
          type: 'toggle',
          className: 'col-span-12',
          defaultValue: widget?.tooltip?.show ?? !!widget?.tooltip,
          props: {
            label: 'BUILDER.FACTORY.SHOW',
          },
        },
        {
          key: 'tooltip.trigger',
          type: 'select',
          className: 'col-span-12',
          defaultValue: widget?.tooltip?.trigger ?? 'item',
          props: {
            label: 'BUILDER.FACTORY.CHART_TRIGGER',
            options: TOOLTIP_TRIGGERS,
          },
          expressions: { hide: '!model.tooltip?.show' },
        },
      ],
    },
    ...(cartesian ? [getAxisTab(widget)] : []),
    {
      props: {
        label: 'BUILDER.FACTORY.TAB_LABEL_DATA',
      },
      fieldGroup: [
        {
          type: 'chart-data',
          props: { path },
        },
      ],
    },
  ];
}

/**
 * Axis and plot-area padding, for cartesian series only.
 *
 * Grid padding is left unseeded on purpose: writing a default grid would shift the
 * plot area of every chart that never declared one.
 */
function getAxisTab(widget: any): FormlyFieldConfig {
  return {
    props: {
      label: 'BUILDER.FACTORY.CHART_AXIS_TAB',
    },
    fieldGroupClassName: 'grid grid-cols-12 gap-3',
    fieldGroup: [
      {
        key: 'xAxis.show',
        type: 'toggle',
        className: 'col-span-12',
        defaultValue: widget?.xAxis?.show ?? true,
        props: {
          label: 'BUILDER.FACTORY.CHART_X_AXIS',
        },
      },
      {
        key: 'xAxis.type',
        type: 'select',
        className: 'col-span-6',
        defaultValue: widget?.xAxis?.type ?? 'category',
        props: {
          label: 'BUILDER.FACTORY.CHART_AXIS_TYPE',
          options: AXIS_TYPES,
        },
      },
      {
        key: 'xAxis.name',
        type: 'input',
        className: 'col-span-6',
        defaultValue: widget?.xAxis?.name ?? '',
        props: {
          label: 'BUILDER.FACTORY.CHART_AXIS_NAME',
        },
      },
      {
        key: 'yAxis.show',
        type: 'toggle',
        className: 'col-span-12',
        defaultValue: widget?.yAxis?.show ?? true,
        props: {
          label: 'BUILDER.FACTORY.CHART_Y_AXIS',
        },
      },
      {
        key: 'yAxis.type',
        type: 'select',
        className: 'col-span-6',
        defaultValue: widget?.yAxis?.type ?? 'value',
        props: {
          label: 'BUILDER.FACTORY.CHART_AXIS_TYPE',
          options: AXIS_TYPES,
        },
      },
      {
        key: 'yAxis.name',
        type: 'input',
        className: 'col-span-6',
        defaultValue: widget?.yAxis?.name ?? '',
        props: {
          label: 'BUILDER.FACTORY.CHART_AXIS_NAME',
        },
      },
      {
        key: 'grid.left',
        type: 'input',
        className: 'col-span-6',
        defaultValue: widget?.grid?.left,
        props: {
          label: 'BUILDER.FACTORY.CHART_GRID_LEFT',
          placeholder: '10%',
        },
      },
      {
        key: 'grid.right',
        type: 'input',
        className: 'col-span-6',
        defaultValue: widget?.grid?.right,
        props: {
          label: 'BUILDER.FACTORY.CHART_GRID_RIGHT',
          placeholder: '10%',
        },
      },
      {
        key: 'grid.top',
        type: 'input',
        className: 'col-span-6',
        defaultValue: widget?.grid?.top,
        props: {
          label: 'BUILDER.FACTORY.CHART_GRID_TOP',
          placeholder: '60',
        },
      },
      {
        key: 'grid.bottom',
        type: 'input',
        className: 'col-span-6',
        defaultValue: widget?.grid?.bottom,
        props: {
          label: 'BUILDER.FACTORY.CHART_GRID_BOTTOM',
          placeholder: '60',
        },
      },
    ],
  };
}

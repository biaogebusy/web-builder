let library: Promise<typeof import('echarts/core')> | undefined;

/** Load only the modules needed by pie charts when a browser view first requests them. */
export function loadPieChart(): Promise<typeof import('echarts/core')> {
  return library ??= Promise.all([
    import('echarts/core'), import('echarts/charts'),
    import('echarts/components'), import('echarts/renderers'),
  ]).then(([core, charts, components, renderers]) => {
    core.use([charts.PieChart, components.TooltipComponent, renderers.CanvasRenderer]);
    return core;
  });
}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideCoreMocks } from '@core/testing/mocks';
import { BuilderState } from '@core/state/BuilderState';

import { ChartDataComponent } from './chart-data.component';

describe('ChartDataComponent', () => {
  let component: ChartDataComponent;
  let fixture: ComponentFixture<ChartDataComponent>;
  let builder: any;

  const datasetChart = {
    type: 'chart',
    series: [{ type: 'bar' }],
    dataset: [{ source: [['name', 'value'], ['A', 9], ['B', 8], ['C', 7]] }],
  };

  function init(live: any, path = '0'): void {
    builder.currentPage = { title: '', body: [live] };
    fixture = TestBed.createComponent(ChartDataComponent);
    component = fixture.componentInstance;
    component.field = {
      props: { path },
      formState: {},
      options: { showError: () => false },
    } as any;
    component.ngOnInit();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartDataComponent],
      providers: [provideRouter([]), ...provideCoreMocks()],
    }).compileComponents();

    builder = TestBed.inject(BuilderState);
  });

  it('seeds the editor from the dataset with one row per line', () => {
    init(datasetChart);

    expect(component.draft()).toBe(
      '[\n  ["name","value"],\n  ["A",9],\n  ["B",8],\n  ["C",7]\n]'
    );
  });

  it('replaces the dataset rows instead of merging them', () => {
    init(datasetChart);
    component.draft.set('[["name","value"],["A",1]]');

    component.onApply();

    const [path, content] = builder.updatePageContentByPath.mock.calls[0];
    expect(path).toBe('0');
    // the removed rows are gone: a defaultsDeep merge would have kept B and C
    expect(content.dataset[0].source).toEqual([['name', 'value'], ['A', 1]]);
    expect(content.series).toEqual(datasetChart.series);
  });

  it('re-opens the drawer from the refreshed node', () => {
    init(datasetChart);
    component.draft.set('[["name","value"]]');

    component.onApply();

    const [content] = builder.updatePageContentByPath.mock.calls[0].slice(1);
    expect(builder.showComponentSetting).toHaveBeenCalledWith(content, expect.anything(), '0');
  });

  it('writes series data when the chart has no dataset', () => {
    init({ type: 'chart', series: [{ type: 'line', data: [1, 2, 3] }] });
    expect(component.draft()).toBe('[\n  1,\n  2,\n  3\n]');

    component.draft.set('[4,5]');
    component.onApply();

    const [, content] = builder.updatePageContentByPath.mock.calls[0];
    expect(content.series[0].data).toEqual([4, 5]);
    expect(content.dataset).toBeUndefined();
  });

  it('rejects invalid JSON without touching the page', () => {
    init(datasetChart);
    component.draft.set('[["A",1],');

    component.onApply();

    expect(builder.updatePageContentByPath).not.toHaveBeenCalled();
    expect(component.error()).toBe('BUILDER.FACTORY.CHART_DATA_INVALID_JSON');
  });

  it('rejects JSON that is not an array without touching the page', () => {
    init(datasetChart);
    component.draft.set('{"a":1}');

    component.onApply();

    expect(builder.updatePageContentByPath).not.toHaveBeenCalled();
    expect(component.error()).toBe('BUILDER.FACTORY.CHART_DATA_ARRAY_EXPECTED');
  });

  it('reports a missing page node instead of writing at a stale path', () => {
    init(datasetChart, '9.nope');

    component.onApply();

    expect(builder.updatePageContentByPath).not.toHaveBeenCalled();
    expect(component.error()).toBe('BUILDER.FACTORY.CHART_DATA_NO_NODE');
  });
});

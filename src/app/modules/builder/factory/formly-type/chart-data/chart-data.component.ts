import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import { get } from 'lodash-es';
import { BuilderState } from '@core/state/BuilderState';
import type { IBtn } from '@core/interface/widgets/IBtn';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';
import { getComponentSetting } from '@modules/builder/factory/getComponentSetting';

/** Where the chart keeps its rows: an ECharts dataset, or plain series data. */
type DataMode = 'dataset' | 'series';

/**
 * The data editor of the chart settings tab.
 *
 * Rows have to be written straight to the page instead of through the settings
 * model: the drawer merges its model with `defaultsDeep`, which fills arrays in
 * index by index, so a row the user removed would survive the merge. Applying
 * here replaces the array outright.
 *
 * Builder-only: registered from the layout-setting component providers, so it
 * never reaches the formly bundles that public pages load.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'formly-field-chart-data',
  template: `
    <div class="chart-data flex flex-col gap-2">
      <label class="text-xs" [attr.for]="textareaId" [style.color]="'var(--mat-sys-on-surface-variant)'">
        {{ label() }}
      </label>
      <textarea
        [id]="textareaId"
        class="w-full rounded-md p-2 font-mono text-xs"
        rows="10"
        spellcheck="false"
        [value]="draft()"
        (input)="onInput($event)"
        [style.border]="'1px solid var(--mat-sys-outline-variant)'"
        [style.background]="'var(--mat-sys-surface)'"
        [style.color]="'var(--mat-sys-on-surface)'"
      ></textarea>
      @if (error()) {
        <div class="text-xs" role="alert" [style.color]="'var(--mat-sys-error)'">{{ error() }}</div>
      }
      <app-btn [content]="applyBtn()" (click)="onApply()" />
    </div>
  `,
  imports: [BtnComponent],
})
export class ChartDataComponent extends FieldType implements OnInit {
  private builder = inject(BuilderState);
  private translate = inject(TranslateService);

  readonly textareaId = `chart-data-${Math.random().toString(36).slice(2, 9)}`;
  public draft = signal('');
  public error = signal('');

  readonly label = computed(() => this.translate.instant('BUILDER.FACTORY.CHART_DATA_SOURCE'));
  readonly applyBtn = computed<IBtn>(() => ({
    label: this.translate.instant('BUILDER.FACTORY.CHART_DATA_APPLY'),
    color: 'primary',
    mode: 'stroked',
  }));

  ngOnInit(): void {
    const live = this.liveNode();
    this.draft.set(format(readRows(live)));
  }

  onInput(event: Event): void {
    this.draft.set((event.target as HTMLTextAreaElement).value);
    this.error.set('');
  }

  onApply(): void {
    const path = this.props['path'] as string;
    const live = this.liveNode();
    if (!live) {
      this.error.set(this.translate.instant('BUILDER.FACTORY.CHART_DATA_NO_NODE'));
      return;
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(this.draft());
    } catch {
      this.error.set(this.translate.instant('BUILDER.FACTORY.CHART_DATA_INVALID_JSON'));
      return;
    }
    if (!Array.isArray(parsed)) {
      this.error.set(this.translate.instant('BUILDER.FACTORY.CHART_DATA_ARRAY_EXPECTED'));
      return;
    }

    this.error.set('');
    const content = writeRows(live, parsed);
    this.builder.updatePageContentByPath(path, content);
    // The drawer still holds the pre-apply node, so a later model merge would
    // re-seed the old rows; re-open it from the refreshed page node instead.
    this.builder.showComponentSetting(content, getComponentSetting(content, path), path);
  }

  private liveNode(): any {
    const path = this.props?.['path'] as string;
    return path ? get(this.builder.currentPage?.body, path) : null;
  }
}

/** Reads the rows the chart renders today, preferring an explicit dataset. */
function readRows(live: any): unknown[] {
  return modeOf(live) === 'dataset'
    ? live?.dataset?.[0]?.source ?? []
    : live?.series?.[0]?.data ?? [];
}

/** Replaces the rows in place, leaving every other option key untouched. */
function writeRows(live: any, rows: unknown[]): any {
  if (modeOf(live) === 'dataset') {
    const rest = Array.isArray(live.dataset) ? live.dataset.slice(1) : [];
    return { ...live, dataset: [{ ...(live?.dataset?.[0] ?? {}), source: rows }, ...rest] };
  }
  const series = Array.isArray(live.series) ? live.series : [{}];
  return {
    ...live,
    series: series.map((s: any, i: number) => (i === 0 ? { ...s, data: rows } : s)),
  };
}

// A chart that declares neither shape gets a dataset: it is what the API-backed
// chart-box produces, and what the cartesian/pie defaults read.
function modeOf(live: any): DataMode {
  if (live?.dataset?.[0]?.source !== undefined) {
    return 'dataset';
  }
  return live?.series?.[0]?.data !== undefined ? 'series' : 'dataset';
}

/** One row per line: `JSON.stringify(rows, null, 2)` puts every cell on its own line. */
function format(rows: unknown[]): string {
  if (!Array.isArray(rows) || rows.length === 0) {
    return '[]';
  }
  if (rows.every(row => Array.isArray(row))) {
    return `[\n${rows.map(row => `  ${JSON.stringify(row)}`).join(',\n')}\n]`;
  }
  return JSON.stringify(rows, null, 2);
}

import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SHARE_IMPORTS } from '@share/share-imports';
import { WIDGETS_IMPORTS } from '@uiux/widgets/widgets-imports';
import { NodeService } from '@core/service/node.service';
import { NodeFieldFormService } from '@core/service/node-field-form.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { forkJoin, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';

const PAGE_SIZE = 20;

interface INodeRow {
  uuid: string;
  type: string;
  title: string;
  status: boolean;
  langcode: string;
  changed: string;
  path: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-node-manage',
  templateUrl: './node-manage.component.html',
  styleUrl: './node-manage.component.scss',
  imports: [SHARE_IMPORTS, WIDGETS_IMPORTS],
})
export class NodeManageComponent implements OnInit {
  private nodeService = inject(NodeService);
  private fieldFormService = inject(NodeFieldFormService);
  private util = inject(UtilitiesService);
  private router = inject(Router);
  private translate = inject(TranslateService);
  private destroyRef = inject(DestroyRef);

  public nodeTypes = signal<{ label: string; value: string }[]>([]);
  public rows = signal<INodeRow[]>([]);
  public loading = signal(true);
  /** Current content type; empty string means "all" (JSON:API collections are per-bundle, so all types are fetched then merged) */
  public type = signal('');
  /** '' all | '1' published | '0' unpublished */
  public status = signal('');
  public langcode = signal('');
  public page = signal(0);
  public hasNext = signal(false);
  /** uuid of the row currently being deleted */
  public deleting = signal('');
  /** uuid of the row awaiting a second click to confirm deletion */
  public confirmUuid = signal('');
  public searchCtrl = new FormControl('');
  public langs = environment.langs || [];
  public pageSize = PAGE_SIZE;
  /** Race protection for filter requests arriving out of order */
  private reqId = 0;
  /** Pagination: snapshot of per-source consumed offsets (type × language) at the start of each page, indexed by page number */
  private allOffsets: Record<string, number>[] = [{}];

  ngOnInit(): void {
    this.fieldFormService
      .getNodeTypes()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: types => {
          this.nodeTypes.set(types);
          if (types.length > 0) {
            this.fetchList();
          } else {
            this.loading.set(false);
          }
        },
        // Failure differs from "site has no content types": reset the loading state and notify, otherwise it would stay loading forever
        error: () => {
          this.loading.set(false);
          this.util.openSnackbar(this.translate.instant('BUILDER.NODE_MANAGE.LOAD_FAILED'), 'ok');
        },
      });

    this.searchCtrl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.onFilterChange());
  }

  switchType(type: string): void {
    if (type !== this.type()) {
      this.type.set(type);
      this.onFilterChange();
    }
  }

  onTypeSelect(event: Event): void {
    this.switchType((event.target as HTMLSelectElement).value);
  }

  onStatusSelect(event: Event): void {
    this.status.set((event.target as HTMLSelectElement).value);
    this.onFilterChange();
  }

  onLangSelect(event: Event): void {
    this.langcode.set((event.target as HTMLSelectElement).value);
    this.onFilterChange();
  }

  onFilterChange(): void {
    this.page.set(0);
    this.allOffsets = [{}];
    this.fetchList();
  }

  fetchList(): void {
    this.loading.set(true);
    this.confirmUuid.set('');
    const id = ++this.reqId;
    const sources = this.buildSources();
    if (sources.length === 0) {
      this.rows.set([]);
      this.hasNext.set(false);
      this.loading.set(false);
      return;
    }
    const offsets = this.allOffsets[this.page()] ?? {};
    forkJoin(
      sources.map(source =>
        this.nodeService
          .fetch(
            `/api/v1/node/${source.type}`,
            this.buildParams(offsets[this.sourceKey(source)] ?? 0, source.lang),
            this.requestLang(source.lang)
          )
          // A single source failing (e.g. no view permission) must not break the whole page; skip it as null
          .pipe(catchError(() => of(null)))
      )
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(results => {
        if (id !== this.reqId) {
          return;
        }
        if (results.every(res => res === null)) {
          this.onLoadError('所有内容类型均加载失败');
          return;
        }
        const merged = results
          .flatMap((res, i) =>
            (res?.data || []).map((node: any) => ({
              row: this.toRow(node, sources[i].type),
              key: this.sourceKey(sources[i]),
            }))
          )
          .sort((a, b) =>
            a.row.changed === b.row.changed ? 0 : a.row.changed < b.row.changed ? 1 : -1
          );
        const consumed = merged.slice(0, PAGE_SIZE);
        const nextOffsets = { ...offsets };
        consumed.forEach(item => {
          nextOffsets[item.key] = (nextOffsets[item.key] ?? 0) + 1;
        });
        this.allOffsets[this.page() + 1] = nextOffsets;
        this.rows.set(consumed.map(item => item.row));
        this.hasNext.set(merged.length > PAGE_SIZE || results.some(res => !!res?.links?.next));
        this.loading.set(false);
      });
  }

  /**
   * One request per (content type × language): a JSON:API collection renders
   * each node once — in the request language, falling back to the source
   * language when the translation is missing. Listing every language version
   * therefore needs one language-prefixed request per language, with a
   * matching langcode filter that drops the fallback rows (a node without
   * the requested translation falls back and reports another langcode).
   */
  private buildSources(): { type: string; lang: string }[] {
    const types = this.type() ? [this.type()] : this.nodeTypes().map(t => t.value);
    const langCodes = this.langcode()
      ? [this.langcode()]
      : this.langs.length > 1
        ? this.langs.map(l => l.langCode)
        : [''];
    return types.flatMap(type => langCodes.map(lang => ({ type, lang })));
  }

  private sourceKey(source: { type: string; lang: string }): string {
    return `${source.type}:${source.lang}`;
  }

  /** Only non-default languages have a language-prefixed API path */
  private requestLang(lang: string): string | undefined {
    return this.langs.find(l => l.langCode === lang && !l.default)?.langCode;
  }

  private toRow(node: any, type: string): INodeRow {
    return {
      uuid: node.id,
      type,
      title: node.attributes?.title,
      status: !!node.attributes?.status,
      langcode: node.attributes?.langcode,
      changed: node.attributes?.changed,
      path: this.nodeService.getNodePath(node.attributes),
    };
  }

  private onLoadError(err: any): void {
    console.error('加载内容列表失败', err);
    this.rows.set([]);
    this.hasNext.set(false);
    this.loading.set(false);
    this.util.openSnackbar(this.translate.instant('BUILDER.NODE_MANAGE.LOAD_FAILED'), 'ok');
  }

  typeLabel(type: string): string {
    return this.nodeTypes().find(t => t.value === type)?.label ?? type;
  }

  private buildParams(offset: number, lang?: string): string {
    // Management lists must always reflect the latest edits: bypass the backend
    // page cache, otherwise a freshly saved node can stay stale in the list
    const parts = ['sort=-changed', `page[limit]=${PAGE_SIZE}`, `page[offset]=${offset}`, 'noCache=1'];
    const keyword = (this.searchCtrl.value || '').trim();
    if (keyword) {
      parts.push('filter[search][condition][path]=title');
      parts.push('filter[search][condition][operator]=CONTAINS');
      parts.push(`filter[search][condition][value]=${encodeURIComponent(keyword)}`);
    }
    if (this.status() !== '') {
      parts.push(`filter[status]=${this.status()}`);
    }
    // Exact per-language bucket: nodes without this translation fall back to
    // their source language in the response; the filter removes those rows
    if (lang) {
      parts.push(`filter[langcode]=${lang}`);
    }
    return parts.join('&');
  }

  prevPage(): void {
    if (this.page() > 0) {
      this.page.set(this.page() - 1);
      this.fetchList();
    }
  }

  nextPage(): void {
    if (this.hasNext()) {
      this.page.set(this.page() + 1);
      this.fetchList();
    }
  }

  /** In "all" mode there is no current type; go back to the management center to pick a publish entry by type */
  addNode(): void {
    if (this.type()) {
      this.router.navigate(['/builder/node/add', this.type()]);
    } else {
      this.router.navigate(['/builder/hub']);
    }
  }

  onEdit(row: INodeRow): void {
    // Pass the row's language so the edit page opens that translation;
    // the default language needs no param (it is what the prefix-less URL serves)
    const lang = this.langs.find(l => l.langCode === row.langcode);
    this.router.navigate(['/builder/node/edit', row.type, row.uuid], {
      queryParams: lang && !lang.default ? { lang: row.langcode } : {},
    });
  }

  /** First click enters the confirm state; only a second click actually deletes */
  onDelete(row: INodeRow): void {
    if (this.confirmUuid() !== row.uuid) {
      this.confirmUuid.set(row.uuid);
      return;
    }
    this.confirmUuid.set('');
    this.deleting.set(row.uuid);
    this.nodeService
      .deleteEntity(`/api/v1/node/${row.type}`, row.uuid)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.deleting.set('');
          this.util.openSnackbar(this.translate.instant('BUILDER.NODE_MANAGE.DELETED'), 'ok');
          this.fetchList();
        },
        error: err => {
          this.deleting.set('');
          const message = err?.error?.errors?.[0]?.detail || err?.message || '';
          this.util.openSnackbar(
            this.translate.instant('BUILDER.NODE_MANAGE.DELETE_FAILED', { message }),
            'ok'
          );
        },
      });
  }

  cancelDelete(): void {
    this.confirmUuid.set('');
  }
}

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
  /** "All" mode pagination: snapshot of per-type consumed offsets at the start of each page, indexed by page number */
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
    if (!this.type()) {
      this.fetchAllTypes(id);
      return;
    }
    this.nodeService
      .fetch(`/api/v1/node/${this.type()}`, this.buildParams(this.page() * PAGE_SIZE))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: res => {
          if (id !== this.reqId) {
            return;
          }
          this.rows.set((res?.data || []).map((node: any) => this.toRow(node, this.type())));
          this.hasNext.set(!!res?.links?.next);
          this.loading.set(false);
        },
        error: err => {
          if (id !== this.reqId) {
            return;
          }
          this.onLoadError(err);
        },
      });
  }

  /**
   * "All" mode: JSON:API has no cross-bundle collections, so fetch the current
   * page per type concurrently and merge. Each type takes a full page sorted
   * by -changed from its own offset; the globally newest page is guaranteed to
   * fall within the union of these prefixes, so merging, sorting and slicing
   * yields exact pagination; the per-type counts actually consumed this page
   * are recorded in the next page's offset snapshot (allOffsets) and
   * pagination continues from that snapshot.
   */
  private fetchAllTypes(id: number): void {
    const types = this.nodeTypes();
    if (types.length === 0) {
      this.rows.set([]);
      this.hasNext.set(false);
      this.loading.set(false);
      return;
    }
    const offsets = this.allOffsets[this.page()] ?? {};
    forkJoin(
      types.map(type =>
        this.nodeService
          .fetch(`/api/v1/node/${type.value}`, this.buildParams(offsets[type.value] ?? 0))
          // A single type failing (e.g. no view permission) must not break the whole page; skip it as null
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
            (res?.data || []).map((node: any) => this.toRow(node, types[i].value))
          )
          .sort((a, b) => (a.changed === b.changed ? 0 : a.changed < b.changed ? 1 : -1));
        const pageRows = merged.slice(0, PAGE_SIZE);
        const nextOffsets = { ...offsets };
        pageRows.forEach(row => {
          nextOffsets[row.type] = (nextOffsets[row.type] ?? 0) + 1;
        });
        this.allOffsets[this.page() + 1] = nextOffsets;
        this.rows.set(pageRows);
        this.hasNext.set(merged.length > PAGE_SIZE || results.some(res => !!res?.links?.next));
        this.loading.set(false);
      });
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

  private buildParams(offset: number): string {
    const parts = ['sort=-changed', `page[limit]=${PAGE_SIZE}`, `page[offset]=${offset}`];
    const keyword = (this.searchCtrl.value || '').trim();
    if (keyword) {
      parts.push('filter[search][condition][path]=title');
      parts.push('filter[search][condition][operator]=CONTAINS');
      parts.push(`filter[search][condition][value]=${encodeURIComponent(keyword)}`);
    }
    if (this.status() !== '') {
      parts.push(`filter[status]=${this.status()}`);
    }
    if (this.langcode()) {
      parts.push(`filter[langcode]=${this.langcode()}`);
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
    this.router.navigate(['/builder/node/edit', row.type, row.uuid]);
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

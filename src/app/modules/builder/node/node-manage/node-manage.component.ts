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
import { TagsService } from '@core/service/tags.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

const PAGE_SIZE = 20;

interface INodeRow {
  uuid: string;
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
  private tagsService = inject(TagsService);
  private util = inject(UtilitiesService);
  private router = inject(Router);
  private translate = inject(TranslateService);
  private destroyRef = inject(DestroyRef);

  public nodeTypes = signal<{ label: string; value: string }[]>([]);
  public rows = signal<INodeRow[]>([]);
  public loading = signal(true);
  /** 当前内容类型;JSON:API 集合按 bundle 提供,须选定一个类型 */
  public type = signal('');
  /** '' 全部 | '1' 已发布 | '0' 未发布 */
  public status = signal('');
  public langcode = signal('');
  public page = signal(0);
  public hasNext = signal(false);
  /** 正在删除的行 uuid */
  public deleting = signal('');
  /** 等待二次点击确认删除的行 uuid */
  public confirmUuid = signal('');
  public searchCtrl = new FormControl('');
  public langs = environment.langs || [];
  public pageSize = PAGE_SIZE;
  /** 过滤请求先发后至的竞态保护 */
  private reqId = 0;

  ngOnInit(): void {
    this.tagsService.setTitle(this.translate.instant('BUILDER.NODE_MANAGE.PAGE_TITLE'));

    this.fieldFormService
      .getNodeTypes()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(types => {
        this.nodeTypes.set(types);
        if (!this.type() && types.length > 0) {
          this.type.set(types[0].value);
          this.fetchList();
        } else if (types.length === 0) {
          this.loading.set(false);
        }
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
    this.fetchList();
  }

  fetchList(): void {
    const type = this.type();
    if (!type) {
      return;
    }
    this.loading.set(true);
    this.confirmUuid.set('');
    const id = ++this.reqId;
    this.nodeService
      .fetch(`/api/v1/node/${type}`, this.buildParams())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: res => {
          if (id !== this.reqId) {
            return;
          }
          this.rows.set(
            (res?.data || []).map((node: any) => ({
              uuid: node.id,
              title: node.attributes?.title,
              status: !!node.attributes?.status,
              langcode: node.attributes?.langcode,
              changed: node.attributes?.changed,
              path: this.nodeService.getNodePath(node.attributes),
            }))
          );
          this.hasNext.set(!!res?.links?.next);
          this.loading.set(false);
        },
        error: err => {
          if (id !== this.reqId) {
            return;
          }
          console.error('加载内容列表失败', err);
          this.rows.set([]);
          this.hasNext.set(false);
          this.loading.set(false);
          this.util.openSnackbar(this.translate.instant('BUILDER.NODE_MANAGE.LOAD_FAILED'), 'ok');
        },
      });
  }

  private buildParams(): string {
    const parts = [
      'sort=-changed',
      `page[limit]=${PAGE_SIZE}`,
      `page[offset]=${this.page() * PAGE_SIZE}`,
    ];
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

  addNode(): void {
    this.router.navigate(['/builder/node-add', this.type()]);
  }

  onEdit(row: INodeRow): void {
    this.router.navigate(['/builder/node-add', this.type(), row.uuid]);
  }

  /** 第一次点击进入确认态,再次点击才真正删除 */
  onDelete(row: INodeRow): void {
    if (this.confirmUuid() !== row.uuid) {
      this.confirmUuid.set(row.uuid);
      return;
    }
    this.confirmUuid.set('');
    this.deleting.set(row.uuid);
    this.nodeService
      .deleteEntity(`/api/v1/node/${this.type()}`, row.uuid)
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

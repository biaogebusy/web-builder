import {
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { SHARE_IMPORTS } from '@share/share-imports';
import { WIDGETS_IMPORTS } from '@uiux/widgets/widgets-imports';
import { IPageMeta } from '@core/interface/IBuilder';
import { NodeService } from '@core/service/node.service';
import { TagsService } from '@core/service/tags.service';
import { BuilderState } from '@core/state/BuilderState';
import { getAttrAlias } from '@core/util/builder-page.util';
import { PageItemComponent } from '../page-item/page-item.component';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';
import { TranslateService } from '@ngx-translate/core';

const PAGE_LIMIT = 20;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-builder-page',
  templateUrl: './builder-page.component.html',
  styleUrls: ['./builder-page.component.scss'],
  imports: [SHARE_IMPORTS, WIDGETS_IMPORTS, PageItemComponent],
})
export class BuilderPageComponent implements OnInit {
  public name = signal<string | null>(null);
  private offset = signal(0);
  private builder = inject(BuilderState);
  private destroyRef = inject(DestroyRef);
  private tagService = inject(TagsService);
  private noderService = inject(NodeService);
  private activateRoute = inject(ActivatedRoute);
  private translate = inject(TranslateService);

  private params = computed(() =>
    new DrupalJsonApiParams()
      .addPageLimit(PAGE_LIMIT)
      .addPageOffset(this.offset())
      .addSort('changed', 'DESC')
      .addFilter('status', '1')
      .addFilter('group.name', this.name() ?? '')
      // the author renders in the page item and lives behind a relationship
      .addInclude(['uid'])
      .addCustomParam({ noCache: true })
      .getQueryString()
  );

  private pagesRes = this.noderService.fetchResource(() =>
    this.name()
      ? {
          api: '/api/v1/node/landing_page',
          params: this.params(),
        }
      : undefined
  );

  public loading = this.pagesRes.isLoading;

  public pages = computed<IPageMeta[]>(() => this.toPageMeta(this.pagesRes.value()));

  // JSON:API collections page through prev/next links, they carry no total count
  public links = computed(() => {
    const links = this.pagesRes.value()?.links;
    return links?.prev || links?.next ? links : undefined;
  });

  ngOnInit(): void {
    this.activateRoute.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(paramsMap => {
      const name = paramsMap.get('name');
      this.name.set(name);
      this.offset.set(0);
      this.tagService.setTitle(this.translate.instant('BUILDER.PAGE_LIST.MANAGE_SUFFIX', { name }));
    });

    this.builder.updateSuccess$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(state => {
      if (state) {
        this.onReload();
      }
    });
  }

  onReload(): void {
    this.pagesRes.reload();
  }

  onPageChange(href: string): void {
    this.offset.set(this.readOffset(href));
  }

  // The widget hands back the JSON:API link, the offset it carries is the page cursor
  private readOffset(href: string): number {
    try {
      const offset = new URL(href).searchParams.get('page[offset]');
      return offset ? Number(offset) : 0;
    } catch {
      return 0;
    }
  }

  private toPageMeta(res: any): IPageMeta[] {
    if (!res?.data) {
      return [];
    }
    const { data, included = [] } = res;
    return data.map((page: any) => {
      const { attributes, relationships } = page;
      const author = this.findIncluded(included, relationships?.uid?.data?.id);
      return {
        // the list view returns string nids, keep the same type so the active row matches
        nid: `${attributes.drupal_internal__nid}`,
        uuid: page.id,
        title: attributes.title,
        langcode: attributes.langcode,
        changed: attributes.changed,
        url: attributes.path ? getAttrAlias(attributes) : '',
        author: author?.attributes?.display_name ?? '',
        // the category badge stays out: every page in this list belongs to the route category
      };
    });
  }

  private findIncluded(included: any[], id?: string): any {
    return id ? included.find(item => item.id === id) : undefined;
  }
}

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
import { getAttrAlias } from '@core/util/builder-page.util';
import { PageItemComponent } from '../page-item/page-item.component';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';
import { TranslateService } from '@ngx-translate/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-builder-page',
  templateUrl: './builder-page.component.html',
  styleUrls: ['./builder-page.component.scss'],
  imports: [SHARE_IMPORTS, WIDGETS_IMPORTS, PageItemComponent],
})
export class BuilderPageComponent implements OnInit {
  public name = signal<string | null>(null);
  private destroyRef = inject(DestroyRef);
  private tagService = inject(TagsService);
  private noderService = inject(NodeService);
  private activateRoute = inject(ActivatedRoute);
  private translate = inject(TranslateService);

  private params = computed(() =>
    new DrupalJsonApiParams()
      .addPageLimit(20)
      .addSort('changed', 'DESC')
      .addFilter('status', '1')
      .addFilter('group.name', this.name() ?? '')
      // author and category render in the page item, both live behind a relationship
      .addInclude(['uid', 'group'])
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

  ngOnInit(): void {
    this.activateRoute.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(paramsMap => {
      const name = paramsMap.get('name');
      this.name.set(name);
      this.tagService.setTitle(this.translate.instant('BUILDER.PAGE.MANAGE_SUFFIX', { name }));
    });
  }

  onReload(): void {
    this.pagesRes.reload();
  }

  private toPageMeta(res: any): IPageMeta[] {
    if (!res?.data) {
      return [];
    }
    const { data, included = [] } = res;
    return data.map((page: any) => {
      const { attributes, relationships } = page;
      const author = this.findIncluded(included, relationships?.uid?.data?.id);
      const group = this.findIncluded(included, this.getRelationId(relationships?.group?.data));
      return {
        // the list view returns string nids, keep the same type so the active row matches
        nid: `${attributes.drupal_internal__nid}`,
        uuid: page.id,
        title: attributes.title,
        langcode: attributes.langcode,
        changed: attributes.changed,
        url: attributes.path ? getAttrAlias(attributes) : '',
        author: author?.attributes?.display_name ?? '',
        taxonomy: group?.attributes?.name ?? '',
      };
    });
  }

  private findIncluded(included: any[], id?: string): any {
    return id ? included.find(item => item.id === id) : undefined;
  }

  // A relationship serializes as an object when single valued and as an array when multi valued
  private getRelationId(data: any): string | undefined {
    return Array.isArray(data) ? data[0]?.id : data?.id;
  }
}

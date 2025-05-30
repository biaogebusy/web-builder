import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  DestroyRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { IDynamicMediaList } from '@core/interface/combs/IList';
import { NodeService } from '@core/service/node.service';
import { ScreenService } from '@core/service/screen.service';
import { BaseComponent } from '@uiux/base/base.widget';

@Component({
    selector: 'app-dynamic-media-list',
    templateUrl: './dynamic-media-list.component.html',
    styleUrls: ['./dynamic-media-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DynamicMediaListComponent extends BaseComponent implements OnInit {
  @Input() content: IDynamicMediaList;
  list: any;
  links: any;
  loading = true;

  private destroyRef = inject(DestroyRef);
  public nodeService = inject(NodeService);
  private screenService = inject(ScreenService);
  private cd = inject(ChangeDetectorRef);
  constructor() {
    super();
  }

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.getContent();
    }
  }

  getContent(): void {
    const params = [
      `include=${this.getParams(this.content, 'include')}`,
      `sort=${this.getParams(this.content, 'sort')}`,
      'jsonapi_include=1',
      `page[limit]=${this.getParams(this.content, 'limit') || 20}`,
    ].join('&');
    const path = this.nodeService.apiUrlConfig.nodeGetPath;
    this.nodeService
      .getNodes(path, `${this.getParams(this.content, 'type')}`, params)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.updateList(res);
      });
  }

  updateList(res: any): void {
    this.list = res.data.map((item: any) => {
      const link = this.nodeService.getNodePath(item);

      return {
        title: {
          label: item.title,
          href: link,
        },
        spacer: 'none',
        showImage: this.content.showImage ?? true,
        feature: {
          fullIcon: 'fullscreen',
          openIcon: 'open_in_new',
          link,
          ratios: this.content.ratios || 'media-16-9',
          img: {
            classes: 'object-fit',
            src: item.media?.field_media_image?.uri?.url,
            alt: item.title,
          },
        },
        date: item.changed,
        category: item.category.name,
        body: item.body.summary || item.body.value,
        details: {
          label: this.content.readMoreLabel || '查看更多',
          href: link,
          style: 'style-v1',
          icon: 'open_in_new',
        },
      };
    });
    this.links = res.links;
    this.loading = false;
    this.cd.detectChanges();
  }

  loadContent(link: string): void {
    this.loading = true;
    this.nodeService
      .getNodeByLink(link)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.updateList(res);
      });
  }
}

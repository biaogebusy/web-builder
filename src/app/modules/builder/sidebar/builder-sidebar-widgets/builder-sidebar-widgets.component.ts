import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import type { IBuilderComponent } from '@core/interface/IBuilder';
import type { IBranding } from '@core/interface/branding/IBranding';
import { ContentService } from '@core/service/content.service';
import { BuilderState } from '@core/state/BuilderState';
import { CORE_CONFIG } from '@core/token/token-providers';

@Component({
  selector: 'app-builder-sidebar-widgets',
  templateUrl: './builder-sidebar-widgets.component.html',
  styleUrls: ['./builder-sidebar-widgets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderSidebarWidgetsComponent implements OnInit, AfterViewInit {
  @Input() content: IBuilderComponent[];
  branding: IBranding;
  constructor(
    private builder: BuilderState,
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig,
    private contentService: ContentService
  ) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.contentService.loadBranding().subscribe((res) => {
      this.branding = res;
    });
  }

  onShowcase(content?: any) {
    if (content) {
      this.builder.showcase$.next({
        type: 'card-1v1',
        link: {
          href: '#',
          label: content.type,
        },
        components: [content],
      });
    } else {
      this.builder.showcase$.next(content);
    }
  }

  onJson(content: any) {
    const { provide } = content;
    let data = {};
    switch (provide) {
      case 'CORE_CONFIG':
        data = this.coreConfig;
        break;
      case 'BRANDING':
        data = this.branding;
        break;
      default:
        data = {};
    }
    this.builder.dynamicContent$.next({
      mode: 'over',
      hasBackdrop: true,
      style: {
        width: '800px',
      },
      elements: [
        {
          type: 'jsoneditor',
          isPreview: true,
          data,
          disableToolbar: true,
          isPage: false,
        },
      ],
    });
  }
}

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
  selector: 'app-builder-panel',
  templateUrl: './builder-panel.component.html',
  styleUrls: ['./builder-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderPanelComponent implements OnInit, AfterViewInit {
  @Input() content: IBuilderComponent[];
  branding: IBranding;
  constructor(
    public builder: BuilderState,
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig,
    private contentService: ContentService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.builder.fixedChange$.subscribe(() => {
      this.cd.detectChanges();
    });
  }
  ngAfterViewInit(): void {
    this.contentService.loadBranding().subscribe((res) => {
      this.branding = res;
    });
  }

  onShowcase(content: any) {
    if (this.builder.fixedShowcase) {
      return;
    }
    this.builder.showcase(content);
  }

  onFixed(content: any): void {
    if (this.builder.fixedShowcase) {
      // click active
      if (content === this.builder.fixedContent) {
        this.builder.fixedShowcase = false;
        this.builder.showcase$.next(false);
        return;
      }

      // switch to other
      if (content !== this.builder.fixedContent) {
        this.builder.showcase(content);
        return;
      }
    }

    // set new active
    if (!this.builder.fixedShowcase) {
      this.builder.fixedShowcase = true;
      this.builder.showcase(content);
      return;
    }
  }

  hideShowcase(): void {
    if (!this.builder.fixedShowcase) {
      this.builder.showcase$.next(false);
    }
  }

  onMoved(): void {
    this.builder.showcase$.next(false);
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
    this.builder.builderRightContent$.next({
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
          isPage: false,
        },
      ],
    });
  }
}

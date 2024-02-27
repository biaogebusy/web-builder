import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import type { IBranding } from '@core/interface/branding/IBranding';
import { ContentService } from '@core/service/content.service';
import { BuilderState } from '@core/state/BuilderState';
import { CORE_CONFIG } from '@core/token/token-providers';
import { settings } from '@modules/builder/data/settings-for-builder';

@Component({
  selector: 'app-builder-settings',
  templateUrl: './builder-settings.component.html',
  styleUrls: ['./builder-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderSettingsComponent implements OnInit, AfterViewInit {
  content = settings;
  branding: IBranding;
  constructor(
    private builder: BuilderState,
    private contentService: ContentService,
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.contentService.loadBranding().subscribe((res) => {
      this.branding = res;
    });
  }
  onAfterExpand(): void {
    this.builder.cancelFixedShowcase();
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

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Inject,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  private builder = inject(BuilderState);
  private contentService = inject(ContentService);
  private destroyRef = inject(DestroyRef);
  constructor(@Inject(CORE_CONFIG) private coreConfig: ICoreConfig) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.contentService
      .loadBranding()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.branding = res;
      });
  }
  onAfterExpand(): void {
    this.builder.cancelFixedShowcase();
  }

  onJson(content: any): void {
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
    this.builder.rightContent$.next({
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

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { ILanguage } from '@core/interface/IEnvironment';
import type { IBranding } from '@core/interface/branding/IBranding';
import { ContentService } from '@core/service/content.service';
import { BuilderState } from '@core/state/BuilderState';
import { CORE_CONFIG, LANG } from '@core/token/token-providers';
import { settings } from '@modules/builder/data/settings-for-builder';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-builder-settings',
  templateUrl: './builder-settings.component.html',
  styleUrls: ['./builder-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderSettingsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  content = settings;
  branding: IBranding;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private builder: BuilderState,
    private contentService: ContentService,
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig,
    @Inject(LANG) private lang: ILanguage
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.contentService
      .loadBranding(this.lang)
      .pipe(takeUntil(this.destroy$))
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

  ngOnDestroy(): void {
    if (this.destroy$.next) {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
    }
  }
}

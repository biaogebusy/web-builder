import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import type { IPage } from '@core/interface/IAppConfig';
import { IJsoneditor } from '@core/interface/widgets/IJsoneditor';
import { BuilderService } from '@core/service/builder.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { ContentState } from '@core/state/ContentState';
import { BUILDER_CURRENT_PAGE, DEBUG_ANIMATE } from '@core/token/token-providers';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-builder-menu',
  templateUrl: './builder-menu.component.html',
  styleUrls: ['./builder-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class BuilderMenuComponent implements OnInit, AfterViewInit {
  public debugAnimate$ = inject<Observable<boolean>>(DEBUG_ANIMATE);
  private currentPage$ = inject<Observable<IPage>>(BUILDER_CURRENT_PAGE);

  public page: IPage;
  public contentState = inject(ContentState);
  private builder = inject(BuilderState);
  private util = inject(UtilitiesService);
  private cd = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  private builderService = inject(BuilderService);

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.debugAnimate$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(state => {
      this.builder.renderMarkers(state);
    });
    this.currentPage$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(page => {
      this.page = page;
      this.cd.detectChanges();
    });
  }

  onPageJson(): void {
    const jsonWidget: IJsoneditor = {
      type: 'jsoneditor',
      data: this.page,
      isPage: true,
      schemaType: 'page',
      classes: 'full-height',
    };
    this.builder.rightContent$.next({
      mode: 'over',
      hasBackdrop: true,
      style: {
        width: '800px',
      },
      elements: [jsonWidget],
    });
  }

  get canShow(): boolean {
    return !environment.production;
  }

  onDebugAnimate(event: MatSlideToggleChange): void {
    const isDebugAnimate = event.checked;
    this.builder.debugeAnimate$.next(isDebugAnimate);
    this.builder.renderMarkers(isDebugAnimate);
  }

  onPreview(): void {
    if (!this.page || this.page.body.length === 0) {
      this.util.openSnackbar('预览页面没有组件，请添加再预览', 'ok');
      return;
    }
    const url = window.location.origin;
    window.open(`${url}/preview`, '_blank');
  }

  onPageSetting(page: IPage): void {
    const { uuid, langcode } = page;
    if (uuid) {
      this.builderService.openPageSetting(
        { uuid, langcode },
        '/api/v1/node/landing_page',
        this.builderService.getPageParams(['uid', 'group', 'cover', 'cover.field_media_image'])
      );
    }
  }
}

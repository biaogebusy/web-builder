import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Injector,
  effect,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import type { IPage } from '@core/interface/IAppConfig';
import { IJsoneditor } from '@core/interface/widgets/IJsoneditor';
import { BuilderService } from '@core/service/builder.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { ContentState } from '@core/state/ContentState';
import { BUILDER_CURRENT_PAGE, DEBUG_ANIMATE } from '@core/token/token-providers';
import { getPageParams } from '@core/util/builder-page.util';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IconComponent } from '../../icon/icon.component';

@Component({
  selector: 'app-builder-menu',
  templateUrl: './builder-menu.component.html',
  styleUrls: ['./builder-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatTooltipModule,
    IconComponent,
  ],
})
export class BuilderMenuComponent implements AfterViewInit {
  public debugAnimate = inject(DEBUG_ANIMATE);
  private currentPage = inject(BUILDER_CURRENT_PAGE);

  public page?: IPage;
  public contentState = inject(ContentState);
  private builder = inject(BuilderState);
  private util = inject(UtilitiesService);
  private cd = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  private dialog = inject(MatDialog);
  private injector = inject(Injector);


  ngAfterViewInit(): void {
    effect(() => {
      this.builder.renderMarkers(this.debugAnimate());
    }, { injector: this.injector });
    effect(() => {
      const page = this.currentPage();
      if (page && typeof page === 'object') {
        this.page = page;
      }
      this.cd.detectChanges();
    }, { injector: this.injector });
  }

  onPageJson(): void {
    const codeEditorDialog = this.dialog.getDialogById('code-editor-dialog');
    if (codeEditorDialog) {
      codeEditorDialog
        .afterClosed()
        .pipe(take(1), takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.openPageJson());
      codeEditorDialog.close();
      return;
    }
    this.openPageJson();
  }

  private openPageJson(): void {
    const jsonWidget: IJsoneditor = {
      type: 'jsoneditor',
      data: this.page,
      isPage: true,
      fullWidth: true,
      schemaType: 'page',
      classes: 'full-height',
    };
    this.builder.rightContent$.next({
      title: '页面JSON',
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
      this.injector.get(BuilderService).openPageSetting(
        { uuid, langcode },
        '/api/v1/node/landing_page',
        getPageParams(['uid', 'group', 'cover', 'cover.field_media_image'])
      );
    }
  }
}

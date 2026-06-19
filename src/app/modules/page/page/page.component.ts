import {
  Component,
  inject,
  DestroyRef,
  DOCUMENT,
  afterEveryRender,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import type { ICoreConfig, IPage } from '@core/interface/IAppConfig';
import { CORE_CONFIG, PAGE_CONTENT, USER } from '@core/token/token-providers';
import { ContentState } from '@core/state/ContentState';
import { pageContentFactory } from '@core/factory/factory';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ContentService } from '@core/service/content.service';
import { Router } from '@angular/router';
import { ScreenService } from '@core/service/screen.service';
import { ScreenState } from '@core/state/screen/ScreenState';
import { throttle } from 'lodash-es';
import { UtilitiesService } from '@core/service/utilities.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';
import { LoadingComponent } from '@uiux/widgets/loading/loading.component';
import { DynamicComponentComponent } from '@uiux/widgets/builder/dynamic-component/dynamic-component.component';
import { BrandingModule } from '@core/branding/branding.module';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  providers: [
    {
      provide: PAGE_CONTENT,
      useFactory: pageContentFactory,
    },
  ],
  imports: [
    NgTemplateOutlet,
    MatSidenavModule,
    LoadingBarModule,
    BrandingModule,
    BtnComponent,
    LoadingComponent,
    DynamicComponentComponent,
  ],
})
export class PageComponent {
  private doc = inject<Document>(DOCUMENT);
  public coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  public pageContent = inject(PAGE_CONTENT);
  public mobileMenuOpened = false;
  public user = inject(USER);
  private contentState = inject(ContentState);
  private destroyRef = inject(DestroyRef);
  private contentService = inject(ContentService);
  private screenService = inject(ScreenService);
  private router = inject(Router);
  private screen = inject(ScreenState);
  private util = inject(UtilitiesService);

  constructor() {
    afterEveryRender({
      read: throttle(() => {
        this.util.intersectionObserver('[data-aos]', this.doc);
      }, 200),
    });

    if (this.screenService.isPlatformBrowser()) {
      this.screen.drawer$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        this.mobileMenuOpened = !this.mobileMenuOpened;
      });
    }
  }

  get opened(): boolean {
    return this.contentState.drawerOpened();
  }

  get drawerLoading(): boolean {
    return this.contentState.drawerLoading();
  }

  get drawerContent(): IPage | undefined {
    return this.contentState.drawerContent();
  }

  onBackdrop(): void {
    this.contentState.drawerOpened.set(false);
  }

  onDrawer(): void {
    if (this.opened) {
      this.doc.getElementsByTagName('html')[0].classList.add('drawer-disable-scroll');
      this.doc.getElementById('transparent-mode')?.classList.remove('transparent-mode');
    } else {
      this.doc.getElementsByTagName('html')[0].classList.remove('drawer-disable-scroll');
      this.doc.getElementById('transparent-mode')?.classList.add('transparent-mode');
    }
  }

  onEdit(nid: string): void {
    const url = this.doc.location.pathname;
    const { lang } = this.contentService.getUrlPath(url);
    this.router.navigate(['builder/page-list'], {
      queryParams: {
        nid,
        langcode: lang,
        quickEdit: true,
      },
    });
  }
}

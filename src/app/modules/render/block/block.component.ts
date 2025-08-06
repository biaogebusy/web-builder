import {
  Component,
  AfterContentInit,
  inject,
  DestroyRef,
  AfterViewInit,
  DOCUMENT,
} from '@angular/core';
import { Observable } from 'rxjs';
import type { IPage } from '@core/interface/IAppConfig';
import { PAGE_CONTENT, USER } from '@core/token/token-providers';
import { ContentState } from '@core/state/ContentState';
import { pageContentFactory } from '@core/factory/factory';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ContentService } from '@core/service/content.service';
import { Router } from '@angular/router';
import AOS from 'aos';
import { ScreenService } from '@core/service/screen.service';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
  providers: [
    {
      provide: PAGE_CONTENT,
      useFactory: pageContentFactory,
    },
  ],
  standalone: false,
})
export class BlockComponent implements AfterContentInit, AfterViewInit {
  private doc = inject<Document>(DOCUMENT);
  public pageContent$ = inject<Observable<IPage>>(PAGE_CONTENT);

  public drawerLoading: boolean;
  public drawerContent: IPage;
  public opened: boolean;
  public user$ = inject(USER);
  private contentState = inject(ContentState);
  private destroyRef = inject(DestroyRef);
  private contentService = inject(ContentService);
  private screenService = inject(ScreenService);
  private router = inject(Router);

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.contentState.componentCount$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        AOS.init();
      });
    }
  }

  onBackdrop(): void {
    this.contentState.drawerOpened$.next(false);
  }

  ngAfterContentInit(): void {
    this.contentState.drawerOpened$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(state => {
      this.opened = state;
    });

    this.contentState.drawerLoading$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(loading => {
        this.drawerLoading = loading;
      });

    this.contentState.drawerContent$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((content: IPage) => {
        this.drawerContent = content;
      });
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

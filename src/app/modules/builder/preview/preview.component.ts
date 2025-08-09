import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IPage } from '@core/interface/IAppConfig';
import { ScreenService } from '@core/service/screen.service';
import { TagsService } from '@core/service/tags.service';
import { BuilderState } from '@core/state/BuilderState';
import { ContentState } from '@core/state/ContentState';
import { BUILDER_CURRENT_PAGE } from '@core/token/token-providers';
import { Observable } from 'rxjs';
import AOS from 'aos';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PreviewComponent implements OnInit, AfterViewInit {
  public currentPage$ = inject<Observable<IPage>>(BUILDER_CURRENT_PAGE);

  private contentState = inject(ContentState);
  private builder = inject(BuilderState);
  private tagsService = inject(TagsService);
  private screenService = inject(ScreenService);
  private destroyRef = inject(DestroyRef);
  private count = 0;
  private pageBodyLength: number;

  constructor() {
    this.tagsService.setTitle(`${this.builder.currentPage.title}草稿预览`);
  }

  ngOnInit(): void {
    this.contentState.pageConfig$.next(this.builder.currentPage.config);
    this.currentPage$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(page => {
      if (page?.body?.length) {
        this.pageBodyLength = page.body.length;
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.contentState.componentCount$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        this.count += 1;
        if (this.count === this.pageBodyLength - 1) {
          this.count = 0;
          setTimeout(() => {
            AOS.init();
          }, 200);
        }
      });
    }
  }
}

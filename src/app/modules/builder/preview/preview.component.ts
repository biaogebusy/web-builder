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
import { UtilitiesService } from '@core/service/utilities.service';

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
  private util = inject(UtilitiesService);
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.tagsService.setTitle(`${this.builder.currentPage.title}草稿预览`);
  }

  ngOnInit(): void {
    this.contentState.pageConfig$.next(this.builder.currentPage.config);
  }

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.util.animateElement$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        setTimeout(() => {
          AOS.init();
        }, 600);
      });
    }
  }
}

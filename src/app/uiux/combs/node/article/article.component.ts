import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
  effect,
  inject,
  Injector,
  DestroyRef,
  ChangeDetectionStrategy,
  input,
} from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { TagsService } from '@core/service/tags.service';
import { ScreenService } from '@core/service/screen.service';
import { Observable } from 'rxjs';
import { NodeService } from '@core/service/node.service';
import { UserService } from '@core/service/user.service';
import { NodeComponent } from '@uiux/base/node.widget';
import type { IBaseNode, IComment } from '@core/interface/node/INode';
import { ContentState } from '@core/state/ContentState';
import { CORE_CONFIG, USER } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { environment } from 'src/environments/environment';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { ArticleBannerComponent } from './article-banner/article-banner.component';
import { ArticleMetaComponent } from './article-meta/article-meta.component';
import { CommentFormComponent } from '../comment/comment-form/comment-form.component';
import { CommentListComponent } from '../comment/comment-list/comment-list.component';
import { SidebarComponent } from '@uiux/widgets/sidebar/sidebar.component';
import { DynamicComponentComponent } from '@uiux/widgets/builder/dynamic-component/dynamic-component.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  imports: [
    MatDividerModule,
    SafeHtmlPipe,
    ArticleBannerComponent,
    ArticleMetaComponent,
    CommentFormComponent,
    CommentListComponent,
    SidebarComponent,
    DynamicComponentComponent,
  ],
})
export class ArticleComponent extends NodeComponent implements OnInit, AfterViewInit {
  public coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  public user = inject(USER);

  readonly content = input.required<IBaseNode>();
  public comments: IComment[];

  private cd = inject(ChangeDetectorRef);
  private nodeService = inject(NodeService);
  private screenService = inject(ScreenService);
  private tagsService = inject(TagsService);
  private userService = inject(UserService);
  private contentState = inject(ContentState);
  private destroyRef = inject(DestroyRef);
  private injector = inject(Injector);

  constructor() {
    super();
  }

  ngOnInit(): void {
    const content = this.content();
    if (content.title) {
      this.tagsService.setTitle(content.title);
    }

    this.userService.userSub$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.cd.markForCheck();
    });
  }

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.tagsService.highlightCode();
    }
    if (this.coreConfig.article?.comment?.enable) {
      if (this.screenService.isPlatformBrowser()) {
        effect(
          () => {
            if (this.contentState.commentChange()) {
              this.getComments(+new Date());
            }
          },
          { injector: this.injector }
        );
      }
    }
  }

  getComments(timeStamp = 1): void {
    if (!environment.production) {
      return;
    }
    this.nodeService
      .getCommentsWitchChild(this.content(), timeStamp)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.comments = res;
        this.cd.detectChanges();
      });
  }
}

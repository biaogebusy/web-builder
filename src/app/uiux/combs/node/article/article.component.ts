import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
  inject,
  DestroyRef,
  ChangeDetectionStrategy,
  input
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { NgPipesModule } from 'ngx-pipes';
import { TagsService } from '@core/service/tags.service';
import { ScreenService } from '@core/service/screen.service';
import { Observable } from 'rxjs';
import { NodeService } from '@core/service/node.service';
import { UserService } from '@core/service/user.service';
import { NodeComponent } from '@uiux/base/node.widget';
import type { IBaseNode, IComment } from '@core/interface/node/INode';
import { ContentState } from '@core/state/ContentState';
import { CORE_CONFIG, USER } from '@core/token/token-providers';
import { PAGE_CONTENT } from '@core/token/token-providers';
import type { IArticle, ICoreConfig, IPage } from '@core/interface/IAppConfig';
import type { IUser } from '@core/interface/IUser';
import { environment } from 'src/environments/environment';
import { MatDialogRef } from '@angular/material/dialog';
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
    AsyncPipe,
    MatDividerModule,
    NgPipesModule,
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
  private pageContent$ = inject<Observable<IPage>>(PAGE_CONTENT);
  public user$ = inject<Observable<IUser | boolean>>(USER);

  readonly content = input.required<IBaseNode>();
  public comments: IComment[];
  private dialogRef: MatDialogRef<any>;
  public canAccess: boolean;

  private cd = inject(ChangeDetectorRef);
  private nodeService = inject(NodeService);
  private screenService = inject(ScreenService);
  private tagsService = inject(TagsService);
  private userService = inject(UserService);
  private contentState = inject(ContentState);
  private destroyRef = inject(DestroyRef);
  private user: IUser;

  constructor() {
    super();
    this.user$.pipe(takeUntilDestroyed()).subscribe(user => {
      if (typeof user === 'object') {
        this.user = user;
      }
    });
  }

  ngOnInit(): void {
    const content = this.content();
    if (content.title) {
      this.tagsService.setTitle(content.title);
    }

    this.checkAccess();

    this.userService.userSub$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.cd.markForCheck();
    });
  }

  checkAccess(): void {
    if (!environment.production) {
      return;
    }
    this.pageContent$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(page => {
      const entityId = page.config?.node?.entityId || '';
      this.nodeService
        .checkNodeAccess(this.content().params, entityId, this.user)
        .subscribe(access => {
          this.canAccess = access.canAccess;
          this.cd.detectChanges();
        });
    });
  }

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.tagsService.highlightCode();
    }
    if (this.coreConfig.article?.comment?.enable) {
      if (this.screenService.isPlatformBrowser()) {
        this.contentState.commentChange$
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(state => {
            if (state) {
              this.getComments(+new Date());
            }
          });
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

  openLogin(): void {
    this.userService.openLoginDialog().then(dialogRef => {
      this.dialogRef = dialogRef;
      this.dialogRef.afterClosed().subscribe(() => {
        this.checkAccess();
      });
    });
  }

  get articleConfig(): IArticle | null {
    return this.coreConfig.article || null;
  }

  get loginConfig(): any {
    return this.articleConfig && this.articleConfig.login;
  }
}

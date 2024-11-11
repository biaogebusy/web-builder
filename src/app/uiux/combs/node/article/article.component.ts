import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  Inject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject,
  DestroyRef,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { TagsService } from '@core/service/tags.service';
import { ScreenState } from '@core/state/screen/ScreenState';
import { ScreenService } from '@core/service/screen.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NodeService } from '@core/service/node.service';
import { UserService } from '@core/service/user.service';
import { NodeComponent } from '@uiux/base/node.widget';
import type { IBaseNode, IComment } from '@core/interface/node/INode';
import { ContentState } from '@core/state/ContentState';
import { CORE_CONFIG, USER } from '@core/token/token-providers';
import { PAGE_CONTENT } from '@core/token/token-providers';
import type { IArticle, ICoreConfig, IPage } from '@core/interface/IAppConfig';
import { LoginComponent } from 'src/app/modules/user/login/login.component';
import type { IUser } from '@core/interface/IUser';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent
  extends NodeComponent
  implements OnInit, AfterViewInit
{
  @Input() content: IBaseNode;
  currentUserRule: string[];
  comments: IComment[];
  dialogRef: MatDialogRef<any>;
  fontForm: UntypedFormGroup;
  htmlBody: any;
  isReqRoles = false;
  canAccess: boolean;

  cd = inject(ChangeDetectorRef);
  dialog = inject(MatDialog);
  router = inject(Router);
  nodeService = inject(NodeService);
  screen = inject(ScreenState);
  screenService = inject(ScreenService);
  tagsService = inject(TagsService);
  userService = inject(UserService);
  contentState = inject(ContentState);
  private destroyRef = inject(DestroyRef);
  user: IUser;
  constructor(
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(PAGE_CONTENT) private pageContent$: Observable<IPage>,
    @Inject(USER) public user$: Observable<IUser>
  ) {
    super();
    this.user$.pipe(takeUntilDestroyed()).subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    if (this.content.title) {
      this.tagsService.setTitle(this.content.title);
    }

    this.checkAccess();

    this.userService.userSub$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.cd.markForCheck();
      });
  }

  checkAccess(): void {
    if (!environment.production) {
      return;
    }
    this.pageContent$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(page => {
        const entityId = page.config?.node?.entityId || '';
        this.nodeService
          .checkNodeAccess(this.content.params, entityId, this.user)
          .subscribe(access => {
            this.canAccess = access.canAccess;
            this.isReqRoles = access.isReqRoles;
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
      .getCommentsWitchChild(this.content, this.user.csrf_token, timeStamp)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.comments = res;
        this.cd.detectChanges();
      });
  }

  openLogin(): void {
    const returnUrl = window.location.pathname;
    this.router.navigate([], {
      queryParams: { returnUrl },
    });
    this.dialogRef = this.dialog.open(LoginComponent);
    this.dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.checkAccess();
      });
  }

  get articleConfig(): IArticle | null {
    return this.coreConfig.article || null;
  }

  get loginConfig(): any {
    return this.articleConfig && this.articleConfig.login;
  }
}

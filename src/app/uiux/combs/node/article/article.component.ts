import { DOCUMENT } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  Inject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import php from 'highlight.js/lib/languages/php';
import scss from 'highlight.js/lib/languages/scss';
import { TagsService } from '@core/service/tags.service';
import { ScreenState } from '@core/mobx/screen/ScreenState';
import { ScreenService } from '@core/service/screen.service';
import { FormService } from '@core/service/form.service';
import { Subject, of, Observable } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';
import { UserState } from '@core/mobx/user/UserState';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../../../../modules/user/login/login.component';
import { Router } from '@angular/router';
import { NodeService } from '@core/service/node.service';
import { DialogComponent } from '../../../widgets/dialog/dialog.component';
import { TextComponent } from '@uiux/widgets/text/text.component';
import { UserService } from '@core/service/user.service';
import { NodeComponent } from '@uiux/base/node.widget';
import type { IBaseNode } from '@core/interface/node/INode';
import { ContentState } from '@core/mobx/ContentState';
import { CORE_CONFIG } from '@core/token/token-providers';
import type { IArticle, ICoreConfig } from '../../../../core/mobx/IAppConfig';
import { API_URL, PAGE_CONTENT } from '@core/token/token-providers';
import { IPage } from '@core/mobx/IAppConfig';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent
  extends NodeComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() content: IBaseNode;
  currentUserRule: string[];
  commentForm: FormGroup;
  comments: any[];
  destroy$: Subject<boolean> = new Subject<boolean>();
  dialogRef: MatDialogRef<any>;
  fontSize: number;
  fontForm: FormGroup;
  htmlBody: any;
  isReqRoles = false;
  canAccess: boolean;
  reqMoney: number;
  payUrl: string;
  isPayed = false;
  showNotXs: boolean;

  constructor(
    private cd: ChangeDetectorRef,
    private dialog: MatDialog,
    private formService: FormService,
    private router: Router,
    public nodeService: NodeService,
    public screen: ScreenState,
    private screenService: ScreenService,
    private tagsService: TagsService,
    public userState: UserState,
    private userService: UserService,
    public contentState: ContentState,
    @Inject(DOCUMENT) private document: Document,
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(API_URL) private apiUrl: string,
    @Inject(PAGE_CONTENT) private pageContent$: Observable<IPage>
  ) {
    super();
    if (this.screenService.isPlatformBrowser()) {
      hljs.registerLanguage('javascript', javascript);
      hljs.registerLanguage('php', php);
      hljs.registerLanguage('scss', scss);
    }
  }

  ngOnInit(): void {
    if (this.content.title) {
      this.tagsService.setTitle(this.content.title);
    }
    if (this.screenService.isPlatformBrowser()) {
      this.onFontSize();
    }
    this.checkAccess();

    this.userState.user$.subscribe(() => {
      this.cd.markForCheck();
    });
  }

  checkAccess(): void {
    this.pageContent$.subscribe((page) => {
      const entityId = page.config?.node?.entityId || '';
      this.nodeService
        .checkNodeAccess(this.content.params, entityId)
        .subscribe((access) => {
          this.canAccess = access.canAccess;
          this.isReqRoles = access.isReqRoles;
          this.isPayed = access.isPayed;
          this.payUrl = access.payUrl;
          this.reqMoney = access.reqMoney;
          this.cd.detectChanges();
        });
    });
  }

  onFontSize(): void {
    if (this.fontSizeConfig) {
      this.fontForm = this.formService.toFormGroup(this.fontSizeConfig.form);
      this.fontForm.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe((size) => {
          this.fontSize = Math.max(10, size.font);
        });
    }
  }

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.document.querySelectorAll('code').forEach((block) => {
        // then highlight each
        hljs.highlightBlock(block);
      });
      this.screen.mqAlias$().subscribe((mq) => {
        this.showNotXs = mq.includes('gt-xs');
        this.cd.detectChanges();
      });
    }
    if (this.coreConfig.article?.comment?.enable) {
      this.getComments();
      if (this.screenService.isPlatformBrowser()) {
        this.contentState.commentChange$
          .pipe(takeUntil(this.destroy$))
          .subscribe((state) => {
            if (state) {
              this.getComments(+new Date());
            }
          });
      }
    }
  }

  getComments(timeStamp = 1): void {
    this.nodeService
      .getCommentsWitchChild(this.content, this.userState.csrfToken, timeStamp)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.comments = res;
        this.cd.markForCheck();
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
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.checkAccess();
      });
  }

  upgrade(): void {
    this.openPayMentDialog();
    window.open(`${this.apiUrl}${this.coreConfig.commerce.vip}`, '_blank');
  }

  pay(): void {
    this.openPayMentDialog();
    window.open(this.payUrl);
  }

  openPayMentDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      disableClose: true,
      data: {
        renderInputComponent: TextComponent,
        disableCloseButton: true,
        inputData: {
          content: this.coreConfig.commerce.dialog,
        },
      },
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.userService
          .getCurrentUserProfile(this.userState.csrfToken)
          .subscribe(
            (profile) => {
              const user = {
                current_user: profile,
              };
              this.userState.refreshLocalUser(
                Object.assign(this.userState.currentUser, user)
              );
              this.checkAccess();
            },
            (error) => {
              console.log(error);
            }
          );
      });
  }

  get articleConfig(): IArticle {
    return this.coreConfig.article;
  }

  get loginConfig(): any {
    return this.articleConfig && this.articleConfig.login;
  }

  get fontSizeConfig(): any {
    return this.articleConfig && this.articleConfig.fontSize;
  }

  ngOnDestroy(): void {
    if (this.destroy$.next) {
      this.destroy$.next(true);
      this.destroy$.complete();
    }
  }
}

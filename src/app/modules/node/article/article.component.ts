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
import { AppState } from '@core/mobx/AppState';
import { ScreenState } from '@core/mobx/screen/ScreenState';
import { ScreenService } from '@core/service/screen.service';
import { FormService } from '@core/service/form.service';
import { Subject, Observable, of } from 'rxjs';
import { map, takeUntil, catchError } from 'rxjs/operators';
import { UserState } from '@core/mobx/user/UserState';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../../user/login/login.component';
import { Router } from '@angular/router';
import { NodeService } from '@core/service/node.service';
import { BaseComponent } from '@uiux/base/base.widget';
import { isEmpty } from 'lodash-es';
import { environment } from 'src/environments/environment';
import { DialogComponent } from '../../../uiux/widgets/dialog/dialog.component';
import { TextComponent } from '@uiux/widgets/text/text.component';
import { UserService } from '@core/service/user.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent
  extends BaseComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() content: any;
  currentUserRule: string[];
  commentForm: FormGroup;
  comments: any[];
  destroy$: Subject<boolean> = new Subject<boolean>();
  dialogRef: MatDialogRef<any>;
  fontSize: number;
  fontForm: FormGroup;
  htmlBody: any;
  isAuth = false;
  isReqRule = false;
  isReqPaly: boolean;
  isPublic = false;
  canAccess: boolean;
  reqMoney: number;
  isPayed = false;
  showNotXs: boolean;

  constructor(
    public appState: AppState,
    private cd: ChangeDetectorRef,
    private dialog: MatDialog,
    private formService: FormService,
    private router: Router,
    private nodeService: NodeService,
    public screen: ScreenState,
    private screenService: ScreenService,
    private tagsService: TagsService,
    public userState: UserState,
    private userService: UserService,
    @Inject(DOCUMENT) private document: Document
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
      this.onComment();
    }
    this.checkAccess();
    if (this.appState.article?.comment?.enabel) {
      this.getComments();
    }
  }

  checkAccess(): void {
    const reqPay = this.getParams(this.content, 'pay');
    const reqRule = this.getParams(this.content, 'require_rule');
    this.reqMoney = this.getDeepValue(this.content, 'params.pay.money');
    if (!isEmpty(reqRule) || reqPay) {
      this.isPublic = false;
    } else {
      this.isPublic = true;
    }
    if (reqRule) {
      this.isReqRule = this.checkReqRule(reqRule);
      if (this.isReqRule) {
        this.canAccess = true;
        return;
      }
      this.canAccess = false;
    }
    if (reqPay) {
      this.isReqPaly = true;
      if (this.userState.authenticated && !this.isReqRule) {
        this.checkCurrentUserPayed(
          this.userState.currentUser.id,
          this.appState.pageConfig.node.entityId,
          this.userState.csrfToken
        ).subscribe((payed) => {
          if (payed) {
            this.isPayed = true;
            this.canAccess = true;
          } else {
            this.isPayed = false;
            this.canAccess = false;
          }
        });
      }
    }
    this.cd.detectChanges();
  }

  checkReqRule(reqRules: string[]): boolean {
    if (!this.userState.authenticated) {
      return false;
    } else {
      this.currentUserRule = this.userState.roles;
      if (this.currentUserRule.includes('administrator')) {
        return true;
      } else {
        const isRule =
          this.currentUserRule.filter((role) => reqRules.includes(role))
            .length > 0;
        return isRule;
      }
    }
  }

  checkCurrentUserPayed(
    uid: string,
    entityId: string,
    token: string
  ): Observable<boolean> {
    const params = [
      `filter[uid.id]=${uid}`,
      `filter[entity_id]=${entityId}`,
    ].join('&');
    return this.nodeService
      .getFlaging(this.nodeService.apiUrlConfig?.paymentPath, params, token)
      .pipe(
        map((res) => {
          if (res.data.length > 0) {
            return true;
          }
          console.log('用户没有购买！');
          return false;
        })
      );
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

  onComment(): void {
    if (this.content.comment) {
      this.commentForm = this.formService.toFormGroup(
        this.content.comment.form
      );
    }
  }

  getComments(): void {
    const meta = this.content.comment.meta;
    const nodeUuid = meta.nodeUuid;
    const type = meta.type;
    const params = [
      `filter[entity_id.id]=${nodeUuid}`,
      `include=uid,uid.user_picture`,
      `fields[user--user]=name,user_picture`,
      `fields[file--file]=uri,url`,
      `sort=-created`,
      'filter[status]=1',
      `jsonapi_include=1`,
    ].join('&');
    const path = this.nodeService.apiUrlConfig.commentGetPath;
    this.nodeService
      .getNodes(path, type, params)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.comments = res.data.map((comment: any) => {
          return {
            author: {
              img: {
                src:
                  comment.uid.user_picture?.uri?.url ||
                  this.userState.defaultAvatar,
                style: {
                  width: '45px',
                  height: '45px',
                  borderRadius: '3px',
                },
                alt: comment.uid.name,
              },
              title: comment.uid.name,
              subTitle: '用户暂无签名',
            },
            time: comment.changed,
            id: comment.id,
            content: comment.comment_body.processed,
          };
        });
        this.cd.detectChanges();
      });
  }

  onSubmit(): void {
    this.getComments();
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
    window.open(`${environment.apiUrl}${this.appState.commerce.vip}`, '_blank');
  }

  get payUrl(): string {
    return `${environment.apiUrl}${this.appState.commerce.payNode}/${this.appState.pageConfig?.node?.entityId}`;
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
          content: this.appState.commerce.dialog,
        },
      },
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.userService
          .getCurrentUserProfile(this.userState.csrfToken)
          // .pipe(
          //   catchError((err) => {
          //     return of({
          //       uid: '83',
          //       name: 'test',
          //       roles: ['authenticated', 'vip'],
          //     });
          //   })
          // )
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

  get articleConfig(): any {
    return this.appState.config && this.appState.config.article;
  }

  get loginConfig(): any {
    return this.articleConfig && this.articleConfig.login;
  }

  get fontSizeConfig(): any {
    return this.articleConfig && this.articleConfig.fontSize;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}

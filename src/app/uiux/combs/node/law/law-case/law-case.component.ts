import {
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  AfterViewInit,
  Inject,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import type {
  ICase,
  ICasePrams,
  ICommentContent,
} from '@core/interface/node/INode';
import { UserState } from '@core/mobx/user/UserState';
import { FormService } from '@core/service/form.service';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { NodeComponent } from '@uiux/base/node.widget';
import { Subject, Observable } from 'rxjs';
import { ScreenService } from '@core/service/screen.service';
import { ContentState } from '@core/mobx/ContentState';
import {
  takeUntil,
  debounceTime,
  distinctUntilChanged,
  startWith,
} from 'rxjs/operators';
import { CORE_CONFIG } from '@core/token/token-providers';
import type { ICoreConfig, IPage } from '@core/mobx/IAppConfig';
import { PAGE_CONTENT } from '@core/token/token-providers';

@Component({
  selector: 'app-law-case',
  templateUrl: './law-case.component.html',
  styleUrls: ['./law-case.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LawCaseComponent
  extends NodeComponent
  implements OnInit, AfterViewInit
{
  @Input() content: ICase;
  uuid: string;
  comments$: Observable<ICommentContent[]>;
  initCommentContent: string;
  form: FormGroup;
  first = true;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public userState: UserState,
    public nodeService: NodeService,
    private cd: ChangeDetectorRef,
    private formService: FormService,
    private uti: UtilitiesService,
    private screenService: ScreenService,
    public contentState: ContentState,
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(PAGE_CONTENT) public pageContent$: Observable<IPage>
  ) {
    super();
  }

  ngOnInit(): void {
    this.pageContent$.subscribe((page) => {
      this.uuid = page.config.node.uuid;
    });
  }

  ngAfterViewInit(): void {
    if (this.content?.form?.length) {
      this.initForm(this.content.form);
    }
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

  initForm(form: any[]): void {
    this.form = this.formService.toFormGroup(form);
    this.form.valueChanges
      .pipe(
        startWith({}),
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => {
        if (!this.first) {
          const apiParams = this.getCaseParams(value);
          this.updateNode(apiParams);
        }
        this.first = false;
      });
  }

  updateNode(apiParams: any): void {
    this.nodeService
      .updateLawCase(apiParams, this.uuid, this.userState.csrfToken)
      .subscribe((res) => {
        this.uti.openSnackbar('已更新！', '✓');
      });
  }

  getComments(timeStamp = 1): void {
    const uuid = this.uuid;
    if (!this.coreConfig?.article?.comment?.enable || !uuid) {
      return;
    }
    this.comments$ = this.nodeService.getCustomApiComment(
      uuid,
      timeStamp,
      this.userState.currentUser.csrf_token
    );
    this.cd.detectChanges();
  }

  getCaseParams(value: ICasePrams): any {
    return {
      data: {
        type: 'node--case',
        id: this.uuid,
        attributes: {
          transaction_level: value.transaction_level,
        },
        relationships: {
          case_procedure: {
            data: {
              type: 'taxonomy_term--case_procedure',
              id: value.case_procedure,
            },
          },
        },
      },
    };
  }

  getLawyerParams(lawyer: any): any {
    if (lawyer.value) {
      const multi = lawyer.value.split(',');
      return multi.map((item: string) => {
        return {
          type: 'user-user',
          id: item,
        };
      });
    } else {
      return [];
    }
  }

  trackByFn(index: number, item: any): number {
    return index;
  }
}

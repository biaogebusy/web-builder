import {
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ICase, ICasePrams } from '@core/interface/node/INode';
import { AppState } from '@core/mobx/AppState';
import { FormState } from '@core/mobx/FormState';
import { UserState } from '@core/mobx/user/UserState';
import { FormService } from '@core/service/form.service';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { NodeComponent } from '@uiux/base/node.widget';
import { Subject } from 'rxjs';
import {
  takeUntil,
  debounceTime,
  distinctUntilChanged,
  map,
} from 'rxjs/operators';
import { ScreenService } from '@core/service/screen.service';
import { ContentState } from '@core/mobx/ContentState';
// import data from './data.json';

@Component({
  selector: 'app-law-case',
  templateUrl: './law-case.component.html',
  styleUrls: ['./law-case.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LawCaseComponent extends NodeComponent implements OnInit {
  @Input() content: ICase;
  comments: any[];
  form: FormGroup;
  apiParams: string;
  disabled = true;
  first = true;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public appState: AppState,
    public userState: UserState,
    public nodeService: NodeService,
    private cd: ChangeDetectorRef,
    private formService: FormService,
    private uti: UtilitiesService,
    private formState: FormState,
    private screenService: ScreenService,
    public contentState: ContentState
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.content?.form?.length) {
      this.initForm(this.content.form);
    }
    // this.getlawyers();
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
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => {
        this.disabled = false;
        const apiParams = this.getCaseParams(value);
        this.apiParams = this.handleLawyer(apiParams);
        this.cd.detectChanges();
      });
  }

  handleLawyer(apiParams: any): any {
    if (!apiParams.data.relationships.lawyer.data.length) {
      delete apiParams.data.relationships.lawyer;
      return apiParams;
    }
    return apiParams;
  }

  updateNode(): void {
    const uuid = this.appState.pageConfig.node.uuid;
    // const uuid = 'cb31d69f-a95e-4c91-97d1-1169f82a10a5';
    this.nodeService
      .updateLawCase(this.apiParams, uuid, this.userState.csrfToken)
      .subscribe((res) => {
        console.log(res);
        this.uti.openSnackbar('已更新！', '✓');
      });
  }

  getlawyers(): void {
    this.nodeService.getNodes('/api/v1/node', 'handler').subscribe((res) => {
      console.log(res);
      const autoList = res.data.map((item: any) => {
        return {
          label: item.attributes.title,
          value: item.id,
        };
      });
      this.formState.autoList$.next(autoList);
    });
  }

  getComments(timeStamp = 1): void {
    this.nodeService
      .getCommentsWitchChild(
        this.content,
        this.userState.currentUser.csrf_token,
        timeStamp
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.comments = res;
        this.cd.detectChanges();
      });
  }

  getCaseParams(value: ICasePrams): any {
    return {
      data: {
        type: 'node--case',
        id: 'deef4a32-fcb3-48aa-8e4e-0a6bd0302f05',
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
          lawyer: {
            data: value.lawyer ? this.getLawyerParams(value.lawyer) : [],
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
}

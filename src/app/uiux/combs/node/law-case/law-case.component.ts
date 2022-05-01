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
import { UserState } from '@core/mobx/user/UserState';
import { FormService } from '@core/service/form.service';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { NodeComponent } from '@uiux/base/node.widget';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public appState: AppState,
    public userState: UserState,
    public nodeService: NodeService,
    private cd: ChangeDetectorRef,
    private formService: FormService,
    private uti: UtilitiesService
  ) {
    super(userState, nodeService);
  }

  ngOnInit(): void {
    this.initForm(this.content.form);
    this.getComments();
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
        console.log(value);
        const params = this.getCaseParams(value);
        console.log(params);
        const uuid = this.appState.pageConfig.node.uuid;
        this.nodeService
          .updateLawCase(params, uuid, this.userState.csrfToken)
          .subscribe((res) => {
            console.log(res);
          });
        this.uti.openSnackbar('已更新！', '✓');
      });
  }

  onChange(state: boolean): void {
    if (state) {
      this.getComments(+new Date());
    }
  }

  getComments(timeStamp = 1): void {
    const { path, type, params } = this.getNodeParams(this.content, timeStamp);
    this.nodeService
      .getNodes(path, type, params)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.comments = res.data.map((comment: any) => {
          return this.handleComment(comment);
        });
        this.cd.markForCheck();
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
          // lawyer: {
          //   data: this.getLawyerParams(value.lawyer),
          // },
        },
      },
    };
  }

  getLawyerParams(value: string): any {
    if (value) {
      const multi = value.split(',');
      return multi.map((item) => {
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

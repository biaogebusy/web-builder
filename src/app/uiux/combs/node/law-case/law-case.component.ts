import {
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ICase } from '@core/interface/node/INode';
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
        this.uti.openSnackbar('已更新！', '✓');
      });
  }

  onSubmit(state: boolean): void {
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
}

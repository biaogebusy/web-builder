import {
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { AppState } from '@core/mobx/AppState';
import { UserState } from '@core/mobx/user/UserState';
import { NodeService } from '@core/service/node.service';
import { NodeComponent } from '@uiux/base/node.widget';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-law-case',
  templateUrl: './law-case.component.html',
  styleUrls: ['./law-case.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LawCaseComponent extends NodeComponent implements OnInit {
  @Input() content: any;
  comments: any[];
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public appState: AppState,
    public userState: UserState,
    public nodeService: NodeService,
    private cd: ChangeDetectorRef
  ) {
    super(userState, nodeService);
  }

  ngOnInit(): void {}

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

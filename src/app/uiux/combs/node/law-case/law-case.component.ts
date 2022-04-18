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
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-law-case',
  templateUrl: './law-case.component.html',
  styleUrls: ['./law-case.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LawCaseComponent implements OnInit {
  @Input() content: any;
  comments: any[];
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public appState: AppState,
    public userState: UserState,
    private nodeService: NodeService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  onSubmit(state: boolean): void {
    // this.getComments();
    if (state) {
      this.getComments(+new Date());
    }
  }

  getComments(timeStamp = 1): void {
    const params = [
      `filter[entity_id.id]=${this.entityId}`,
      `include=uid,uid.user_picture`,
      `fields[user--user]=name,user_picture`,
      `fields[file--file]=uri,url`,
      `sort=-created`,
      'filter[status]=1',
      `jsonapi_include=1`,
      `timeStamp=${timeStamp}`,
    ].join('&');
    const path = this.nodeService.apiUrlConfig.commentGetPath;
    this.nodeService
      .getNodes(path, this.entityType, params)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.comments = res.data.map((comment: any) => {
          return {
            author: {
              img: {
                src: comment.uid.user_picture.uri.url,
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
            content: comment.content.processed,
          };
        });
        this.cd.detectChanges();
      });
  }

  get entityId(): string {
    return (
      this.content?.params?.comment?.relationships?.entity_id?.data?.id || ''
    );
  }

  get entityType(): string {
    return this.content?.params?.comment?.attributes?.field_name || '';
  }
}

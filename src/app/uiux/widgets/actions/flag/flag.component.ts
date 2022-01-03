import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { AppState } from '@core/mobx/AppState';
import { NodeService } from '@core/service/node.service';
import { BaseComponent } from '@uiux/base/base.widget';
import { UserState } from '@core/mobx/user/UserState';
import { switchMap } from 'rxjs/operators';
import { RouteService } from '@core/service/route.service';
import { ScreenService } from '@core/service/screen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlagComponent extends BaseComponent implements OnInit, OnDestroy {
  @Input() content: any;
  config: any;
  flagging = false;

  subscription = new Subscription();
  constructor(
    public nodeService: NodeService,
    public routerService: RouteService,
    private userState: UserState,
    public appState: AppState,
    private screenService: ScreenService,
    private cd: ChangeDetectorRef
  ) {
    super(nodeService, routerService);
  }

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.config = this.appState?.actions?.flag;
      if (this.config?.enabel && this.userState.anthenticated) {
        this.getFlagging();
      }
    }
  }

  get flaggingParams(): any {
    const params = [
      `filter[uid.id]=${this.userState.currentUser.id}`,
      `filter[entity_id]=${this.getDeepValue(
        this.content,
        'params.entity_id'
      )}`,
    ].join('&');
    return params;
  }

  getFlagging(): void {
    const sub$ = this.nodeService
      .getNodes(
        this.appState.apiUrlConfig.flaggingGetPath,
        this.type,
        this.flaggingParams
      )
      .subscribe((res) => {
        if (res.data.length) {
          this.flagging = true;
          this.cd.detectChanges();
        }
      });
    this.subscription.add(sub$);
  }

  onFlag(): void {
    if (!this.flagging) {
      const data = {
        data: {
          type: this.getParams(this.content, 'type'),
          attributes: {
            entity_type: this.getParams(this.content, 'entity_type'),
            entity_id: this.getParams(this.content, 'entity_id'),
            global: false,
          },
          relationships: {
            flagged_entity: {
              data: {
                type: this.getDeepValue(
                  this.content,
                  'params.relationships.flagged_entity.type'
                ),
                id: this.nodeId,
              },
            },
            uid: {
              data: {
                type: 'user--user',
                id: this.userState.currentUser.id,
              },
            },
          },
        },
      };
      const getSub$ = this.nodeService
        .flagging(this.path, JSON.stringify(data))
        .subscribe((res) => {
          this.flagging = true;
          this.cd.detectChanges();
        });
      this.subscription.add(getSub$);
    } else {
      const setSub$ = this.nodeService
        .getNodes(
          this.appState.apiUrlConfig.flaggingGetPath,
          this.type,
          this.flaggingParams
        )
        .pipe(
          switchMap((res) => {
            return this.nodeService.deleteFlagging(this.path, res.data);
          })
        )
        .subscribe((res) => {
          this.flagging = false;
          this.cd.detectChanges();
        });
      this.subscription.add(setSub$);
    }
  }

  getPath(type: string): string {
    return `/${type.replace('--', '/')}`;
  }

  get nodeId(): string {
    return this.getDeepValue(
      this.content,
      'params.relationships.flagged_entity.id'
    );
  }

  get path(): string {
    return `/api/v1${this.getPath(this.getParams(this.content, 'type'))}`;
  }

  get type(): string {
    return this.getParams(this.content, 'type').split('--')[1];
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

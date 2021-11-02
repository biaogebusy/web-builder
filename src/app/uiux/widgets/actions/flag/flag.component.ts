import { Component, OnInit, Input } from '@angular/core';
import { AppState } from 'src/app/mobx/AppState';
import { NodeService } from 'src/app/service/node.service';
import { BaseComponent } from 'src/app/uiux/base/base.widget';
import { UserState } from '../../../../mobx/user/UserState';
import { switchMap } from 'rxjs/operators';
import { RouteService } from 'src/app/service/route.service';

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.scss'],
})
export class FlagComponent extends BaseComponent implements OnInit {
  @Input() content: any;
  config: any;
  flagging = false;
  constructor(
    public nodeService: NodeService,
    public routerService: RouteService,
    private userState: UserState,
    public appState: AppState
  ) {
    super(nodeService, routerService);
  }

  ngOnInit(): void {
    this.config = this.appState?.actions?.flag;
    this.getFlagging();
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
    this.nodeService
      .getNodes(
        this.appState.apiUrlConfig.flaggingGetPath,
        this.type,
        this.flaggingParams
      )
      .subscribe((res) => {
        if (res.data.length) {
          this.flagging = true;
        }
      });
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
      this.nodeService
        .flagging(this.path, JSON.stringify(data))
        .subscribe((res) => {
          this.flagging = true;
        });
    } else {
      this.nodeService
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
        });
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
}

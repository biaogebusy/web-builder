import { Component, OnInit, Input } from '@angular/core';
import { NodeService } from 'src/app/service/node.service';
import { BaseComponent } from 'src/app/uiux/base/base.widget';
import { UserState } from '../../../../mobx/user/UserState';

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.scss'],
})
export class FlagComponent extends BaseComponent implements OnInit {
  @Input() content: any;

  flagging = false;
  constructor(private nodeService: NodeService, private userState: UserState) {
    super();
  }

  ngOnInit(): void {
    this.getFlagging();
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

  getFlagging(): void {
    this.nodeService.getNodes(this.path, this.nodeId).subscribe((res) => {
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
      console.log(data);
      this.nodeService
        .flagging(this.path, JSON.stringify(data))
        .subscribe((res) => {
          console.log(res);
          this.flagging = true;
        });
    } else {
      this.nodeService.deleteEntity(this.path, this.nodeId).subscribe((res) => {
        this.flagging = false;
      });
    }
  }

  getPath(type: string): string {
    return `/${type.replace('--', '/')}`;
  }
}

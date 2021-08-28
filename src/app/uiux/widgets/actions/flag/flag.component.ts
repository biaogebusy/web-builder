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

  style = 'default';
  constructor(private nodeService: NodeService, private userState: UserState) {
    super();
  }

  ngOnInit(): void {}

  onFlag(params: any): void {
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
              id: this.getDeepValue(
                this.content,
                'params.relationships.flagged_entity.id'
              ),
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
      .flagging('/flagging/favorite', JSON.stringify(data))
      .subscribe((res) => {
        console.log(res);
        this.style = 'primary';
      });
  }
}

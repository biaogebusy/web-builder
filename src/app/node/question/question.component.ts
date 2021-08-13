import { Component, Input, OnInit } from '@angular/core';
import { NodeService } from 'src/app/service/node.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @Input() content: any;
  showEditor = false;
  constructor(private nodeService: NodeService) {}

  ngOnInit(): void {
    this.getComments();
  }

  onShowEditor(): void {
    this.showEditor = true;
  }

  get entityId(): string {
    return this.content?.params?.relationships?.entity_id?.data?.id || '';
  }

  get entityType(): string {
    return this.content?.params?.attributes?.field_name || '';
  }

  getComments(): void {
    const params = [
      `filter[entity_id.id]=${this.entityId}`,
      `include=uid,uid.user_picture`,
      `fields[user--user]=name,user_picture`,
      `fields[file--file]=uri,url`,
      `sort=-created`,
      `jsonapi_include=1`,
    ].join('&');
    this.nodeService
      .getNodes(this.entityType, params, 'comment')
      .subscribe((data) => {
        console.log(data);
      });
  }
}

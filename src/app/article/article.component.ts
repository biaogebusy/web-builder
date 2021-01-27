import { Component, OnInit } from '@angular/core';
import { NodeService } from '../service/node.service';
import { ApiService } from '../service/api.service';
import {isArray, keyBy} from 'lodash-es';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  content: any;
  relation: any;
  loading: boolean;
  constructor(
    private nodeService: NodeService,
    public apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    const params = [
      'fields[node--article]=title,body,created,link,field_image',
      'include=field_image',
      'fields[file--file]=uri',
      'page[limit]=20',
    ].join('&');
    this.nodeService.getNodes('article', params).subscribe((res: any) => {
      // console.log(nodes);
      this.loading = false;
      this.content = res.data;
      if (isArray(res.included)) {
        this.relation = keyBy(res.included, 'id');
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { NodeService } from '../service/node.service';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  content: any[] = [];
  constructor(
    private nodeService: NodeService,
    public apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.nodeService.getNodes('article').subscribe((nodes) => {
      // console.log(nodes);
      nodes.forEach((node) => {
        let obj: any;
        this.nodeService
          .getRelationships(node.relationships)
          .subscribe((res) => {
            const attr = node.attributes;
            obj = {
              title: attr.title,
              body: attr.body.value,
              created: attr.created,
              link: node.links.self.href,
              relate: res,
            };
            this.content.push(obj);
          });
      });
    });
  }
}

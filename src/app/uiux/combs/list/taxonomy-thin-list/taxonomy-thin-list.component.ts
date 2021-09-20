import { Component, OnInit, Input } from '@angular/core';
import { NodeService } from 'src/app/service/node.service';
import { RouteService } from 'src/app/service/route.service';
import { BaseComponent } from 'src/app/uiux/base/base.widget';

@Component({
  selector: 'app-taxonomy-thin-list',
  templateUrl: './taxonomy-thin-list.component.html',
  styleUrls: ['./taxonomy-thin-list.component.scss'],
})
export class TaxonomyThinListComponent extends BaseComponent implements OnInit {
  @Input() content: any;
  constructor(
    public nodeService: NodeService,
    public routerService: RouteService
  ) {
    super(nodeService, routerService);
  }

  ngOnInit(): void {}
}

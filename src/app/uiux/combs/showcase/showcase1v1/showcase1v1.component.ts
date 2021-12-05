import { Component, Input, OnInit } from '@angular/core';
import { NodeService } from 'src/app/core/service/node.service';
import { RouteService } from 'src/app/core/service/route.service';
import { BaseComponent } from '@uiux/base/base.widget';

@Component({
  selector: 'app-showcase1v1',
  templateUrl: './showcase1v1.component.html',
  styleUrls: ['./showcase1v1.component.scss'],
})
export class Showcase1v1Component extends BaseComponent implements OnInit {
  @Input() content: any;
  constructor(
    public nodeService: NodeService,
    public routerService: RouteService
  ) {
    super(nodeService, routerService);
  }

  ngOnInit(): void {}
}

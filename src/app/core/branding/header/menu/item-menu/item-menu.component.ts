import { Component, Input, OnInit } from '@angular/core';
import { NodeService } from '@core/service/node.service';
import { RouteService } from '@core/service/route.service';
import { BaseComponent } from '@uiux/base/base.widget';

@Component({
  selector: 'app-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrls: ['./item-menu.component.scss'],
})
export class ItemMenuComponent extends BaseComponent implements OnInit {
  @Input() content: any;
  @Input() params: any;
  isMegaMenu: boolean;

  constructor(
    public nodeService: NodeService,
    public routerService: RouteService
  ) {
    super(nodeService, routerService);
  }

  ngOnInit(): void {
    this.isMegaMenu = !!this.params.isMegaMenu;
  }
}

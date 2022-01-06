import { Component, Input, OnInit } from '@angular/core';
import { ScreenState } from '@core/mobx/screen/ScreenState';
import { NodeService } from '@core/service/node.service';
import { BaseComponent } from '@uiux/base/base.widget';
import { AppState } from '@core/mobx/AppState';
import { RouteService } from '@core/service/route.service';

@Component({
  selector: 'app-hero2v3',
  templateUrl: './hero2v3.component.html',
  styleUrls: ['./hero2v3.component.scss'],
})
export class Hero2v3Component extends BaseComponent implements OnInit {
  @Input() content: any;
  constructor(
    public appState: AppState,
    public screen: ScreenState,
    public nodeService: NodeService,
    public routerService: RouteService
  ) {
    super(nodeService, routerService);
  }

  ngOnInit(): void {}
}

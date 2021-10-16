import { Component, Input, OnInit } from '@angular/core';
import { ScreenState } from 'src/app/mobx/screen/ScreenState';
import { NodeService } from 'src/app/service/node.service';
import { BaseComponent } from 'src/app/uiux/base/base.widget';
import { AppState } from '../../../../mobx/AppState';
import { RouteService } from 'src/app/service/route.service';

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

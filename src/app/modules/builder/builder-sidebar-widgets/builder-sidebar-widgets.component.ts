import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IBuilderWidget } from '@core/interface/IBuilder';

@Component({
  selector: 'app-builder-sidebar-widgets',
  templateUrl: './builder-sidebar-widgets.component.html',
  styleUrls: ['./builder-sidebar-widgets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderSidebarWidgetsComponent implements OnInit {
  @Input() content: IBuilderWidget[];
  constructor() {}

  ngOnInit(): void {}
}

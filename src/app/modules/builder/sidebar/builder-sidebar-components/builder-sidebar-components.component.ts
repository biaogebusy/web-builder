import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IBuilderComponent } from '@core/interface/IBuilder';

@Component({
  selector: 'app-builder-sidebar-components',
  templateUrl: './builder-sidebar-components.component.html',
  styleUrls: ['./builder-sidebar-components.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderSidebarComponentsComponent implements OnInit {
  @Input() content: IBuilderComponent[];
  constructor() {}

  ngOnInit(): void {}
}

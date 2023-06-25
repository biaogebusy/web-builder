import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IBuilderComponent } from '@core/interface/IBuilder';
import { BuilderState } from '@core/state/BuilderState';

@Component({
  selector: 'app-builder-sidebar-widgets',
  templateUrl: './builder-sidebar-widgets.component.html',
  styleUrls: ['./builder-sidebar-widgets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderSidebarWidgetsComponent implements OnInit {
  @Input() content: IBuilderComponent[];
  constructor(private builder: BuilderState) {}

  ngOnInit(): void {}

  onShowcase(content?: any) {
    if (content) {
      this.builder.showcase$.next({
        type: 'card-1v1',
        link: {
          href: '#',
          label: content.type,
        },
        components: [content],
      });
    } else {
      this.builder.showcase$.next(content);
    }
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { BuilderState } from '@core/state/BuilderState';

@Component({
  selector: 'app-builder-sidebar-list',
  templateUrl: './builder-sidebar-list.component.html',
  styleUrls: ['./builder-sidebar-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderSidebarListComponent implements OnInit {
  @Input() content: any;
  constructor(private builder: BuilderState) {}

  ngOnInit(): void {}

  onShowcase(component?: any) {
    if (component) {
      this.builder.showcase$.next({
        type: 'card-1v1',
        link: {
          href: '#',
          label: component.content.type,
        },
        components: [component],
      });
    } else {
      this.builder.showcase$.next(component);
    }
  }
}

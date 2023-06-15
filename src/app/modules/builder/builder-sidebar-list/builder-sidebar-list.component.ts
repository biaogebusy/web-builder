import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewRef,
} from '@angular/core';
import { BuilderState } from '@core/state/BuilderState';

@Component({
  selector: 'app-builder-sidebar-list',
  templateUrl: './builder-sidebar-list.component.html',
  styleUrls: ['./builder-sidebar-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderSidebarListComponent implements OnInit, OnDestroy {
  @Input() content: any;
  constructor(private builder: BuilderState, private cd: ChangeDetectorRef) {}

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

  ngOnDestroy(): void {
    if (this.cd && !(this.cd as ViewRef).destroyed) {
      this.cd.detectChanges();
    }
  }
}

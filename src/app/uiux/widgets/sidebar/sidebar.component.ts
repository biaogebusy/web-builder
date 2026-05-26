import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { DynamicComponentComponent } from '../builder/dynamic-component/dynamic-component.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [DynamicComponentComponent],
})
export class SidebarComponent {
  readonly content = input<any[]>();

}

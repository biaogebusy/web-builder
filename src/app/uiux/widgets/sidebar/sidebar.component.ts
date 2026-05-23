import { Component, Input } from '@angular/core';
import { DynamicComponentComponent } from '../builder/dynamic-component/dynamic-component.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [DynamicComponentComponent],
})
export class SidebarComponent {
  @Input() content: any[];

}

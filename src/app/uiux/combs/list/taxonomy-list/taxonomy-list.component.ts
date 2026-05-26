import {
  ChangeDetectionStrategy,
  Component,
  input
} from '@angular/core';
import { SidebarComponent } from '@uiux/widgets/sidebar/sidebar.component';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-taxonomy-list',
  templateUrl: './taxonomy-list.component.html',
  styleUrls: ['./taxonomy-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ListComponent, SidebarComponent],
})
export class TaxonomyListComponent {
  readonly content = input<any>();
  constructor() {}

}

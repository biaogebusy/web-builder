import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubMenuComponent {
  @Input() content: any;
  @ViewChild('childMenu', { static: true }) public childMenu: any;
}

import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

@Component({
    selector: 'app-header-meta',
    templateUrl: './header-meta.component.html',
    styleUrls: ['./header-meta.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class HeaderMetaComponent {
  @Input() content: any;
  constructor() {}

}

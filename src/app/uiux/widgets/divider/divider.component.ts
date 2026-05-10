import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-divider',
    templateUrl: './divider.component.html',
    styleUrls: ['./divider.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DividerComponent {
  @Input() content: any;

}

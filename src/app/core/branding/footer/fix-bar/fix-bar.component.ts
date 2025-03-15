import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-fix-bar',
    templateUrl: './fix-bar.component.html',
    styleUrls: ['./fix-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class FixBarComponent {
  @Input() content: any[] | undefined;
}

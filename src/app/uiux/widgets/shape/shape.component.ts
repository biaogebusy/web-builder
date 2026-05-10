import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-shape',
    templateUrl: './shape.component.html',
    styleUrls: ['./shape.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ShapeComponent {
  constructor() {}

}

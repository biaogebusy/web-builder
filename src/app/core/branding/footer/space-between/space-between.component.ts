import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-space-between',
  templateUrl: './space-between.component.html',
  styleUrls: ['./space-between.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaceBetweenComponent {
  @Input() content: any;
}

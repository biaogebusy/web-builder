import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { BuilderState } from '@core/state/BuilderState';

@Component({
  selector: 'app-builder-showcase',
  templateUrl: './builder-showcase.component.html',
  styleUrls: ['./builder-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderShowcaseComponent implements OnInit {
  @Input() content: any;
  constructor(private builder: BuilderState) {}

  ngOnInit(): void {}

  onClose(): void {
    this.builder.showcase$.next(false);
  }
}

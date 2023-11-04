import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';

@Component({
  selector: 'app-builder-showcase',
  templateUrl: './builder-showcase.component.html',
  styleUrls: ['./builder-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderShowcaseComponent implements OnInit {
  @Input() content: any;
  constructor(private builder: BuilderState, private util: UtilitiesService) {}

  ngOnInit(): void {}

  onClose(): void {
    this.builder.showcase$.next(false);
  }
  onCopy(content: any): void {
    this.util.copy(JSON.stringify(content));
    this.util.openSnackbar(`已复制${this.content.type}的JSON！`, 'ok');
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IPage } from '@core/interface/IAppConfig';
import { BuilderState } from '@core/state/BuilderState';

@Component({
  selector: 'app-builder-sample',
  templateUrl: './builder-sample.component.html',
  styleUrls: ['./builder-sample.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderSampleComponent implements OnInit {
  @Input() content: any;
  constructor(private builder: BuilderState) {}

  ngOnInit(): void {}

  onSample(page: IPage): void {
    this.builder.initPage(page);
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { IPage } from '@core/interface/IAppConfig';
import type { IBuilderSamplePage } from '@core/interface/IBuilder';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { samples } from '@modules/builder/data/samples-for-builder';

@Component({
  selector: 'app-builder-sample',
  templateUrl: './builder-sample.component.html',
  styleUrls: ['./builder-sample.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderSampleComponent implements OnInit {
  @Input() content: IBuilderSamplePage[];
  constructor(private builder: BuilderState, private util: UtilitiesService) {}

  ngOnInit(): void {
    this.content = samples;
  }

  onSample(page: IPage): void {
    this.util.openSnackbar(`正在载入 ${page.title} 示例...`, 'ok');
    this.builder.loadNewPage(page);
  }
}

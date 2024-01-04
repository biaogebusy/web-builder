import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IPage } from '@core/interface/IAppConfig';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';

@Component({
  selector: 'app-builder-sample',
  templateUrl: './builder-sample.component.html',
  styleUrls: ['./builder-sample.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderSampleComponent implements OnInit {
  @Input() content: any;
  constructor(private builder: BuilderState, private util: UtilitiesService) {}

  ngOnInit(): void {}

  onSample(page: IPage): void {
    this.util.openSnackbar(`正在载入${page.title} 示例...`, 'ok');
    this.builder.version.forEach((version) => (version.current = false));
    this.builder.version.unshift({ ...page, current: true, time: new Date() });
    this.builder.closeBuilderRightDrawer$.next(true);
    this.builder.saveLocalVersions();
  }
}

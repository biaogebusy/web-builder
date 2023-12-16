import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IPage } from '@core/interface/IAppConfig';
import { BuilderState } from '@core/state/BuilderState';
import { LocalStorage } from 'ngx-webstorage';

@Component({
  selector: 'app-builder-version',
  templateUrl: './builder-version.component.html',
  styleUrls: ['./builder-version.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderVersionComponent implements OnInit {
  @Input() content: any;
  @LocalStorage('version')
  version: IPage[];
  constructor(public builderState: BuilderState) {}

  ngOnInit(): void {}

  onVersion(page: IPage): void {
    this.builderState.showVersionPage(page);
  }
}

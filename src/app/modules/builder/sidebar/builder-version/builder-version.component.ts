import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IPage } from '@core/interface/IAppConfig';
import { BuilderState } from '@core/state/BuilderState';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-builder-version',
  templateUrl: './builder-version.component.html',
  styleUrls: ['./builder-version.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderVersionComponent implements OnInit {
  @Input() content: any;
  @LocalStorage('page')
  page: IPage;

  @LocalStorage('version')
  version: IPage[];
  constructor(
    public builderState: BuilderState,
    private storage: LocalStorageService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.storage.observe('version').subscribe(() => {
      this.cd.detectChanges();
    });
  }

  onVersion(page: IPage, index: number): void {
    this.builderState.showVersionPage(page, index);
  }
}

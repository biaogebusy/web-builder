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

  onDelete(index: number): void {
    this.builderState.version.splice(index, 1);
    this.builderState.version[0].current = true;
    this.builderState.saveLocalVersions();
  }

  onDeleteAll(): void {
    this.builderState.version = [
      {
        title: '着陆页',
        body: [],
        current: true,
        time: new Date(),
      },
    ];
    this.builderState.saveLocalVersions();
  }

  onVersion(page: IPage, index: number): void {
    this.builderState.showVersionPage(page, index);
  }
}

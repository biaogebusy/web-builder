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
    public builder: BuilderState,
    private storage: LocalStorageService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.storage.observe('version').subscribe(() => {
      this.cd.detectChanges();
    });
  }

  onDelete(index: number): void {
    this.builder.version.splice(index, 1);
    this.builder.version[0].current = true;
    this.builder.closeBuilderRightDrawer$.next(true);
    this.builder.saveLocalVersions();
  }

  onDeleteAll(): void {
    this.builder.version = [
      {
        title: '着陆页',
        body: [],
        current: true,
        time: new Date(),
      },
    ];
    this.builder.closeBuilderRightDrawer$.next(true);
    this.builder.saveLocalVersions();
  }

  onVersion(page: IPage, index: number): void {
    this.builder.showVersionPage(page, index);
    this.builder.closeBuilderRightDrawer$.next(true);
    this.builder.fixedShowcase = false;
    this.builder.showcase$.next(false);
  }

  onClickTitle(event: MouseEvent): any {
    event.stopPropagation();
  }

  onUpdateTitle(event: any, index: number): void {
    const {
      target: { textContent },
    } = event;
    if (textContent) {
      this.builder.version[index].title = textContent;
      this.builder.saveLocalVersions();
    }
  }
}

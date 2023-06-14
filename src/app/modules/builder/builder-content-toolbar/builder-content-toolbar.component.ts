import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import type { IPage } from '@core/interface/IAppConfig';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { ScreenState } from '@core/state/screen/ScreenState';
import { LocalStorageService } from 'ngx-webstorage';
import { ScreenService } from '../../../core/service/screen.service';

@Component({
  selector: 'app-builder-content-toolbar',
  templateUrl: './builder-content-toolbar.component.html',
  styleUrls: ['./builder-content-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderContentToolbarComponent implements OnInit, AfterViewInit {
  @Input() drawer: MatDrawer;
  @Input() containerDrawer: MatDrawer;
  @Input() opened: boolean;
  @Input() page: IPage;

  @Output() animateChange: EventEmitter<boolean> = new EventEmitter();
  constructor(
    private storage: LocalStorageService,
    private builder: BuilderState,
    private util: UtilitiesService,
    private screenState: ScreenState,
    private screenService: ScreenService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.screenState.mqAlias$().subscribe((alia) => {
        if (alia.includes('xs')) {
          this.builder.toolbarDisable$.next(true);
          this.onClose();
          this.containerDrawer.close();
        } else {
          this.onOpen();
        }
      });
    }
  }

  loadAnimate(): void {
    this.animateChange.emit(true);
  }

  onOpen(): void {
    this.drawer.open();
    this.storage.store('builderFullSize', false);
  }

  onClose(): void {
    this.drawer.close();
    this.storage.store('builderFullSize', true);
  }

  onGenerate(): void {
    this.containerDrawer.toggle();
    this.onClose();
  }

  onPreview(event: MatSlideToggleChange): void {
    this.builder.toolbarDisable$.next(event.checked);
    this.onClose();
    this.containerDrawer.close();
    this.util.openSnackbar('已禁用编辑组件，可预览组件动画', 'ok');
  }
}

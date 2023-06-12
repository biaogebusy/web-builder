import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import type { IPage } from '@core/interface/IAppConfig';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-builder-content-toolbar',
  templateUrl: './builder-content-toolbar.component.html',
  styleUrls: ['./builder-content-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderContentToolbarComponent implements OnInit {
  @Input() drawer: MatDrawer;
  @Input() opened: boolean;
  @Input() page: IPage;

  @Output() animateChange: EventEmitter<boolean> = new EventEmitter();
  constructor(private storage: LocalStorageService) {}

  ngOnInit(): void {}

  loadAnimate(): void {
    this.animateChange.emit(true);
  }
  onOpen(): void {
    this.drawer.open();
    this.storage.store('builderFullSize', false);
  }
}

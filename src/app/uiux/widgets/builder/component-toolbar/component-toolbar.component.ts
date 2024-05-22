import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import type { IComponentToolbar } from '@core/interface/combs/IBuilder';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { IS_BUILDER_MODE } from '@core/token/token-providers';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-component-toolbar',
  templateUrl: './component-toolbar.component.html',
  styleUrls: ['./component-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentToolbarComponent implements OnInit {
  @Input() content: IComponentToolbar;
  // for builder preview page
  @Input() isPreview: boolean;

  @Input() index: number;
  @HostBinding('class.component-toolbar') hostClass = true;
  dialogRef: any;
  enableBuilderToolbar: boolean;
  showGrid = false;

  constructor(
    private builder: BuilderState,
    private storage: LocalStorageService,
    private util: UtilitiesService,
    @Inject(IS_BUILDER_MODE)
    public isBDMode$: Observable<boolean>
  ) {}

  ngOnInit(): void {
    this.isBDMode$.subscribe((state) => {
      this.enableBuilderToolbar = state;
    });
  }

  get type(): string {
    return this.content.type || this.content.content?.type || '';
  }

  onUpdown(index: number, direction: string): void {
    this.builder.upDownComponent(index, direction);
  }

  onCopy(): void {
    const content = this.content.type ? this.content : this.content.content;
    if (content) {
      delete content.extra;
      this.util.copy(JSON.stringify(content));
      this.util.openSnackbar(`已复制${content.type}JSON`);
      this.storage.store(this.builder.COPYKEY, content);
    }
  }

  onSetting(content: any, pageIndex: number, event: any): void {
    const { type } = content;
    const path = this.util.generatePath(event.target);
    const component = type ? content : content.content;
    this.builder.onComponentSetting(component, pageIndex, path);
  }

  onShowGrid(): void {
    this.showGrid = !this.showGrid;
    this.builder.showGrid$.next(this.showGrid);
  }

  onDelete(index: number): void {
    this.builder.deleteComponent(index);
  }
}

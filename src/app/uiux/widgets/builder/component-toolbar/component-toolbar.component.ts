import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Inject,
  Input,
  OnInit,
  inject,
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

  public bcData: any;

  builder = inject(BuilderState);
  storage = inject(LocalStorageService);
  util = inject(UtilitiesService);
  cd = inject(ChangeDetectorRef);
  constructor(
    @Inject(IS_BUILDER_MODE)
    public isBDMode$: Observable<boolean>,
  ) {}

  ngOnInit(): void {
    this.isBDMode$.subscribe((state) => {
      this.enableBuilderToolbar = state;
    });

    this.storage.observe(this.builder.COPYKEY).subscribe((data) => {
      this.bcData = data;
      this.cd.detectChanges();
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
      this.util.openSnackbar(`已复制${content.type}JSON`, 'ok', {
        verticalPosition: 'bottom',
      });
      this.storage.store(this.builder.COPYKEY, content);
    }
  }

  onPaste(event: any, content: any): void {
    const path = this.util.generatePath(event.target);
    this.builder.updatePageContentByPath(path, content, 'add');
    this.storage.clear(this.builder.COPYKEY);
  }

  onSetting(content: any, pageIndex: number, event: any): void {
    const { type } = content;
    const path = this.util.generatePath(event.target);
    const component = type ? content : content.content;
    this.builder.onComponentSetting(component, pageIndex, path);
  }

  onDelete(index: number): void {
    this.builder.deleteComponent(index);
  }
}

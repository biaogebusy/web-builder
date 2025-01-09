import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
  Input,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import type { IComponentToolbar } from '@core/interface/combs/IBuilder';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { IS_BUILDER_MODE } from '@core/token/token-providers';
import { getComponentSetting } from '@modules/builder/factory/getComponentSetting';
import { FormlyFieldConfig } from '@ngx-formly/core';
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
  @Input() index: number;
  @HostBinding('class.component-toolbar') hostClass = true;
  dialogRef: any;

  public bcData = signal(false);

  builder = inject(BuilderState);
  storage = inject(LocalStorageService);
  util = inject(UtilitiesService);
  constructor(
    @Inject(IS_BUILDER_MODE)
    public isBDMode$: Observable<boolean>
  ) {}

  ngOnInit(): void {
    this.storage.observe(this.builder.COPYCOMPONENTKEY).subscribe(data => {
      this.bcData.set(data);
    });
  }

  get type(): string {
    return this.content.type || this.content.content?.type || '';
  }

  onUpdown(index: number, direction: string, event: any): void {
    const path = this.util.generatePath(event.target);
    this.builder.upDownComponent(index, direction, path);
    this.hiddenPicker();
  }

  onCopy(): void {
    const content = this.content.type ? this.content : this.content.content;
    if (content) {
      delete content.extra;
      this.util.copy(JSON.stringify(content));
      this.util.openSnackbar(`已复制${content.type}JSON`, 'ok', {
        verticalPosition: 'bottom',
      });
      this.storage.store(this.builder.COPYCOMPONENTKEY, content);
    }
  }

  onPaste(event: any, content: any): void {
    const path = this.util.generatePath(event.target);
    this.builder.updatePageContentByPath(path, content, 'add');
    this.hiddenPicker();
    this.storage.clear(this.builder.COPYCOMPONENTKEY);
  }

  onSetting(content: any, event: any): void {
    const { type } = content;
    const path = this.util.generatePath(event.target);
    const component = type ? content : content.content;
    const fields: FormlyFieldConfig[] = getComponentSetting(component, path);
    this.hiddenPicker();
    this.builder.showComponentSetting(component, fields, path);
  }

  onDelete(event: any): void {
    const path = this.util.generatePath(event.target);
    this.hiddenPicker();
    this.builder.deleteComponent(path);
  }

  hiddenPicker(): void {
    this.builder.widgetsPicker$.next(false);
  }
}

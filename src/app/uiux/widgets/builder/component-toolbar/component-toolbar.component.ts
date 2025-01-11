import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { IPage } from '@core/interface/IAppConfig';
import type { IComponentToolbar } from '@core/interface/combs/IBuilder';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { BUILDER_CURRENT_PAGE } from '@core/token/token-providers';
import { getComponentSetting } from '@modules/builder/factory/getComponentSetting';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { get } from 'lodash-es';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, delay } from 'rxjs';

@Component({
  selector: 'app-component-toolbar',
  templateUrl: './component-toolbar.component.html',
  styleUrls: ['./component-toolbar.component.scss'],
})
export class ComponentToolbarComponent implements OnInit, AfterViewInit {
  @Input() content: IComponentToolbar;
  index = signal(0);
  length = signal(0);
  @HostBinding('class.component-toolbar') hostClass = true;

  public bcData = signal(false);

  builder = inject(BuilderState);
  storage = inject(LocalStorageService);
  util = inject(UtilitiesService);
  ele = inject(ElementRef);
  currentPage: IPage;
  constructor(@Inject(BUILDER_CURRENT_PAGE) private currentPage$: Observable<IPage>) {}

  ngOnInit(): void {
    this.storage.observe(this.builder.COPYCOMPONENTKEY).subscribe(data => {
      this.bcData.set(data);
    });
  }

  ngAfterViewInit(): void {
    this.currentPage$.pipe(delay(500)).subscribe(page => {
      this.currentPage = page;
      this.getIndex();
    });
  }

  getIndex(): void {
    const path = this.util.generatePath(this.ele.nativeElement);
    const index = this.builder.targetIndex(path);
    this.index.set(index);
    const lastDotIndex = path.lastIndexOf('.');
    const body = this.currentPage.body;
    if (lastDotIndex !== -1) {
      // child component
      const before = path.slice(0, lastDotIndex);
      const targetArray = get(body, before);
      if (Array.isArray(targetArray)) {
        this.length.set(targetArray.length);
      }
    } else {
      // top parent component
      this.length.set(body.length);
    }
  }

  get type(): string {
    return this.content.type || this.content.content?.type || '';
  }

  onUpdown(direction: string, event: any): void {
    const path = this.util.generatePath(event.target);
    this.builder.upDownComponent(direction, path);
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

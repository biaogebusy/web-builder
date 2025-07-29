import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import type {
  IBuilderComponent,
  IBuilderConfig,
  IUiux,
  IWidgetPicker,
} from '@core/interface/IBuilder';
import { BuilderState } from '@core/state/BuilderState';
import { BUILDER_CONFIG, UIUX } from '@core/token/token-providers';
import { Observable, Subject } from 'rxjs';
import { createPopper } from '@popperjs/core';
import { LocalStorageService } from 'ngx-webstorage';
import { cloneDeep } from 'lodash-es';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UtilitiesService } from '@core/service/utilities.service';
@Component({
  selector: 'app-widget-picker',
  templateUrl: './widget-picker.component.html',
  styleUrls: ['./widget-picker.component.scss'],
  standalone: false,
})
export class WidgetPickerComponent implements OnInit, AfterViewInit {
  @Input() content: IWidgetPicker | false;
  @ViewChild('groupPopup', { static: false }) groupPopup: ElementRef;
  @ViewChild('popup', { static: false }) widgetPopup: ElementRef;
  public widget$ = new Subject<any>();
  public group$ = new Subject<IBuilderComponent | false>();
  public help: any;
  private groupPopper: any;
  private widgetPopper: any;
  public show = signal(false);

  public bcData = signal(false);
  private uiux$ = inject<Observable<any[]>>(UIUX);
  public widgets = signal<IUiux>({ label: '', icon: '', type: 'base', elements: [] });
  private builder = inject(BuilderState);
  private util = inject(UtilitiesService);
  private destroyRef = inject(DestroyRef);
  private storage = inject(LocalStorageService);
  public builderConfig$ = inject<Observable<IBuilderConfig>>(BUILDER_CONFIG);

  ngOnInit(): void {
    this.storage.observe(this.builder.COPYCOMPONENTKEY).subscribe(data => {
      this.bcData.set(data);
    });
    this.uiux$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(libaries => {
      const [first] = libaries;
      this.widgets.set(first);
    });
  }

  ngAfterViewInit(): void {
    this.builder.widgetsPicker$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(content => {
      this.content = content;
      this.show.set(!!this.content);
    });
  }

  onPasteData(): void {
    this.onSelect(this.bcData());
    this.storage.clear(this.builder.COPYCOMPONENTKEY);
  }

  onSelect(widget: any): void {
    if (!this.content) {
      this.util.openSnackbar('请先选择插入组件的位置', 'ok');
      return;
    }
    const { addType, path, content } = this.content;
    const data = cloneDeep(content);
    const widgetContent = cloneDeep(widget);

    // add widget from layout builder toolbar
    if (addType === 'widget') {
      this.builder.updatePageContentByPath(path, widgetContent, 'add');
      this.onLeave();
      return;
    }

    if (addType === 'layout') {
      this.builder.updatePageContentByPath(
        path,
        this.copyLayoutLastChild(data.elements, widgetContent),
        'add'
      );
      this.onLeave();
      return;
    }

    // add widget from loop element of layout builder top level
    const lists = [...data.elements];
    lists.splice(lists.length, 0, widgetContent);
    this.builder.updatePageContentByPath(`${path}.elements`, lists);
    this.onLeave();
  }

  onLeave(): void {
    this.group$.next(false);
    this.widget$.next(false);
    if (this.groupPopper) {
      this.groupPopper.destroy();
    }
    if (this.widgetPopper) {
      this.widgetPopper.destroy();
    }
    this.builder.widgetsPicker$.next(false);
  }
  copyLayoutLastChild(elements: any[], widget: any): any {
    const last = Object.assign({}, elements[elements.length - 1]);
    last.elements = [cloneDeep(widget)];
    return last;
  }

  onHoverGroup(group: any, ele: any): void {
    if (this.groupPopup?.nativeElement) {
      this.group$.next(false);
      this.widget$.next(false);
      if (this.groupPopper) {
        this.groupPopper.destroy();
      }
      if (this.widgetPopper) {
        this.widgetPopper.destroy();
      }
      this.group$.next(group);
      this.groupPopper = createPopper(ele, this.groupPopup.nativeElement, {
        strategy: 'fixed',
        placement: 'auto-end',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 10],
            },
          },
        ],
      });
      this.groupPopper.update();
    }
  }
  onHoverWidget(widget: any, ele: any): void {
    if (this.widgetPopup?.nativeElement) {
      if (this.widgetPopper) {
        this.widgetPopper.destroy();
      }
      this.widget$.next(widget);
      this.widgetPopper = createPopper(ele, this.widgetPopup.nativeElement, {
        placement: 'bottom',
        strategy: 'fixed',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 10],
            },
          },
        ],
      });
      this.widgetPopper.update();
    }
  }
}

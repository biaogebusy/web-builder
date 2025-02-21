import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import type { IWidgetPicker } from '@core/interface/IBuilder';
import { BuilderState } from '@core/state/BuilderState';
import { WIDGETS } from '@core/token/token-providers';
import { Subject } from 'rxjs';
import { createPopper } from '@popperjs/core';
import { LocalStorageService } from 'ngx-webstorage';
import { BuilderService } from '@core/service/builder.service';
import { cloneDeep } from 'lodash-es';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UtilitiesService } from '@core/service/utilities.service';
@Component({
  selector: 'app-widget-picker',
  templateUrl: './widget-picker.component.html',
  styleUrls: ['./widget-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetPickerComponent implements OnInit, AfterViewInit {
  @Input() content: IWidgetPicker | false;
  @ViewChild('groupPopup', { static: false }) groupPopup: ElementRef;
  @ViewChild('popup', { static: false }) widgetPopup: ElementRef;
  public widget$ = new Subject<any>();
  public group$ = new Subject<any>();
  public help: any;
  private groupPopper: any;
  private widgetPopper: any;
  public show = signal(false);

  public bcData = signal(false);
  public widgets = inject(WIDGETS);
  private builder = inject(BuilderState);
  private util = inject(UtilitiesService);
  private destroyRef = inject(DestroyRef);
  private storage = inject(LocalStorageService);
  private builderService = inject(BuilderService);

  ngOnInit(): void {
    const {
      widgetPicker: { help },
    } = this.builderService.builderConfig;
    this.help = help;
    this.storage.observe(this.builder.COPYCOMPONENTKEY).subscribe(data => {
      this.bcData.set(data);
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
      return;
    }

    if (addType === 'layout') {
      this.builder.updatePageContentByPath(
        path,
        this.copyLayoutLastChild(data.elements, widgetContent),
        'add'
      );
      return;
    }

    // add widget from loop element of layout builder top level
    const lists = [...data.elements];
    lists.splice(lists.length, 0, widgetContent);
    this.builder.updatePageContentByPath(`${path}.elements`, lists);
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
        placement: 'left-start',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 6],
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
        placement: 'left',
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

  onHoverCopy(widget: any, ele: any): void {
    this.group$.next(false);
    if (this.groupPopper) {
      this.groupPopper.destroy();
    }
    this.onHoverWidget(widget, ele);
  }

  hoverExpand(): void {
    this.show.set(true);
  }
}

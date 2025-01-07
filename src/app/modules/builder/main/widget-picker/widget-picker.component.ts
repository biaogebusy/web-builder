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
  help: any;
  groupPopper: any;
  widgetPopper: any;

  ele = inject(ElementRef);
  widgets = inject(WIDGETS);
  builder = inject(BuilderState);
  storage = inject(LocalStorageService);
  builderService = inject(BuilderService);
  destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const {
      widgetPicker: { help },
    } = this.builderService.builderConfig;
    this.help = help;
  }

  ngAfterViewInit(): void {
    this.builder.widgetsPicker$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(content => {
      this.content = content;
    });
  }

  onSelect(widget: any): void {
    if (!this.content) {
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
              offset: [0, 4],
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
}

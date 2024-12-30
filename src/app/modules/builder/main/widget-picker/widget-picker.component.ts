import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
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
import { MatDialog } from '@angular/material/dialog';
import { BuilderService } from '@core/service/builder.service';
import { cloneDeep } from 'lodash-es';
@Component({
  selector: 'app-widget-picker',
  templateUrl: './widget-picker.component.html',
  styleUrls: ['./widget-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetPickerComponent implements OnInit, AfterViewInit {
  @Input() content: IWidgetPicker;
  @ViewChild('popup', { static: false }) popup: ElementRef;
  public widget$ = new Subject<any>();
  help: any;
  popper: any;

  public bcData: any;
  builder = inject(BuilderState);
  dialog = inject(MatDialog);
  storage = inject(LocalStorageService);
  ele = inject(ElementRef);
  builderService = inject(BuilderService);

  constructor(@Inject(WIDGETS) public widgets: any[]) {}

  ngOnInit(): void {
    const {
      widgetPicker: { help },
    } = this.builderService.builderConfig;
    this.help = help;
    this.bcData = this.storage.retrieve(this.builder.COPYWIDGETKEY);
  }

  ngAfterViewInit(): void {}

  onPasteData(): void {
    this.onSelect(this.bcData);
    this.storage.clear(this.builder.COPYWIDGETKEY);
  }

  onSelect(widget: any): void {
    const { addType, path, content } = this.content;
    const data = cloneDeep(content);

    // add widget from layout builder toolbar
    if (addType === 'widget') {
      this.builder.updatePageContentByPath(path, widget, 'add');
      this.dialog.closeAll();
      return;
    }

    if (addType === 'layout') {
      this.builder.updatePageContentByPath(
        path,
        this.copyLayoutLastChild(data.elements, widget),
        'add'
      );
      this.dialog.closeAll();
      return;
    }

    // add widget from loop element of layout builder top level
    const lists = [...data.elements];
    lists.splice(lists.length, 0, widget);
    this.builder.updatePageContentByPath(`${path}.elements`, lists);
    this.dialog.closeAll();
  }

  onLeave(): void {
    this.widget$.next(false);
    this.popper.destroy();
  }
  copyLayoutLastChild(elements: any[], widget: any): any {
    const last = Object.assign({}, elements[elements.length - 1]);
    last.elements = [cloneDeep(widget)];
    return last;
  }

  onHover(widget: any, ele: any): void {
    if (this.popup?.nativeElement) {
      const parentRect = this.ele.nativeElement.getBoundingClientRect();
      const widgetRect = ele.getBoundingClientRect();
      const offset = widgetRect.left - parentRect.left;
      this.widget$.next(widget);
      this.popper = createPopper(ele, this.popup.nativeElement, {
        placement: 'left',
        strategy: 'fixed',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, offset + 24],
            },
          },
        ],
      });
    }
  }
}

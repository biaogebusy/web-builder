import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
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
  @ViewChild('groupPopup', { static: false }) groupPopup: ElementRef;
  public widget$ = new Subject<any>();
  public group$ = new Subject<any>();
  help: any;
  popper: any;

  public bcData: any;
  ele = inject(ElementRef);
  widgets = inject(WIDGETS);
  dialog = inject(MatDialog);
  builder = inject(BuilderState);
  storage = inject(LocalStorageService);
  builderService = inject(BuilderService);

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
    const widgetContent = cloneDeep(widget);

    // add widget from layout builder toolbar
    if (addType === 'widget') {
      this.builder.updatePageContentByPath(path, widgetContent, 'add');
      this.dialog.closeAll();
      return;
    }

    if (addType === 'layout') {
      this.builder.updatePageContentByPath(
        path,
        this.copyLayoutLastChild(data.elements, widgetContent),
        'add'
      );
      this.dialog.closeAll();
      return;
    }

    // add widget from loop element of layout builder top level
    const lists = [...data.elements];
    lists.splice(lists.length, 0, widgetContent);
    this.builder.updatePageContentByPath(`${path}.elements`, lists);
    this.dialog.closeAll();
  }

  onLeave(): void {
    this.group$.next(false);
    this.popper.destroy();
  }
  copyLayoutLastChild(elements: any[], widget: any): any {
    const last = Object.assign({}, elements[elements.length - 1]);
    last.elements = [cloneDeep(widget)];
    return last;
  }

  onHoverGroup(group: any, ele: any): void {
    if (this.groupPopup?.nativeElement) {
      const parentRect = this.ele.nativeElement.getBoundingClientRect();
      const widgetRect = ele.getBoundingClientRect();
      const offset = widgetRect.left - parentRect.left;
      this.group$.next(group);
      this.popper = createPopper(ele, this.groupPopup.nativeElement, {
        placement: 'left',
      });
    }
  }
}

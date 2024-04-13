import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import type { IWidgetPicker } from '@core/interface/IBuilder';
import { BuilderState } from '@core/state/BuilderState';
import { WIDGETS } from '@core/token/token-providers';
import { Observable, Subject } from 'rxjs';
import { createPopper } from '@popperjs/core';
@Component({
  selector: 'app-widget-picker',
  templateUrl: './widget-picker.component.html',
  styleUrls: ['./widget-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetPickerComponent implements OnInit {
  @Input() content: IWidgetPicker;
  @ViewChild('popup', { static: false }) popup: ElementRef;
  public widget$: Subject<any> = new Subject();
  constructor(
    private builder: BuilderState,
    private dialog: MatDialog,
    @Inject(WIDGETS) public widgets$: Observable<any[]>
  ) {}

  ngOnInit(): void {}

  onSelect(widget: any): void {
    const { addType, path, content } = this.content;

    // add widget from layout builder toolbar
    if (addType === 'widget') {
      this.builder.updatePageContentByPath(path, { ...widget.content }, 'add');
      this.dialog.closeAll();
      return;
    }

    if (addType === 'layout') {
      this.builder.updatePageContentByPath(
        path,
        this.copyLayoutLastChild(content.elements, { ...widget.content }),
        'add'
      );
      this.dialog.closeAll();
      return;
    }

    // add widget from loop element of layout builder top level
    const lists = [...content.elements];
    lists.splice(lists.length, 0, { ...widget.content });
    this.builder.updatePageContentByPath(`${path}.elements`, lists);
    this.dialog.closeAll();
  }

  copyLayoutLastChild(elements: any[], widget: any): any {
    const last = Object.assign({}, elements[elements.length - 1]);
    last.elements = [widget];
    return last;
  }

  onHover(widget: any, ele: any): void {
    if (this.popup?.nativeElement) {
      this.widget$.next(widget);
      createPopper(ele, this.popup.nativeElement, {
        placement: 'top',
        strategy: 'fixed',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 30],
            },
          },
        ],
      });
    }
  }
}

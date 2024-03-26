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
    const { row, i, index, pageIndex, content, level, uuid } = this.content;
    if (content.type === 'layout-builder') {
      if (row === 'down') {
        content.elements[i].elements.splice(index + 1, 0, widget.content);
        this.builder.updateComponent(pageIndex, content);
      }

      if (row === 'next') {
        content.elements.splice(
          i + 1,
          0,
          this.copyLayoutLastChild(content.elements, widget.content)
        );
        this.builder.updateComponent(pageIndex, content);
      }

      if (level === 'block') {
        content.elements.splice(
          content.elements.length,
          0,
          this.copyLayoutLastChild(content.elements, widget.content)
        );
        this.builder.builderLayoutSetting$.next({
          value: content,
          uuid,
          pageIndex,
        });
      }
    } else {
      if (level === 'block' && content.elements) {
        content.elements.splice(content.elements.length, 0, widget.content);
        this.builder.builderLayoutSetting$.next({
          value: content,
          uuid,
          pageIndex,
        });
      }
    }

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

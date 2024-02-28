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
import type { ILayoutBlock, IPopupSelect } from '@core/interface/IBuilder';
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
  @Input() content: IPopupSelect;
  @ViewChild('popup', { static: false }) popup: ElementRef;
  public widget$: Subject<any> = new Subject();
  constructor(
    private builder: BuilderState,
    @Inject(WIDGETS) public widgets$: Observable<any[]>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onSelect(widget: any): void {
    const { row, i, index, pageIndex, content } = this.content;
    if (row === 'down') {
      content.elements[i].elements.splice(index + 1, 0, widget.content);
    }

    if (row === 'next') {
      const block: ILayoutBlock = {
        row: {
          xs: 12,
          sm: 6,
          md: 6,
          lg: 4,
        },
        classes: '',
        style: '',
        direction: 'column',
        layoutAlign: 'center center',
        elements: [widget.content],
      };
      content.elements.splice(i + 1, 0, block);
    }

    this.builder.updateComponent(pageIndex, content);
    this.dialog.closeAll();
  }

  onHover(widget: any, ele: any): void {
    if (this.popup?.nativeElement) {
      this.widget$.next(widget.content);
      createPopper(ele, this.popup.nativeElement, {
        placement: 'top',
        strategy: 'fixed',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 20],
            },
          },
        ],
      });
    }
  }
}

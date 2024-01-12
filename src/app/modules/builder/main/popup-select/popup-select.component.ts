import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BuilderState } from '@core/state/BuilderState';
import { POPUP_SELECT } from '@core/token/token-providers';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-popup-select',
  templateUrl: './popup-select.component.html',
  styleUrls: ['./popup-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupSelectComponent implements OnInit {
  @Input() content: any;
  public widget$: Subject<any> = new Subject();
  constructor(
    private builder: BuilderState,
    @Inject(POPUP_SELECT) public widgets$: Observable<any[]>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onSelect(widget: any): void {
    const { row, index, pageIndex, uuid, content } = this.content;
    if (row === 'down') {
      content.elements[index].elements.push(widget.content);
    }

    if (row === 'next') {
      content.elements.splice(index + 1, 0, {
        row: {
          xs: 12,
          sm: 6,
          md: 6,
          lg: 4,
        },
        align: 'center center',
        elements: [widget.content],
      });
    }

    this.builder.updateComponent(pageIndex, content);
    this.dialog.closeAll();
  }

  onHover(widget: any): void {
    this.widget$.next(widget.content);
  }
}

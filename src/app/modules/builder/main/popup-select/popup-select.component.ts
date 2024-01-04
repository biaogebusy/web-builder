import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ILayoutBuilder } from '@core/interface/IBuilder';
import { BuilderState } from '@core/state/BuilderState';
import { POPUP_SELECT } from '@core/token/token-providers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-popup-select',
  templateUrl: './popup-select.component.html',
  styleUrls: ['./popup-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupSelectComponent implements OnInit {
  @Input() content: any;
  constructor(
    private builder: BuilderState,
    @Inject(POPUP_SELECT) public widgets$: Observable<any[]>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onSelect(widget: any): void {
    console.log(widget);
    const { row, index, pageIndex, uuid, content } = this.content;
    let component: any = {};
    if (row === 'down') {
      content.elements[index].elements.push(widget.content);
    }

    if (row === 'next') {
      content.elements.splice(index + 1, 0, {
        row: 4,
        elements: [widget.content],
      });
    }

    this.builder.updateComponent(pageIndex, content);
    this.dialog.closeAll();
    // this.builder.builderPopupSelect$.next({
    //   content,
    //   pageIndex,
    //   uuid,
    // });
  }
}

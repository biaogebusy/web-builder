import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ILayoutBuilder } from '@core/interface/IBuilder';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';

@Component({
  selector: 'app-layout-builder',
  templateUrl: './layout-builder.component.html',
  styleUrls: ['./layout-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutBuilderComponent implements OnInit {
  @Input() content: ILayoutBuilder;
  @Input() pageIndex: number;
  @Input() uuid: string;
  constructor(private dialog: MatDialog, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}

  addBlock(row: string, index: number, content: any): void {
    this.dialog.open(DialogComponent, {
      width: '500px',
      data: {
        inputData: {
          content: {
            type: 'popup-select',
            row,
            index,
            pageIndex: this.pageIndex,
            uuid: this.uuid,
            content,
          },
        },
      },
    });
  }

  onMove(de: string, i: number, index: number): void {
    const { elements } = this.content;
    if (de === 'up') {
      [elements[i].elements[index - 1], elements[i].elements[index]] = [
        elements[i].elements[index],
        elements[i].elements[index - 1],
      ];
    } else {
      [elements[i].elements[index], elements[i].elements[index + 1]] = [
        elements[i].elements[index + 1],
        elements[i].elements[index],
      ];
    }
    this.cd.detectChanges();
  }

  onDelete(i: number, index: number): void {
    console.log(i);
    console.log(index);
    const { elements } = this.content;
    let component: any = {};
    elements[i].elements.splice(index, 1);
    this.cd.detectChanges();
  }

  drop(event: any): void {
    console.log(event);
  }
}

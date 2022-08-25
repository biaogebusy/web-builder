import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import type { IDynamicTable } from '../IWidgets';
import { TextComponent } from '../text/text.component';
import { RouteService } from '@core/service/route.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class DynamicTableComponent implements OnInit {
  @Input() content: IDynamicTable;
  @Input() form: FormGroup;

  displayedColumns: string[];
  columnsToDisplayWithExpand: string[];
  expandedElement: null;

  constructor(private dialog: MatDialog, private routService: RouteService) {}

  ngOnInit(): void {
    if (this.content.elements) {
      this.displayedColumns = this.content.header.map((item: any) => item.key);
      this.columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
    }
  }

  onDialog(label: string, content: any): void {
    this.dialog.open(DialogComponent, {
      width: '600px',
      data: {
        renderInputComponent: TextComponent,
        inputData: {
          content: {
            type: 'text',
            spacer: 'none',
            title: {
              label,
              style: 'style-v4',
            },
            body: content,
          },
        },
      },
    });
  }

  onNav(event: any): void {
    this.routService.eventLinkToNav(event);
  }
}

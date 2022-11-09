import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-search-filter-item',
  templateUrl: './search-filter-item.component.html',
  styleUrls: ['./search-filter-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFilterItemComponent implements OnInit {
  @Input() content: any;
  @Input() dialogData: any[];
  @Output() filterChange = new EventEmitter();
  activeItem: any;
  filters: any[];
  isMore = false;
  currentDialogData: any;
  filterDataKey = 'filterDate';
  filterData: any = {};
  constructor(
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private storage: LocalStorageService
  ) {}

  ngOnInit(): void {
    const show: number = this.content?.params?.expand?.show;
    if (show) {
      this.filters = this.content.elements.slice(0, show);
    } else {
      this.filters = this.content.elements;
    }
    this.cd.detectChanges();
  }

  onToggle(): void {
    this.isMore = !this.isMore;
    const show: number = this.content?.params?.expand?.show;
    if (this.isMore) {
      this.filters = this.content.elements;
    } else {
      this.filters = this.content.elements.slice(0, show);
    }
    this.cd.detectChanges();
  }

  getActive(item: any): string {
    return this.activeItem === item ? 'active' : '';
  }

  onClick(item: any): void {
    const filterData = this.storage.retrieve(this.filterDataKey);
    let dialgoRef: any = {};
    // tragger dialog
    this.activeItem = item;
    if ('dialogFrom' in item) {
      this.currentDialogData = this.dialogData[item.dialogFrom];
      this.storage.store(this.filterDataKey, {
        [this.content.key]: item.value,
      });
      dialgoRef = this.dialog.open(DialogComponent, {
        width: '80vw',
        panelClass: 'search-filter-dialog',
        data: {
          renderInputComponent: SearchFilterItemComponent,
          inputData: {
            content: {
              ...this.currentDialogData,
              title: {
                label: item.label,
                style: 'style-v4',
              },
            },
          },
        },
      });
    } else {
      this.storage.store(
        this.filterDataKey,
        Object.assign({}, filterData, {
          [this.content.key]: item.value,
        })
      );
    }

    this.cd.detectChanges();
  }
}

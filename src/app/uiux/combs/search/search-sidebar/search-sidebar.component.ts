import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TreeviewItem } from 'ngx-treeview';
import { FormService } from 'src/app/service/form.service';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-search-sidebar',
  templateUrl: './search-sidebar.component.html',
  styleUrls: ['./search-sidebar.component.scss'],
})
export class SearchSidebarComponent implements OnInit {
  @Input() content: any;
  @Output() selectChange = new EventEmitter();

  treeView: any[];
  panelOpenState = true;
  form: FormGroup;
  config = {
    hasAllCheckBox: false,
    hasFilter: false,
    hasCollapseExpand: false,
    decoupleChildFromParent: false,
    maxHeight: 500,
    hasDivider: false,
  };
  constructor(private formService: FormService) {}

  ngOnInit(): void {
    if (this.content) {
      this.treeView = [];
      this.content.map((item: any) => {
        if (item.type === 'treeView') {
          this.treeView.push({
            title: item.label,
            tree: [new TreeviewItem(item.elements)],
          });
        }
      });
      this.initForm(this.content);
    }
  }

  initForm(items: any[]): void {
    this.form = this.formService.toFormGroup(items);
    this.form.valueChanges.subscribe((value) => {
      console.log(value);
      this.selectChange.emit(value);
    });
  }

  onSelectedChange(event: any): void {
    console.log(event);
  }

  clear(): void {
    this.form.reset();
    this.selectChange.emit(this.form);
  }

  onFilterChange(event: any): void {
    console.log(event);
  }
}

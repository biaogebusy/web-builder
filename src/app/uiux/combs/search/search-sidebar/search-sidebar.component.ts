import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormService } from 'src/app/service/form.service';
import { FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-search-sidebar',
  templateUrl: './search-sidebar.component.html',
  styleUrls: ['./search-sidebar.component.scss'],
})
export class SearchSidebarComponent implements OnInit {
  @Input() content: any;
  @Input() keys: any;
  @Output() selectChange = new EventEmitter();

  treeView: any[];
  panelOpenState = true;
  form: FormGroup;
  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.initForm(this.content);
  }

  initForm(items: any[]): void {
    const formItems = items.map((item) => {
      if (item.key === 'keys') {
        item.value = this.keys;
      }
      return item;
    });
    this.form = this.formService.toFormGroup(formItems);
    this.form.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value) => {
        const params = Object.assign({ keys: this.keys, page: 0 }, value);
        this.selectChange.emit(params);
      });
  }

  clear(): void {
    this.keys = '';
    this.form.reset();
  }
}

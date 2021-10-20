import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormService } from 'src/app/service/form.service';
import { FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { isEmpty, pick, values } from 'lodash';
@Component({
  selector: 'app-search-sidebar',
  templateUrl: './search-sidebar.component.html',
  styleUrls: ['./search-sidebar.component.scss'],
})
export class SearchSidebarComponent implements OnInit {
  @Input() content: any;
  @Input() searchEntry: any;
  @Output() selectChange = new EventEmitter();

  panelOpenState = true;
  form: FormGroup;
  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.initForm(this.content);
  }

  get isEmpty(): boolean {
    return isEmpty(this.searchEntry);
  }

  get values(): string[] {
    return values(pick(this.searchEntry, ['keys', 'title']));
  }

  initForm(items: any[]): void {
    this.form = this.formService.toFormGroup(items);
    this.form.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value) => {
        const params = Object.assign({ page: 0 }, value);
        this.selectChange.emit(params);
      });
  }

  clear(): void {
    this.searchEntry = {};
    this.form.reset();
  }
}

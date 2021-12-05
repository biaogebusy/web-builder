import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormService } from '@core/service/form.service';
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
  @Input() form: FormGroup;
  @Input() searchEntry: any;

  panelOpenState = true;
  constructor(private formService: FormService) {}

  ngOnInit(): void {}

  get isEmpty(): boolean {
    return isEmpty(this.searchEntry);
  }

  get values(): string[] {
    return values(pick(this.searchEntry, ['keys', 'title']));
  }

  clear(): void {
    this.searchEntry = {};
    this.form.reset();
  }
}

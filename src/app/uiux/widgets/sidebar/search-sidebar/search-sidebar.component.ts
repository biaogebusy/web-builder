import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import type { ISearchLabel } from '@core/interface/combs/ISearch';
import { isEmpty, pick, values } from 'lodash';

@Component({
  selector: 'app-search-sidebar',
  templateUrl: './search-sidebar.component.html',
  styleUrls: ['./search-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchSidebarComponent implements OnInit {
  @Input() content: any[];
  @Input() label: ISearchLabel;
  @Input() form: FormGroup;
  @Input() searchEntry: any;
  @Output() modelChange: EventEmitter<any> = new EventEmitter();

  panelOpenState = true;
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}

  get isEmpty(): boolean {
    return isEmpty(this.searchEntry);
  }

  get values(): string[] {
    return values(pick(this.searchEntry, ['keys', 'title']));
  }

  onModelChange(event: any): any {
    this.modelChange.emit(event);
  }

  clear(): void {
    this.searchEntry = {};
    this.form.reset();
    this.cd.detectChanges();
  }
}

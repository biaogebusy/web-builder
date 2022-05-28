import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { isEmpty, pick, values } from 'lodash';

export interface ILabel {
  clear: string;
  filter: string;
}
@Component({
  selector: 'app-search-sidebar',
  templateUrl: './search-sidebar.component.html',
  styleUrls: ['./search-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchSidebarComponent implements OnInit {
  @Input() content: any;
  @Input() label: ILabel;
  @Input() form: FormGroup;
  @Input() searchEntry: any;

  panelOpenState = true;
  constructor(private cd: ChangeDetectorRef) {}

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
    this.cd.detectChanges();
  }
}
